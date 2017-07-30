module.exports = signUp;

function signUp(username,password,callback){

    let config = this.config;

    if(!checkUsername() || !checkPassword()){
        executeCallback();
        return;
    }

    let isNameDuplicate = new Promise((resolve,reject) => {
        let sql = config.modules['saferman'].format(
            'SELECT ID FROM PersonalInformation WHERE Name=?',
            [username]);

        this.config.modules['saferman'].sql(sql,function(results){
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
        var regexpForUsername = new RegExp(/[^\u4e00-\u9fa5\w]/);
        var isUsernameLeagal = ( username != '' && regexpForUsername.test(username) != true);

        if(isUsernameLeagal){
            //console.log('username is leagal');
            return true;
        }else{
            //console.log('username is not leagal');
            return false;
        }
    }

    function checkPassword(){
        var regexpForPassword = new RegExp(/[^\w]/);
        var isPasswordLeagal = ( password != '' && regexpForPassword.test(password) != true);

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

        let sql = 'SELECT count(ID) FROM PersonalInformation';

        config.modules['saferman'].sql(sql,function(results){
            let NextUsableID = results[0]['count(ID)'] + 1;

            initRightsManagement(NextUsableID);
            initPersonalInformation(NextUsableID);
            initShadowTable(NextUsableID);

            Promise.all([
                initRightsManagement,
                initPersonalInformation,
                initShadowTable
            ]).then(executeCallback);



            function initRightsManagement(NextUsableID){
                config.modules['rights_management'].initRightsOfUser(NextUsableID);
            }

            function initPersonalInformation(NextUsableID){
                let sql = config.modules['saferman'].format(
                    'INSERT INTO PersonalInformation (ID,Name) VALUE (?,?)',
                    [NextUsableID,username]);
                config.modules['saferman'].sql(sql);
            }

            function initShadowTable(NextUsableID){
                let sql = config.modules['saferman'].format(
                    'INSERT INTO ShadowTable (ID,Shadow) VALUE (?,?)',
                    [NextUsableID,password]);

                config.modules['saferman'].sql(sql);
            }
        });

    };

    function NameDuplicate(){
        executeCallback()
    };

}
