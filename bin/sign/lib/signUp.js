module.exports = signUp;

const saferman = require('saferman');

function signUp(username,password,callback){

    if(!checkUsername(username) || !checkPassword(password)){
        executeCallback();
        return;
    }

    new Promise((resolve,reject) => {
        let sqlString = saferman.format(
            `SELECT ID FROM USER
            WHERE username=?`,
            [username]);

        var isDuplicate;

        saferman.sql(sqlString,function(results){
            if(results.length != 0){
                isDuplicate = true;

                resolve(isDuplicate);
            }else{
                isDuplicate = false;

                resolve(isDuplicate);
            }
        });
    }).then(isDuplicate => {
        if(isDuplicate)
            NameDuplicate();
        else
            NameNotDuplicate();
    });

    function NameNotDuplicate(){
        var insertUser = new Promise(function(resolve,reject){
            let sqlString = saferman.format(
                `INSERT INTO USER (ID,username)
                VALUE (null,?)`,
                [username]);

            saferman.sql(sqlString,function(){
                resolve();
            });
        });

        var insertShadow = new Promise(function(resolve,reject){
            let sqlString = saferman.format(
                `INSERT INTO SHADOW (ID,shadow)
                VALUE (null,?)`,
                [password]);

            saferman.sql(sqlString,function(){
                resolve();
            });

        });

        Promise.all([insertUser,insertShadow])
            .then(executeCallback);

    };

    function NameDuplicate(){
        executeCallback()
    };

    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}

function checkUsername(username){
    let regexpForUsername = new RegExp(/[^\u4e00-\u9fa5\w]/);
    let isUsernameLeagal = (username != '' && regexpForUsername.test(username) != true);

    if(isUsernameLeagal){
        //console.log('username is leagal');
        return true;
    }else{
        //console.log('username is not leagal');
        return false;
    }
}

function checkPassword(password){
    let regexpForPassword = new RegExp(/[^\w]/);
    let isPasswordLeagal =(password != '' && regexpForPassword.test(password) != true);

    if(isPasswordLeagal){
        //console.log('password is leagal');
        return true;
    }else{
        //console.log('password is not leagal');
        return false;
    }
}
