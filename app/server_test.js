exports.start = start;

var express = require('express');
var bodyParser = require('body-parser');//用于处理表单数据
var multipart = require('connect-multiparty');//用于处理AJAX表单

var multipartMiddleware = multipart();

//
var config = {
    app: express(),
    directory: '/usr/local/Repositories/GuildHall/public',
    modules: []
};

config.modules.push(sign = (require('./sign'))());//用于处理用户登注册
//

function start(){
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/',function(req,res){
        res.sendFile(root + '/index.html');
    });

    app.get('/css/:file',function(req,res){
        res.sendFile(root + '/css/' + req.params['file']);
    });

    app.get('/javascripts/:file',function(req,res){
        res.sendFile(root + '/javascripts/' + req.params['file']);
    });

    app.post('/signIn',function(req,res){
        var user = {
            username: req.body.username,
            password: req.body.password
        }
        sign.In(user);
    });

    app.post('/signUp',multipartMiddleware,function(req,res){
        console.log(req.body);
        var user = {
            username: req.body.username,
            password: req.body.password
        }
        sign.Up(user);
    });

    var server = app.listen(80,function(){
        console.log('server start...');
    })
};
