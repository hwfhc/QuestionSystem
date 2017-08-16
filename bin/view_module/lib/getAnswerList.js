module.exports = getAnswerList;

const saferman = require('saferman');

function getAnswerList(questionID,callback){

    let sql = 'SELECT ID,Username FROM AnswerTable WHERE questionID=' + questionID;

    saferman.sql(sql,function(result){
        executeCallback(result);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
