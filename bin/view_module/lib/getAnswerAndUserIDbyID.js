module.exports = getAnswerAndUserIDbyID;

const saferman = require('saferman');

function getAnswerAndUserIDbyID(ID,callback){

    let sql = 'SELECT answer,userID,questionID,score FROM AnswerTable WHERE ID=' + ID;

    saferman.sql(sql,function(results){
        executeCallback(results[0]);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
