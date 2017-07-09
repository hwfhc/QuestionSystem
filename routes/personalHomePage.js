module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/personalHomePage',function(req,res){
        var isSignIn = config.modules['sign_module'].isSignIn(req);

        if(isSignIn){
            res.sendFile(directory + '/views/personalHomePage.html');
        }else{
            res.sendFile(directory + '/views/pleaseSignInFirst.html');
        }
    });

    app.post('/personalHomePage/getPersonalInformation', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        //console.log(username);
        //console.log(password);

        config.modules['sign_module'].signIn(username,password,req,function(){
            var isSignIn = config.modules['sign_module'].isSignIn(req);

            if(isSignIn){
                res.sendFile(directory + '/views/jump.html');
            }else{
                //console.log('I should send fail text');
                res.send('wdad');
            }

        });
    });

}
