module.exports = init;

const answer_module = require('../bin/answer_module');

function init(app,directory){
    app.get('/answerPage',function(req,res){
        res.sendFile('answerPage.html');
    });

    app.post('/answerPage/answerAskQuestion',function(req,res){
        var answer = getAnswer();
        var questionID = getQuestionID();
        var userID = getUserID();

        if(answer && questionID && userID){
            answer_module.answerAskQuestion(answer,questionID,userID,function(){
                res.redirect('/signInSuccess');
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
