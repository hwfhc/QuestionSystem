module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionDetail',function(req,res){
        var isSignIn = config.modules['sign_module'].isSignIn(req);

        if(isSignIn){
            res.sendFile(directory + '/views/questionDetail.html');
        }else{
            res.sendFile(directory + '/views/signPage.html');
        }
    });

}

