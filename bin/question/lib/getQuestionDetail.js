module.exports = getQuestionDetail;

const saferman = require('saferman');

function getQuestionDetail(userID,questionID,callback){

    let sql = saferman.format(
        `SELECT title,description,answer,total_score,username,score
         FROM QUESTION,USER
         LEFT JOIN ANSWER ON
              ANSWER.authorID = ? AND
              ANSWER.questionID = ?
         WHERE QUESTION.ID=? AND
               QUESTION.authorID = USER.ID
         LIMIT 1`,
        [questionID,userID,questionID]);


    saferman.sql(sql,results => executeCallback(results[0]));


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
