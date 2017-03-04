exports.start = start;

var express = require('express');
var bodyParser = require('body-parser');//用于处理表单数据

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

    app.post('/test',function(req,res){
        res.send("username: " + req.body.username + "<br>password: " + req.body.password);
    });

    var server = app.listen(80,function(){
        console.log('server start...');
    })
};
