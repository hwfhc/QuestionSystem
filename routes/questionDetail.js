module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionDetail', function(req, res){
        res.sendFile(directory + '/views/questionDetail.html');
    });

    app.get('/questionDetail/getScore', function(req, res){
        var score = {
            total_score : 5,
            your_score : 4
        };

        res.send(JSON.stringify(score));
    });

}

