module.exports = getQuestionList;

function getQuestionList(callback){

    let config = this.config;
    getList();


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    function getList(){

        let sql = 'SELECT ID,title FROM AskQuestionTable';

        config.modules['saferman'].sql(sql,function(results){
            executeCallback(results);

            ////bug is here !!!
            //executeCallback(JSON.stringify(results));
        });

    };

}
