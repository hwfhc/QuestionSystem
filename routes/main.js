module.exports = initRoutes;


function initRoutes(config){

    var app = config.app;
    var directory = config.directory;


    app.get('/css/:file',function(req,res){
        res.sendFile(directory + '/public/css/' + req.params['file']);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(directory + '/public/javascripts/' + req.params['file']);
    });

    app.get('/picture/:file',function(req,res){
        res.sendFile(directory + '/public/picture/' + req.params['file']);
    });

    (require('./signPage'))(config);
    (require('./personalHomePage'))(config);
}
