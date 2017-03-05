exports.start = start;

var express = require('express');
var bodyParser = require('body-parser');//用于处理表单数据
var sign = require('./Sign');//用于处理用户登注册

var app = express();

function start(root){
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

    app.post('/signUp',function(req,res){
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
