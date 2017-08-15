module.exports = init;

const personalinformation_module = require('../bin/personalinformation_module');

function init(app,directory){
    app.get('/personalHomePage',function(req,res){
        res.sendFile('personalHomePage.html');
    });

    app.get('/personalHomePage/getPersonalInformation', function(req, res){
        let ID = getUserID();
        let dataToSended = {};

        personalinformation_module.getUsernameByID(ID,function(result){
            dataToSended.username = result;
            res.send(JSON.stringify(dataToSended));
        });

        function getUserID(){
            return req.session.ID;
        }
    });

}
