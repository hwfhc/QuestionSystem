module.exports = init;

const personalinformation_module = require('../bin/personalinformation_module');
const answer_module = require('../bin/answer_module');
const view_module = require('../bin/view_module');

function init(app,directory){
    app.get('/answerDetail', function(req, res){
        let answerID = getAnswerID();

        if(!answerID){
            res.redirect('/personalHomePage');
        }else{
            req.session.answerID = answerID;
            res.sendFile('answerDetail.html');
        }


        function getAnswerID(){
            return req.query.ID;
        }
    });

    app.get('/answerDetail/getAnswerDetail', function(req, res){
        let dataToSended = {};
        let userIDofAnswer;
        let answerID = getAnswerID();
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


        function getAnswerID(){
            return req.session.answerID;
        }
    });

    app.post('/answerDetail/setScore', function(req, res){
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

