module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerDetail',function(req,res){
        res.sendFile(directory + '/views/answerDetail.html');
    });
}
