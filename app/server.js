var express = require('express');
var session = require('express-session');


//init global config
var directory = '/home/firewaterge/Repositories/GuildHall';

var config = {
    app: express(),
    directory: directory,
    modules: []
};



commonRouteInit();
moduleInit();

//start server, and listen to port
var server = config.app.listen(8080,function(){
    console.log('server start...');
});



function commonRouteInit(){
    (require('../routes/main.js')(config));
}

function moduleInit(){

    config.modules['sign_module'] = (require('sign_module'))(config);
    config.modules['rights_management'] = (require('rights_management'))(config);
    config.modules['personalinformation_module'] = (require('personalinformation_module'))(config);
    config.modules['saferman'] = (require('saferman'))(config);
}


