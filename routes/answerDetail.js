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

        config.modules['view_module'].getAnswerDetail(req.session.answerID,function(results){
            res.send(results);
        })
    });

}

