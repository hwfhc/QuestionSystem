module.exports = setScoreByID;

const saferman = require('saferman');

function setScoreByID(ID,score,callback){
    let sqlString = saferman.format('UPDATE AnswerTable SET score=? WHERE ID=?',
        [score,ID]);

    saferman.sql(sqlString,function(){
        executeCallback();
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
