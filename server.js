var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/css/:file',function(req,res){
    res.sendFile(__dirname + '/css/' + req.params['file']);
});

app.get('/javascripts/:file',function(req,res){
    res.sendFile(__dirname + '/javascripts/' + req.params['file']);
});

app.get('/articles/:file',function(req,res){
    res.sendFile(__dirname + '/articles/' + req.params['file']);
});

var server = app.listen(80,function(){
    console.log('server running');
});
