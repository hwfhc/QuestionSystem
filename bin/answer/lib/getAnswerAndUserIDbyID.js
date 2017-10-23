module.exports = getAnswerAndUserIDbyID;

const saferman = require('saferman');

function getAnswerAndUserIDbyID(ID,callback){

    let sql = saferman.format(
        `SELECT answer,authoID,questionID,score
        FROM ANSWER
        WHERE ID=?`,
        [ID]);

    saferman.sql(sql,function(results){
        executeCallback(results[0]);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
