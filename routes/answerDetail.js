module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerDetail', function(req, res){
        req.session.answerID = req.query.ID;
        res.sendFile(directory + '/views/answerDetail.html');
    });

    app.get('/answerDetail/getAnswerDetail', function(req, res){
        let dataToSended = {};
        let userID;

        let answerDetail = new Promise(function(resolve,reject){
            config.modules['view_module'].getAnswerAndUserIDbyID(req.session.answerID,function(results){
                dataToSended.answer = results.answer;
                dataToSended.score = results.score;
                userID = results.userID;
                resolve();
            });
        });

        answerDetail.then(function(){
            config.modules['personalinformation_module'].getUsernameByID(userID,function(result){
                dataToSended.username = result;
                res.send(JSON.stringify(dataToSended));
            });

        });

    });

    app.post('/answerDetail/setScore', function(req, res){
            let score = req.body.score;
            let questionID = req.session.questionID;

            config.modules['answer_module'].setScoreByID(questionID,score,function(){
                    res.sendFile(directory + '/views/signInSuccess.html');
                    });
            });


}

