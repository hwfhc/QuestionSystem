module.exports = getScoreByUserID;

const saferman = require('saferman');

function getScoreByUserID(userID,questionID,callback){
    let sql = saferman.format('SELECT answer,score FROM AnswerTable WHERE userID=? AND questionID=?',
        [userID,questionID]);

    saferman.sql(sql,function(results){
        if(results.length != 0){
            executeCallback(results[0]);
        }else{
            executeCallback({
                score : 0,
                answer : 'You have not answer this question!'
            });
        }
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
