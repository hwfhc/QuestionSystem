module.exports = answerAskQuestion;

const saferman = require('saferman');
const user = require('../../user');

function answerAskQuestion(authorID,itemID,callback){

    var sqlString = saferman.format(
        `INSERT INTO
                        TRADE (ID,authorID,itemID)
                        VALUE (null,?,?)`,
        [authorID,itemID]);
    saferman.sql(sqlString,executeCallback);

    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
