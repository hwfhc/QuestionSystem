module.exports = publishAskQuestion;

const saferman = require('saferman');

function publishAskQuestion(title,description,total_score,authorID,callback){

    let isTitleDuplicate = new Promise((resolve,reject) => {
        let sql = saferman.format(
            'SELECT ID FROM QUESTION WHERE title=?',
            [title]);

        saferman.sql(sql,function(results){
            //console.log('results is: '+results.length);
            if(results.length == 0){
                //console.log('not duplicate');
                resolve();
            }else{
                //console.log('duplicate');
                reject();
            }
        });
    });

    isTitleDuplicate.then(titleNotDuplicate,titleDuplicate);


    function titleNotDuplicate(){

        let sql = saferman.format(
            'INSERT INTO QUESTION (ID,title,description,total_score,authorID) VALUE (null,?,?,?,?,?)',
            [title,description,total_score,authorID]);

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
