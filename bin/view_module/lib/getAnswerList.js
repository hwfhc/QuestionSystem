module.exports = getAnswerList;

function getAnswerList(questionID,callback){

    let config = this.config;
    getList();


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    function getList(){

        let sql = 'SELECT ID,answer FROM AnswerTable WHERE questionID=' + questionID;

        config.modules['saferman'].sql(sql,function(results){
            executeCallback(JSON.stringify(results));
        });

    };

}
