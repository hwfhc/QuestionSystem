module.exports = setScoreByID;

function setScoreByID(ID,score,callback){

    let sql = 'UPDATE AnswerTable SET score=' + score + ' WHERE ID=' + ID;

    this.config.modules['saferman'].sql(sql,function(){
        executeCallback();
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
