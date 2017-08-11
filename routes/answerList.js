module.exports = init;

const view_module = require('../bin/view_module')();

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerList',function(req,res){
        let questionID = getQuestionID();

        if(questionID){
            res.sendFile(directory + '/views/answerList.html');
        }else{
            res.redirect('/personalHomePage');
        }


        function getQuestionID(){
            return req.session.questionID;
        }
    });

    app.get('/answerList/getAnswerList',function(req,res){
        let questionID = getQuestionID();


        let authorID;
        let userID = getUserID();

        view_module.getQuestionDetail(questionID,function(result){
            authorID = result.authorID;

            if(userID == authorID && questionID){
                view_module.getAnswerList(req.session.questionID,function(results){
                    res.send(results);
                })
            }
        });


        function getUserID(){
            return req.session.ID;
        }

        function getQuestionID(){
            return req.session.questionID;
        }
    });

}

