const express = require('express');
const app = express();
const directory = '/usr/local/QuestionSystem'

const saferman = require('saferman')('879574764');

initMiddleware(app);
initRoutes(app,directory);

//start server, and listen to port
var server = app.listen(8080,function(){
    console.log(`Worker ${process.pid} start`);
    process.title = 'node_worker';
});

function initMiddleware(app){

    initFormPost();
    initSession();

    function initFormPost(){
        var bodyParser = require('body-parser');//用于处理表单数据
        var multipart = require('connect-multiparty');//用于处理AJAX表单

        var multipartMiddleware = multipart();

        app.use(bodyParser.urlencoded({ extended: false }));
    }

    function initSession(){
        var session = require('express-session');
        var FileStore = require('session-file-store')(session);

        app.use(session({
            resave: false,
            saveUninitialized: false,
            store: new FileStore(),
            secret: 'hehe',
            cookie:{
                maxAge: 3000000
            }
        }));
    }
}

function initRoutes(app,directory){
    require('../routes/index.js')(app,directory);
}
