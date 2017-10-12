module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
   app.post('/sign/in', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        sign_module.getIdByUsernameAndPassword(username,password,function(result){
            if(result){
                req.session.ID = result;
                res.redirect('/signInSuccess');
            }else{
                res.redirect('/signInFail');
            }
        });
    });

    app.post('/sign/up', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        sign_module.signUp(username,password,function(){
            res.redirect('/signInSuccess');
        });
    });

    app.get('/sign/logOut', function(req, res){
        sign_module.logOut(req);
        res.redirect('/');
    });

}

