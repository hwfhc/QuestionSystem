module.exports = getUsernameByID;

const saferman = require('saferman');

function getUsernameByID(ID,callback){

    let sql = saferman.format(
        'SELECT money FROM USER WHERE ID=?',
        [ID]);

    saferman.sql(sql,results => {
        if(results.length){
            executeCallback(results[0].money);
        }else{
            executeCallback(null);
        }
    });


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
