var express = require('express');

//init global config
var config = {
    app: express(),
    directory: '/home/firewaterge/Repositories/GuildHall/public',
    modules: []
};


//module load area
config.modules['sign_module'] = (require('./sign_module'))(config);
config.modules['rights_management'] = (require('./rights_management'))(config);
config.modules['saferman'] = (require('./saferman'))(config);

/*config.modules['rights_management'].isAvailable(0,'asd',function(value){
    console.log(value);
});*/
config.modules['rights_management'].Add(0,'hhh');

//start server, and listen to port
var server = config.app.listen(8080,function(){
    console.log('server start...');
});
