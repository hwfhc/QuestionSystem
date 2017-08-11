module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
    app.get('/signPage',function(req,res){
        sign_module.logOut(req);
        res.sendFile(directory + '/views/signPage.html');
    });

    app.post('/signPage/signIn', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        //console.log(username);
        //console.log(password);

        sign_module.getIdByUsernameAndPassword(username,password,function(result){
            if(result){
                req.session.ID = result;
                res.sendFile(directory + '/views/signInSuccess.html');
            }else{

                res.sendFile(directory + '/views/signInFail.html');
            }
        });
    });

    app.post('/signPage/signUP', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        sign_module.signUp(username,password,function(){
            res.sendFile(directory + '/views/signInSuccess.html');
        });
    });

    app.get('/signPage/logOut', function(req, res){
        sign_module.logOut(req);
        res.sendFile(directory + '/views/jump.html');
    });

}

