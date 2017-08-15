module.exports = getIdByUsernameAndPassword;

const saferman = require('saferman');

function getIdByUsernameAndPassword(username,password,callback){
    let sqlString = saferman.format(
        'SELECT ID FROM PersonalInformation WHERE Name=?',
        [username]);
    let ID;

    new Promise(function(resolve,reject){
        saferman.sql(sqlString,(results) => {
            if(results[0] != undefined){
                ID = results[0].ID;
                resolve();
            }else{
                //console.log('unvalid username');
                executeCallback(null);
            }
        });
    }).then(function(){
        sqlString = saferman.format(
            'SELECT Shadow FROM ShadowTable WHERE ID=?',
            [ID]);

        saferman.sql(sqlString,function(results){
            if(results[0].Shadow === password){
                //console.log('match ,and ID is '+ ID);
                executeCallback(ID);
            }else{
                //console.log('not match');
                executeCallback(null);
            }

        });
    });

    function executeCallback(argument){
        if(callback!=undefined)
            callback(argument);
    }
}
