module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionDetail', function(req, res){
        req.session.questionID = req.query.ID;
        res.sendFile(directory + '/views/questionDetail.html');
    });

    app.get('/questionDetail/getQuestionDetail', function(req, res){
        var score = {
            total_score : 5,
            your_score : 4
        };

        config.modules['view_module'].getQuestionDetail(req.session.questionID,function(results){
            res.send(results);
        })
    });

}

