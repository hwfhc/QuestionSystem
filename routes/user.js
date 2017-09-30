module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
    app.get('/user/:userID/username',function(req,res){
        var userID;

        if(req.params['userID'] > 0){
            userID = req.params['userID'];
        }else{
            userID = req.session.ID;
        }
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

}

