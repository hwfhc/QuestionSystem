module.exports = init;

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

        if(questionID){
            config.modules['view_module'].getAnswerList(req.session.questionID,function(results){
                res.send(results);
            })
        }


        function getQuestionID(){
            return req.session.questionID;
        }
    });

}

