module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerList',function(req,res){
        res.sendFile(directory + '/views/answerList.html');
    });

    app.get('/answerList/getAnswerList',function(req,res){
        config.modules['view_module'].getAnswerList(req.session.questionID,function(results){
            res.send(results);
        })
    });

}

