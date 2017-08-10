module.exports = getScoreByUserID;

function getScoreByUserID(userID,questionID,callback){

    let config = this.config;
    let sql = config.modules['saferman'].format('SELECT answer,score FROM AnswerTable WHERE userID=? AND questionID=?',
        [userID,questionID]);

    config.modules['saferman'].sql(sql,function(results){
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
