var express = require('express');


//init global config
var directory = '/home/firewaterge/Repositories/GuildHall/public';

var config = {
    app: express(),
    directory: directory,
    modules: []
};


//init common route
config.app.get('/css/:file',function(req,res){
    console.log(directory + '/css/' + req.params['file']);
    res.sendFile(directory + '/css/' + req.params['file']);
});

config.app.get('/javascripts/:file',function(req,res){
    res.sendFile(root + '/javascripts/' + req.params['file']);
});



//module load area
config.modules['sign_module'] = (require('sign_module'))(config);
config.modules['rights_management'] = (require('rights_management'))(config);
config.modules['personalinformation_module'] = (require('personalinformation_module'))(config);
config.modules['saferman'] = (require('saferman'))(config);

config.modules['personalinformation_module'].initUser('fea');

//start server, and listen to port
var server = config.app.listen(8080,function(){
    console.log('server start...');
});
