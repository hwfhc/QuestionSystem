module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionList',function(req,res){
        res.sendFile(directory + '/views/questionList.html');
    });

    app.get('/questionList/getQuestionList', function(req, res){
        config.modules['view_module'].getQuestionList(function(results){
            res.send(JSON.stringify(results));
        })
    });

}

