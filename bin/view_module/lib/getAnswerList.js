module.exports = getAnswerList;

const saferman = require('saferman');

function getAnswerList(questionID,callback){

    let sql = 'SELECT ID,answer FROM AnswerTable WHERE questionID=' + questionID;

    saferman.sql(sql,function(results){
        executeCallback(JSON.stringify(results));
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
