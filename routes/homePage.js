module.exports = init;

const personalinformation_module = require('../bin/personalinformation_module');

function init(app,directory){
    app.get('/homePage',function(req,res){
        res.sendFile('homePage.html');
    });

    app.get('/homePage/username', function(req, res){
        let ID = getUserID();
        let dataToSended = {};

        personalinformation_module.getUsernameByID(ID,function(result){
            res.send(result);
        });

        function getUserID(){
            return req.session.ID;
        }
    });

}
