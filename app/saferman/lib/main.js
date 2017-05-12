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

//exec callback function
API.prototype.sql = function(sql,callback){
    this.connection.query(sql,function(error,results){
        if(error) throw error;

        //is callback function should be executed
        if(results.length != 0 && callback != undefined){
            callback(results);
        }
    });
}
