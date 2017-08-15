module.exports = signUp;

const saferman = require('saferman');

function signUp(username,password,callback){

    if(!checkUsername() || !checkPassword()){
        executeCallback();
        return;
    }

    new Promise((resolve,reject) => {
        let sqlString = saferman.format(
            'SELECT ID FROM PersonalInformation WHERE Name=?',
            [username]);

        saferman.sql(sqlString,function(results){
            //console.log('results is: '+results.length);
            if(results.length == 0){
                //console.log('not duplicate');
                resolve();
            }else{
                //console.log('duplicate');
                reject();
            }
        });
    }).then(NameNotDuplicate,NameDuplicate);



    function checkUsername(){
        let regexpForUsername = new RegExp(/[^\u4e00-\u9fa5\w]/);
        let isUsernameLeagal = ( username != '' && regexpForUsername.test(username) != true);

        if(isUsernameLeagal){
            //console.log('username is leagal');
            return true;
        }else{
            //console.log('username is not leagal');
            return false;
        }
    }

    function checkPassword(){
        let regexpForPassword = new RegExp(/[^\w]/);
        let isPasswordLeagal = ( password != '' && regexpForPassword.test(password) != true);

        if(isPasswordLeagal){
            //console.log('password is leagal');
            return true;
        }else{
            //console.log('password is not leagal');
            return false;
        }
    }

    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    function NameNotDuplicate(){
        let initRightsManagement = new Promise(function(resolve,reject){
            let sqlString = saferman.format(
                'INSERT INTO RightsTable (ID,Rights) VALUE (null,?)',
                ['|publish|view']);
            saferman.sql(sqlString,function(){
                resolve();
            });
        });

        let initPersonalInformation = new Promise(function(resolve,reject){
            let sqlString = saferman.format(
                'INSERT INTO PersonalInformation (ID,Name) VALUE (null,?)',
                [username]);
            saferman.sql(sqlString,function(){
                resolve();
            });
        });

        let initShadowTable = new Promise(function(resolve,reject){
            let sqlString = saferman.format(
                'INSERT INTO ShadowTable (ID,Shadow) VALUE (null,?)',
                [password]);

            saferman.sql(sqlString,function(){
                resolve();
            });
        });


        Promise.all([
            initRightsManagement,
            initPersonalInformation,
            initShadowTable
        ]).then(executeCallback);
    };

    function NameDuplicate(){
        executeCallback()
    };

}
