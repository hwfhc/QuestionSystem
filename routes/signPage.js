module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
    app.get('/signPage',function(req,res){
        sign_module.logOut(req);
        res.sendFile('signPage.html');
    });

    app.post('/signPage/signIn', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        //console.log(username);
        //console.log(password);

        sign_module.getIdByUsernameAndPassword(username,password,function(result){
            if(result){
                req.session.ID = result;
                res.redirect('/signInSuccess');
            }else{

                res.redirect('/signInFail');
            }
        });
    });

    app.post('/signPage/signUP', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        sign_module.signUp(username,password,function(){
            res.redirect('/signInSuccess');
        });
    });

    app.get('/signPage/logOut', function(req, res){
        sign_module.logOut(req);
        res.sendFile('jump.html');
    });

}

