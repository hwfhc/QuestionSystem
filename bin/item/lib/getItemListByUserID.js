module.exports = getQuestionList;

const saferman = require('saferman');

function getQuestionList(userID,callback){

    let sql = saferman.format(
        `SELECT ITEM.ID,ITEM.title
         FROM ITEM,TRADE
         WHERE ITEM.ID=TRADE.itemID AND
               TRADE.authorID=?`,
        [userID]);

    saferman.sql(sql,function(results){
        executeCallback(results);
    });



    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
