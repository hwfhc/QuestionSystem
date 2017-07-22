module.exports = initRoutes;


function initRoutes(config){

    var app = config.app;
    var directory = config.directory;

    app.use(function (req,res,next){
        if(req.path==='/'||
            req.path==='/personalHomePage'||
            req.path==='/questionList')
        {

            var isSignIn = config.modules['sign_module'].isSignIn(req);

            if(isSignIn){
                next();
            }else{
                res.sendFile(directory + '/views/pleaseSignInFirst.html');
            }

        }else{
            next();
        }
    });

    app.get('/',function(req,res){
        res.sendFile(directory + '/views/personalHomePage.html');
    });

    app.get('/css/:file',function(req,res){
        res.sendFile(directory + '/public/css/' + req.params['file']);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(directory + '/public/javascripts/' + req.params['file']);
    });

    app.get('/picture/:file',function(req,res){
        res.sendFile(directory + '/public/picture/' + req.params['file']);
    });

    (require('./signPage'))(config);
    (require('./personalHomePage'))(config);
    (require('./questionList'))(config);
    (require('./questionDetail'))(config);
    (require('./answerPage'))(config);
}
