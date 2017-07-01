module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/signPage',function(req,res){
        res.sendFile(directory + '/views/signPage/SignIn.html');
    });

    app.get('/signPage', function(req, res){
        res.sendFile(directory + '/signPage/SignIn.html');
    });

    app.get('/signPage/signIn', function(req, res){
        res.sendFile(directory + '/index.html');
    });

    app.get('/signPage/signUP', function(req, res){
        res.sendFile(directory + '/index.html');
    });

    app.get('/signPage/logOut', function(req, res){
        res.sendFile(directory + '/index.html');
    });

}

