module.exports = initUser;

function initUser(Name,password,callback){

    let config = this.config;

    let isNameDuplicate = new Promise((resolve,reject) => {
        let sql = 'SELECT ID FROM PersonalInformation WHERE Name="' + Name + '"';

        config.modules['saferman'].sql(sql,function(results){
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

    isNameDuplicate.then(NameNotDuplicate,NameDuplicate);



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
                let sql = 'INSERT INTO PersonalInformation (ID,Name) VALUE (' + NextUsableID + ",'" + Name + "')";
                config.modules['saferman'].sql(sql);
            }

            function initShadowTable(NextUsableID){
                let sql = 'INSERT INTO ShadowTable (ID,Shadow) VALUE (' + NextUsableID + ",'" + password + "')";
                config.modules['saferman'].sql(sql);
            }
        });

    };

    function NameDuplicate(){
        executeCallback()
    };

}

