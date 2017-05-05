var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '879574764',
    database : 'QuestionSystem'
});

connection.connect();

connection.query('SELECT * FROM RightsTable',
        function (error, results, fields){
            if (error) throw error;
            console.log(results[0].Rights.split('|').forEach(function(item,index,array){
                console.log('item='+item);
                console.log('publish'==item);
            }));
        });

connection.end();
