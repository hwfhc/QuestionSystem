module.exports = getQuestionDetail;

const saferman = require('saferman');

function getQuestionDetail(ID,callback){

    let sql = 'SELECT title,description,total_score,authorID FROM AskQuestionTable WHERE ID=' + ID;

    saferman.sql(sql,function(results){
        executeCallback(results[0]);
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
