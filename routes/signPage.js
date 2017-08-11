module.exports = init;

const sign_module = require('./sign_module')();
const rights_management = require('./rights_management')();
const personalinformation_module = require('./personalinformation_module')();
const saferman = require('./saferman')();
const publish_module = require('./publish_module')();
const answer_module = require('./answer_module')();
const view_module = require('./view_module')();

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/signPage',function(req,res){
        sign_module.logOut(req);
        res.sendFile(directory + '/views/signPage.html');
    });

    app.post('/signPage/signIn', function(req, res){
        const sign_module = sign_module;
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

