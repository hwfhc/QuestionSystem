var express = require('express');

//init global config
var directory = '/home/firewaterge/Repositories/QuestionSystem';

var config = {
    app: express(),
    directory: directory,
    modules: []
};


initMiddleware(config);
initRoutes(config);
initModule(config);


//start server, and listen to port
var server = config.app.listen(80,function(){
    console.log('server start...');
});




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
                maxAge: 300000
            }
        }));
    }
}

function initRoutes(config){
    (require('../routes/index.js')(config));
}

function initModule(config){

    config.modules['sign_module'] = (require('sign_module'))(config);
    config.modules['rights_management'] = (require('rights_management'))(config);
    config.modules['personalinformation_module'] = (require('personalinformation_module'))(config);
    config.modules['saferman'] = (require('saferman'))(config);
    config.modules['publish_module'] = (require('publish_module'))(config);
    config.modules['answer_module'] = (require('answer_module'))(config);
    config.modules['view_module'] = (require('view_module'))(config);
}


