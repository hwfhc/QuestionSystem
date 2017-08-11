module.exports = init;

const publish_module = require('../bin/publish_module')();

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/publishPage',function(req,res){
        res.sendFile(directory + '/views/publishPage.html');
    });

    app.post('/publishPage/publishAskQuestion',function(req,res){
        var title = req.body.title;
        var description = req.body.description;

        publish_module.publishAskQuestion(title,description,5,req.session.ID,function (){
            res.sendFile(directory + '/views/signInSuccess.html');
        });
    });

}
