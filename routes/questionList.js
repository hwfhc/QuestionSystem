module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionList',function(req,res){
        var isSignIn = config.modules['sign_module'].isSignIn(req);

        if(isSignIn){
            res.sendFile(directory + '/views/questionList.html');
        }else{
            res.sendFile(directory + '/views/signPage.html');
        }
    });

    app.post('/questionList/getQuestionList', function(req, res){
        var username = req.body.username;
        var password = req.body.password;
        //console.log(username);
        //console.log(password);

        config.modules['sign_module'].signIn(username,password,req,function(){
            var isSignIn = config.modules['sign_module'].isSignIn(req);

            if(isSignIn){
                res.sendFile(directory + '/views/signInSuccess.html');
            }else{
                //console.log('I should send fail text');
                res.sendFile(directory + '/views/signInFail.html');
            }

        });
    });

    app.post('/questionList/signUP', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        config.modules['sign_module'].signUp(username,password);
    });

}

