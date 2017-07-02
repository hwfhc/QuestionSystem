var express = require('express');
var session = require('express-session');

var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');//用于处理表单数据
var multipart = require('connect-multiparty');//用于处理AJAX表单

var multipartMiddleware = multipart();



//init global config
var directory = '/home/firewaterge/Repositories/GuildHall';

var config = {
    app: express(),
    directory: directory,
    modules: []
};

config.app.use(bodyParser.urlencoded({ extended: false }));


initSession();
initRoutes();
moduleInit();

//start server, and listen to port
var server = config.app.listen(8080,function(){
    console.log('server start...');
});


function initSession(){

    config.app.use(session({
        store: new FileStore(),
        secret: 'hehe',
        cookie:{
            maxAge: 30000
        }
    }));
}

function initRoutes(){
    (require('../routes/main.js')(config));
}

function moduleInit(){

    config.modules['sign_module'] = (require('sign_module'))(config);
    config.modules['rights_management'] = (require('rights_management'))(config);
    config.modules['personalinformation_module'] = (require('personalinformation_module'))(config);
    config.modules['saferman'] = (require('saferman'))(config);
}


