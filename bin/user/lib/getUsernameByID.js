module.exports = getUsernameByID;

const saferman = require('saferman');

function getUsernameByID(ID,callback){

    let sql = saferman.format(
        'SELECT username FROM USER WHERE ID=?',
        [ID]);

    saferman.sql(sql,results => {
        if(results.length){
            executeCallback(results[0].username);
        }else{
            executeCallback(null);
        }
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
