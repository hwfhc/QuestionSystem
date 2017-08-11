module.exports = init;

const answer_module = require('../bin/answer_module')();

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerPage',function(req,res){
        res.sendFile(directory + '/views/answerPage.html');
    });

    app.post('/answerPage/answerAskQuestion',function(req,res){
        var answer = getAnswer();
        var questionID = getQuestionID();
        var userID = getUserID();

        if(answer && questionID && userID){
            answer_module.answerAskQuestion(answer,questionID,userID,function(){
                res.sendFile(directory + '/views/signInSuccess.html');
            });
        }else{
            res.redirect('/personalHomePage');
        }


        function getAnswer(){
            return req.body.answer;
        }

        function getQuestionID(){
            return req.session.questionID
        }

        function getUserID(){
            return req.session.ID;
        }
    });

}
