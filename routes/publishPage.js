module.exports = init;

const publish_module = require('../bin/publish_module');

function init(app,directory){
    app.get('/publishPage',function(req,res){
        res.sendFile('publishPage.html');
    });

    app.post('/publishPage/publishAskQuestion',function(req,res){
        var userID = getUserID();
        var title = req.body.title;
        var description = req.body.description;

        publish_module.publishAskQuestion(title,description,5,req.session.ID,function (){
            res.redirect('/signInSuccess');
        });

        function getUserID(){
            return req.session.ID;
        }
    });

}
