module.exports = getQuestionDetail;

const saferman = require('saferman');

function getQuestionDetail(userID,questionID,callback){

    let sql = saferman.format(
        `SELECT title,description,answer,total_score,Name,AnswerTable.score
         FROM AskQuestionTable,PersonalInformation
         LEFT JOIN AnswerTable ON
              AnswerTable.userID = ? AND
              AnswerTable.questionID = ?
         WHERE AskQuestionTable.ID=? AND
              AskQuestionTable.authorID = PersonalInformation.ID
         LIMIT 1`,
        [questionID,userID,questionID]);


    saferman.sql(sql,results => executeCallback(results[0]));


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
