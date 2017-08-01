var express = require('express');
var fs = require('fs');

//init global config
var app = express();

var config = {
    app: app,
    directory: '/home/firewaterge/Repositories/QuestionSystem',
    modules: [],
    logger: initLogger()
};


initMiddleware(config);
initRoutes(config);
initModule(config);


//start server, and listen to port
var server = config.app.listen(8080,function(){
});

function initLogger(){
    let output = fs.createWriteStream('./stdout.log',{flags:'a'});
    let errorOutput = fs.createWriteStream('./stderr.log',{flags:'a'});

    let logger = new console.Console(output,errorOutput);

    app.use(function (req,res,next){
        var match1 = new RegExp('css');
        var match2 = new RegExp('javascripts');
        var match3 = new RegExp('picture');
        if(match1.exec(req.url)==null &&
            match2.exec(req.url)==null &&
            match3.exec(req.url)==null){

            logger.log(
                'IP ADDRESS: '+req.ip+
                ';  METHOD: '+req.method+
                ';  DATE: '+new Date()+
                ';  URL: '+req.url);
        }

        next();
    });


    return logger;
}

function initMiddleware(config){

    initFormPost();
    initSession();

    function initFormPost(){
        var bodyParser = require('body-parser');//用于处理表单数据
        var multipart = require('connect-multiparty');//用于处理AJAX表单

        var multipartMiddleware = multipart();

        config.app.use(bodyParser.urlencoded({ extended: false }));
    }

    function initSession(){
        var session = require('express-session');
        var FileStore = require('session-file-store')(session);

        config.app.use(session({
            store: new FileStore(),
            secret: 'hehe',
            cookie:{
                maxAge: 3000000
            }
        }));
    }
}

function initRoutes(config){
    require('../routes/index.js')(config);
}

function initModule(config){

    config.modules['sign_module'] = (require('./sign_module'))(config);
    config.modules['rights_management'] = (require('./rights_management'))(config);
    config.modules['personalinformation_module'] = (require('./personalinformation_module'))(config);
    config.modules['saferman'] = (require('./saferman'))(config);
    config.modules['publish_module'] = (require('./publish_module'))(config);
    config.modules['answer_module'] = (require('./answer_module'))(config);
    config.modules['view_module'] = (require('./view_module'))(config);
}


