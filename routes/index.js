module.exports = initRoutes;


function initRoutes(config){
    let fs = require('fs');

    var app = config.app;
    var directory = config.directory;

    var match1 = new RegExp('css');
    var match2 = new RegExp('javascripts');
    var match3 = new RegExp('picture');


    app.use(function (req,res,next){
        if(match1.exec(req.url)==null &&
            match2.exec(req.url)==null &&
            match3.exec(req.url)==null){

            let log = {
                type:'view_log',
                log: `IP ADDRESS:${req.ip};METHOD:${req.method};DATE:${new Date()};URL:${req.url}`};
            process.send(log);
        }

        if(req.path!=='/signPage'&&
            req.path!=='/css/signPage.css'&&
            req.path!=='/pleaseSignInFirst'&&
            req.path!=='/css/pleaseSignInFirst.css'&&
            req.path!=='/signPage/signIn'&&
            req.path!=='/signPage/signUp'&&
            req.path!=='/css/signInSuccess.css'&&
            req.path!=='/css/signInFail.css'&&
            req.path!=='/picture/cross.jpg'&&
            req.path!=='/picture/tick.jpg')
        {
            var isSignIn = config.modules['sign_module'].isSignIn(req);

            if(isSignIn){
                next();
            }else{
                //res.sendFile(directory + '/views/pleaseSignInFirst.html');
                res.setHeader('X-Accel-Redirect','/protected/pleaseSignInFirst.html');
                res.end();
            }

        }else{
            next();
        }
    });

    app.get('/',function(req,res){
        //res.sendFile(directory + '/views/personalHomePage.html');
        res.setHeader('X-Accel-Redirect','/protected/personalHomePage.html');
        res.end();
    });

   /* app.get('/css/:file',function(req,res){
        res.sendFile(directory + '/public/css/' + req.params['file']);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(directory + '/public/javascripts/' + req.params['file']);
    });

    app.get('/picture/:file',function(req,res){
        res.sendFile(directory + '/public/picture/' + req.params['file']);
    });*/

    (require('./signPage'))(config);
    (require('./personalHomePage'))(config);
    (require('./questionList'))(config);
    (require('./questionDetail'))(config);
    (require('./answerPage'))(config);
    (require('./publishPage'))(config);
    (require('./answerDetail'))(config);
    (require('./answerList'))(config);
}
