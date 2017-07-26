module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerDetail', function(req, res){
        req.session.answerID = req.query.ID;
        res.sendFile(directory + '/views/answerDetail.html');
    });

    app.get('/answerDetail/getAnswerDetail', function(req, res){
        var score = {
            total_score : 5,
            your_score : 4
        };


        let dataToSended = {};
        let userID;

        let answerDetail = new Promise(function(resolve,reject){
            config.modules['view_module'].getAnswerAndUserIDbyID(req.session.answerID,function(results){
                dataToSended.answer = results.answer;
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

}

