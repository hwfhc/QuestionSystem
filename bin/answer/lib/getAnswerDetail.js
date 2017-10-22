module.exports = getAnswerDetail;

const saferman = require('saferman');

function getAnswerDetail(ID,callback){

    let sql = saferman.format(
        `SELECT title,description,answer,Name
        FROM AnswerTable,AskQuestionTable,PersonalInformation
        WHERE AnswerTable.ID=? AND
              AskQuestionTable.ID = AnswerTable.questionID AND
              PersonalInformation.ID = AnswerTable.userID
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
