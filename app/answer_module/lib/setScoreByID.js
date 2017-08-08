module.exports = setScoreByID;

function setScoreByID(ID,score,callback){
    let saferman =  this.config.modules['saferman'];
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
