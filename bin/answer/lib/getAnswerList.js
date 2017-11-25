module.exports = getAnswerList;

const saferman = require('saferman');

function getAnswerList(questionID,callback){


    let sql = saferman.format(
        `SELECT USER.ID,USER.username
        FROM ANSWER,USER
        WHERE ANSWER.questionID = ? AND
        ANSWER.authorID = USER.ID`,
        [questionID]);

    saferman.sql(sql,function(result){
        executeCallback(result);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
