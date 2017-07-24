module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/publishPage',function(req,res){
        res.sendFile(directory + '/views/publishPage.html');
    });

    app.post('/publishPage/publishAskQuestion',function(req,res){
        var title = req.body.title;
        var description = req.body.description;

        config.modules['publish_module'].publishAskQuestion(title,description,5,function(){
            res.sendFile(directory + '/views/signInSuccess.html');
        });
    });

}
