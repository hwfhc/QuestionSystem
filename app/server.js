var express = require('express');

//init mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '879574764',
    database : 'QuestionSystem'
});

connection.connect();

//init global config
var config = {
    app: express(),
    directory: '/home/firewaterge/Repositories/GuildHall/public',
    modules: [],
    connection : connection
};

//module load area
config.modules['sign_module'] = (require('./sign_module'))(config);
config.modules['rights_management'] = (require('./rights_management'))(config);

//call function of the module in this way

/*function test(result){
    console.log(result);
}*/
//config.modules['rights_management'].isAvailable(1,'hehe',test);

//start server, and listen to port
var server = config.app.listen(8080,function(){
    console.log('server start...');
});
