module.exports = initRoutes;

function initRoutes(app,directory){
    let fs = require('fs');

    app.use(function(req,res,next){
        res.sendFile = function(file){
            res.setHeader('X-Accel-Redirect','/protected/' + file);
            //res.setHeader('Cache-Control','no-store');
            res.setHeader('Cache-Control','max-age=3600');
            res.end();
        }
        next();
    });

    app.use(function (req,res,next){
        if(!/\.css$/.test(req.url) &&
           !/\.js/.test(req.url) &&
           !/\.png/.test(req.url) &&
           !/\.jpg/.test(req.url)){

            let log = {
                type:'view_log',
                log: `IP ADDRESS:${req.ip};METHOD:${req.method};DATE:${new Date()};URL:${req.url}`};
            process.send(log);
        }

        if(req.path!=='/signPage'&&
            req.path!=='/css/signPage.css'&&
            req.path!=='/pleaseSignInFirst'&&
            req.path!=='/css/pleaseSignInFirst.css'&&
            req.path!=='/sign/in'&&
            req.path!=='/sign/up'&&
            req.path!=='/css/signInSuccess.css'&&
            req.path!=='/css/signInFail.css'&&
            req.path!=='/picture/cross.jpg'&&
            req.path!=='/picture/tick.jpg')
        {
            if(isSignIn(req)){
                next();
            }else{
                res.redirect('/signPage');
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
        res.redirect('/homePage');
    });

    require('./page')(app,directory);
    require('./sign')(app,directory);
    require('./user')(app,directory);
    require('./question')(app,directory);
    require('./answer')(app,directory);
}
