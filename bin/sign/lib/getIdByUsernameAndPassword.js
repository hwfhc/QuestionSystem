module.exports = getIdByUsernameAndPassword;

const saferman = require('saferman');

function getIdByUsernameAndPassword(username,password,callback){
    let sqlString = saferman.format(
        `SELECT USER.ID FROM USER,SHADOW
         WHERE USER.username=? AND
               SHADOW.shadow=? AND
               SHADOW.ID = USER.ID
         LIMIT 1`,
        [username,password]);

    saferman.sql(sqlString,results => {
        if(results.length > 0){
            executeCallback(results[0].ID);
        }else{
            executeCallback(null);
        }
    });

    function executeCallback(argument){
        if(callback!=undefined) callback(argument);
    }
}
