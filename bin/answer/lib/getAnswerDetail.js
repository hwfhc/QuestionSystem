module.exports = getAnswerDetail;

const saferman = require('saferman');

function getAnswerDetail(ID,callback){

    let sql = saferman.format(
        `SELECT QUESTION.title,QUESTION.description,ANSWER.answer,USER.username
        FROM ANSWER,QUESTION,USER
        WHERE ANSWER.ID=? AND
              QUESTION.ID = ANSWER.questionID AND
              USER.ID = ANSWER.authorID
        LIMIT 1`,
        [ID]);

    saferman.sql(sql,function(results){
        executeCallback(results[0]);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
