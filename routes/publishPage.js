module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/publishPage',function(req,res){
        res.sendFile(directory + '/views/publishPage.html');
    });
}
