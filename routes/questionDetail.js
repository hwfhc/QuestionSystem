module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionDetail', function(req, res){
        req.session.questionID = req.query.ID;
        res.sendFile(directory + '/views/questionDetail.html');
    });

    app.get('/questionDetail/getQuestionDetail', function(req, res){
        let dataToSended = {};
        let authorID;

        config.modules['view_module'].getQuestionDetail(req.session.questionID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.total_score = result.total_score;

            authorID = result.authorID;

            config.modules['personalinformation_module'].getUsernameByID(authorID,function(result){
                dataToSended.author_name = result;

                config.modules['view_module'].getScoreByUserID(req.session.ID,function(score){
                    dataToSended.score = score;

                    res.send(JSON.stringify(dataToSended));
                });
            });
        })
    });

}

