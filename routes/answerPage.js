module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerPage',function(req,res){
        res.sendFile(directory + '/views/answerPage.html');
    });
}
