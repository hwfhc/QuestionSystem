module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerDetail', function(req, res){
            let answerID = getAnswerID();

            if(!answerID){
            res.redirect('/personalHomePage');
            }else{
            req.session.answerID = answerID;
            res.sendFile(directory + '/views/answerDetail.html');
            }


            function getAnswerID(){
            return req.query.ID;
            }
            });

    app.get('/answerDetail/getAnswerDetail', function(req, res){
            let dataToSended = {};
            let userIDofAnswer;
            let answerID = getAnswerID();

            if(!answerID){
            return;
            }

        let answerDetail = new Promise(function(resolve,reject){
            config.modules['view_module'].getAnswerAndUserIDbyID(answerID,function(results){
                dataToSended.answer = results.answer;
                dataToSended.score = results.score;
                userIDofAnswer = results.userID;
                resolve();
            });
        });

        answerDetail.then(function(){
            config.modules['personalinformation_module'].getUsernameByID(userIDofAnswer,function(result){
                dataToSended.username = result;
                res.send(JSON.stringify(dataToSended));
            });

        });


        function getAnswerID(){
            return req.session.answerID;
        }
    });

    app.post('/answerDetail/setScore', function(req, res){
            let score = getScore();
            let questionID = getQuestionID();

            if(score && questionID){
            config.modules['answer_module'].setScoreByID(questionID,score,function(){
                    res.sendFile(directory + '/views/signInSuccess.html');
                    });
            }else{
            res.redirect('/personalHomePage');
            }

            function getScore(){
            return req.body.score;
            }

            function getQuestionID(){
            return req.session.questionID;
            }

            });

}

