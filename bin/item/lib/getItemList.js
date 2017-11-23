module.exports = getQuestionList;

const saferman = require('saferman');

function getQuestionList(callback){

    let sql = 'SELECT ID,title FROM QUESTION';

    saferman.sql(sql,function(results){
        executeCallback(results);
    });



    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
