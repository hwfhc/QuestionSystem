module.exports = initRoutes;

function initRoutes(app,directory){
    let fs = require('fs');

    var match1 = new RegExp('css');
    var match2 = new RegExp('javascripts');
    var match3 = new RegExp('picture');

    app.use(function(req,res,next){
        res.sendFile = function(file){
            res.setHeader('X-Accel-Redirect','/protected/' + file);
            res.end();
        }
        next();
    });

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
            if(isSignIn(req)){
                next();
            }else{
                res.sendFile('pleaseSignInFirst.html');
            }

        }else{
            next();
        }


        function isSignIn(req){
            if(req.session.ID != undefined){
                return true;
            }else{
                return false;
            }
        }
    });

    app.get('/',function(req,res){
        res.sendFile('personalHomePage.html');
    });

    /* app.get('/css/:file',function(req,res){
        res.sendFile(directory + '/public/css/' + req.paramsfile);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(directory + '/public/javascripts/' + req.paramsfile);
    });

    app.get('/picture/:file',function(req,res){
        res.sendFile(directory + '/public/picture/' + req.paramsfile);
    });*/

    require('./signPage')(app,directory);
    require('./personalHomePage')(app,directory);
    require('./questionList')(app,directory);
    require('./questionDetail')(app,directory);
    require('./answerPage')(app,directory);
    require('./publishPage')(app,directory);
    require('./answerDetail')(app,directory);
    require('./answerList')(app,directory);
}
