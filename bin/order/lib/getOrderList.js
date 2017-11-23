module.exports = getAnswerList;

const saferman = require('saferman');

function getAnswerList(questionID,callback){


    let sql = saferman.format(
        `SELECT ID,username
        FROM ANSWER,USER
        WHERE questionID = ? AND
        ANSWER.authorID = USER.ID`,
        [ID]);

    saferman.sql(sql,function(result){
        executeCallback(result);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
