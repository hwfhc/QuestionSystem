module.exports = start;

var mysql = require('mysql');


function start(config){
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '879574764',
        database : 'QuestionSystem'
    });

    connection.connect();

    return (new API(config,connection));
};

function API(config,connection){
    this.config = config;
    this.connection = connection;
}

API.prototype.sql = function(sql,callback){
    //console.log('saferman.sql: execute');
    this.connection.query(sql,function(error,results){
        //console.log('saferman.sql: results is: '+results.length);
        if(error){
            console.log(err);
            console.log(err.stack);
        };

        if(callback != undefined){
            //console.log('saferman.sql: execute callback');
            callback(results);
        }
    });
}

API.prototype.format = function(sql,arr){
    ////console.log('saferman.format execute');
    var sql_string = this.connection.format(sql,arr);
    return sql_string;
}
