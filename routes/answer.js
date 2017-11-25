module.exports = init;

const answer = require('../bin/answer');
const question = require('../bin/question');
const user = require('../bin/user');

function init(app,directory){
    app.get('/answer/list/:questionID',function(req,res){
        let questionID = req.params['questionID'];

        if(!questionID){
            return;
        }

        answer.getAnswerList(questionID,result => {
            res.send(JSON.stringify(result));
        });
    });

    app.get('/answer/:answerID/detail',function(req,res){
        let dataToSended = {};
        let userIDofAnswer;
        let answerID = req.params['answerID'];

        let questionID;

        if(!answerID){
            return;
        }
        answer.getAnswerDetail(answerID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.answer_content = result.answer;
            dataToSended.username = result.username;

            res.send(JSON.stringify(dataToSended));
        });

    });

    app.post('/answer/:questionID/publish', function(req, res){
        var content = getAnswer();
        var questionID = getQuestionID();
        var userID = getUserID();

        if(answer && questionID && userID){
            answer.answerAskQuestion(content,questionID,userID,function(){
                res.redirect('/signInSuccess');
            });
        }else{
            res.redirect('/');
        }


        function getAnswer(){
            return req.body.answer;
        }

        function getQuestionID(){
            return req.params['questionID'];
        }

        function getUserID(){
            return req.session.ID;
        }

    });

    app.get('/answer/:id/author',function(req,res){
        res.sendFile('signInSuccess.html');
    });

    app.post('/answer/:id/setScore',function(req,res){
        let score = getScore();
        let answerID = getAnswerID();

        if(score && answerID){
            answer.setScoreByID(answerID,score,function(){
                res.redirect('/signInSuccess');
            });
        }else{
            res.redirect('/');
        }

        function getScore(){
            return req.body.score;
        }

        function getAnswerID(){
            return req.session.answerID;
        }


    });

}

function getUserID(req){
    return req.session.ID;
}

function getQuestionID(req){
    return req.session.questionID;
}

function getAnswerID(req){
    return req.query.ID;
}

