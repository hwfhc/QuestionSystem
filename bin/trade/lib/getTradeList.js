module.exports = getAnswerList;

const saferman = require('saferman');

function getAnswerList(itemID,callback){


    let sql = saferman.format(
        `SELECT TRADE.ID,username
        FROM TRADE,USER
        WHERE itemID = ? AND
        TRADE.authorID = USER.ID`,
        [itemID]);

    saferman.sql(sql,function(result){
        executeCallback(result);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
