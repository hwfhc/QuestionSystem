module.exports = init;

const user = require('../bin/user');

function init(app,directory){
    app.get('/user/:userID/name',function(req,res){
        var userID = req.params['userID'];

        user.getUsernameByID(userID,function(result){
            res.send(result);
        });
    });

    app.get('/user/:userID/money',function(req,res){
        var userID = req.params['userID'];

        user.getMoneyByID(userID,function(result){
            res.send(result.toString());
        });
    });

    app.get('/user/isRoot',function(req,res){
        res.send(req.session.ID === 1);

        /*user.getUsernameByID(userID,function(result){
            res.send(result);
        });*/
    });
}

