module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionList',function(req,res){
        res.sendFile(directory + '/views/questionList.html');
    });

    app.get('/questionList/getQuestionList', function(req, res){
        var questionList = {list : [
            {name:'css3 question',link:'/questionDetail'},
            {name:'es6 question',link:'/questionDetail'},
            {name:'http question',link:'/questionDetail'},
        ]}

        res.send(JSON.stringify(questionList));

        /* var username = req.body.username;
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

        });*/
    });

}

