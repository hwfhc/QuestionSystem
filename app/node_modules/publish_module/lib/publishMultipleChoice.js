module.exports = publishMultipleChoice;

function publishMultipleChoice(title,description,choices,score,correct,time,author,callback){
    console.log('publishMultipleChoice function execute');

    var config = this.config;
    var sql= "INSERT INTO MultipleChoiceTabletitle(ID,title,description,choices,score,correct,time,author,callback)VALUES("+
    ID+",title,description,choices,score,correct,time,author)";

    config.modules['saferman'].sql(sql,executeCallback);
   
    function executeCallback(){
        if(callback!=undefined)
            callback();
    }

}