module.exports = init;

const answer_module = require('../bin/answer_module');
const view_module = require('../bin/view_module');
const personalinformation_module = require('../bin/personalinformation_module');

function init(app,directory){
    app.get('/answer/list/:questionID',function(req,res){
        let questionID = req.params['questionID'];

        if(!questionID){
            return;
        }

        view_module.getAnswerList(questionID,result => {
            res.send(JSON.stringify(result));
        });
    });

    app.get('/answer/:answerID/detail',function(req,res){
        let dataToSended = {};
        let userIDofAnswer;
        let answerID = req.params['answerID'];

        console.log(answerID);
        let questionID;

        if(!answerID){
            return;
        }

        let answerDetail = new Promise(function(resolve,reject){
            view_module.getAnswerAndUserIDbyID(answerID,function(results){
                dataToSended.answer = results.answer;
                dataToSended.score = results.score;

                questionID = results.questionID;
                userIDofAnswer = results.userID;
                resolve();
            });
        });

        answerDetail.then(function(){

            let getUsername = new Promise(function(resolve,reject){
                //console.log('userIDofAnswer is: '+userIDofAnswer);
                personalinformation_module.getUsernameByID(userIDofAnswer,function(result){
                    dataToSended.username = result;
                    resolve();
                });
            });

            let getQuestionDetail = new Promise(function(resolve,reject){
                //console.log('questionID is: '+questionID);
                view_module.getQuestionDetail(questionID,function(result){
                    dataToSended.title = result.title;
                    dataToSended.description = result.description;
                    resolve();
                });
            });

            Promise.all([
                getUsername,
                getQuestionDetail
            ]).then(function(){
                res.send(JSON.stringify(dataToSended));
            })

        });

    });

    app.post('/answer/:questionID/publish', function(req, res){
        var answer = getAnswer();
        var questionID = getQuestionID();
        var userID = getUserID();
        console.log(questionID);
        console.log(userID);

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
            answer_module.setScoreByID(answerID,score,function(){
                res.redirect('/signInSuccess');
            });
        }else{
            res.redirect('/personalHomePage');
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

