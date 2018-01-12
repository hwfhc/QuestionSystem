module.exports = answerAskQuestion;

const saferman = require('saferman');
const user = require('../../user');

function answerAskQuestion(authorID,itemID,callback){

    var sqlString = saferman.format(
        `INSERT INTO TRADE (ID,authorID,itemID)
            VALUE (null,?,?)`,
        [authorID,itemID]);

    var sqlString2 = saferman.format(
        `UPDATE USER SET money=money-1
        WHERE ID=?`,
        [authorID]);

    saferman.sql(sqlString,function(){
        saferman.sql(sqlString2,executeCallback)
    });

    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
