module.exports = publishAskQuestion;

const saferman = require('saferman');

function publishAskQuestion(title,description,total_score,authorID,callback){

    let isTitleDuplicate = new Promise((resolve,reject) => {
        let sql = saferman.format(
            'SELECT ID FROM ITEM WHERE title=?',
            [title]);

        saferman.sql(sql,function(results){
            if(results.length == 0){
                resolve();
            }else{
                reject();
            }
        });
    });

    isTitleDuplicate.then(titleNotDuplicate,titleDuplicate);


    function titleNotDuplicate(){

        let sql = saferman.format(
            'INSERT INTO ITEM (ID,title,description,price,authorID) VALUE (null,?,?,?,?)',
            [title,description,5,authorID]);

        saferman.sql(sql,executeCallback);
    };

    function titleDuplicate(){
        executeCallback()
    };


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
