module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/personalHomePage',function(req,res){
        res.sendFile(directory + '/views/personalHomePage.html');
    });

    app.get('/personalHomePage/getPersonalInformation', function(req, res){
        let ID = req.session.ID
        let dataToSended = {};

        config.modules['personalinformation_module'].getUsernameByID(ID,function(result){
            dataToSended.username = result;
            res.send(JSON.stringify(dataToSended));
        });
    });

}
