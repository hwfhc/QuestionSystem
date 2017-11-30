module.exports = getItemDetail;

const saferman = require('saferman');

function getItemDetail(userID,itemID,callback){

    let sql = saferman.format(
        `SELECT title,description,username
         FROM ITEM,USER
         WHERE ITEM.ID=? AND
               ITEM.authorID = USER.ID
         LIMIT 1`,
        [itemID]);


    saferman.sql(sql,results => executeCallback(results[0]));


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
