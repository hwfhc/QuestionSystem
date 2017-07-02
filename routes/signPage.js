module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/signPage',function(req,res){
        res.sendFile(directory + '/views/signPage/SignUp.html');
    });

    app.get('/signPage2',function(req,res){
        res.sendFile(directory + '/views/signPage/SignIn.html');
    });

    app.post('/signPage/signIn', function(req, res){
        res.sendFile(directory + '/index.html');
    });

    app.post('/signPage/signUP', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        config.modules['sign_module'].signUp(username,password);
    });

    app.get('/signPage/logOut', function(req, res){
        res.sendFile(directory + '/index.html');
    });

}

