module.exports = init;

const personalinformation_module = require('../bin/personalinformation_module');

function init(app,directory){
    app.get('/homePage',function(req,res){
        var id = getUserID(req);
        res.redirect(`/homePage/${id}`)
    });

    app.get('/homePage/:id',function(req,res){
        res.sendFile('homePage.html');
    });


    function getUserID(req){
        return req.session.ID;
    }

}
