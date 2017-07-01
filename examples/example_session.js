var express = require('express');
var session = require('express-session');

var FileStore = require('session-file-store')(session);

app = express();

app.use(session({
    store: new FileStore(),
    secret: 'hehe',
}));

app.get('/index',function(req,res){
    if(req.session.isVisit){
        req.session.isVisit = req.session.isVisit + 1;
        res.send('sd: ' + req.session.isVisit);
    }else{
        req.session.isVisit=1;
        res.send('sd: ' + req.session.isVisit);
    }
});

//start server, and listen to port
var server = app.listen(8080,function(){
    console.log('server start...');
});

