var express = require('express');

//init global config
var config = {
    app: express(),
    directory: '/home/firewaterge/Repositories/GuildHall/public',
    modules: []
};

//module load area
config.modules['sign_module'] = (require('./sign_module'))(config);

//call function of the module in this way
config.modules['sign_module'].hehe();

//start server, and listen to port
var server = config.app.listen(8080,function(){
    console.log('server start...');
});
