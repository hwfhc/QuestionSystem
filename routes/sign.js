module.exports = init;

const sign = require('../bin/sign');

function init(app,directory){
   app.post('/sign/in', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        sign.getIdByUsernameAndPassword(username,password,function(result){
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

        sign.signUp(username,password,function(){
            res.redirect('/signInSuccess');
        });
    });

    app.get('/sign/logOut', function(req, res){
        sign.logOut(req);
        res.redirect('/');
    });

}

