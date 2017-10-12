module.exports = init;

const personalinformation_module = require('../bin/personalinformation_module');

function init(app,directory){
    app.get('/user/:userID/name',function(req,res){
        var userID = req.params['userID'];

        personalinformation_module.getUsernameByID(userID,function(result){
            res.send(result);
        });
    });

}

