module.exports = getIdByUsernameAndPassword;

function getIdByUsernameAndPassword(username,password,callback){
    const saferman = this.config.modules['saferman'];

    let sqlString = saferman.format(
        'SELECT ID FROM PersonalInformation WHERE Name=?',
        [username]);

    saferman.sql(sqlString,(results) => {
        if(results[0] != undefined){
            let ID = results[0].ID;

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

            })

        }else{
            //console.log('unvalid username');
            executeCallback(null);
        }
    });


    function executeCallback(argument){
        if(callback!=undefined)
            callback(argument);
    }
}
