module.exports = getUsernameByID;

function getUsernameByID(ID,callback){

    let config = this.config;
    getUsername();


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    function getUsername(){

        let sql = 'SELECT Name FROM PersonalInformation WHERE ID=' + ID;

        config.modules['saferman'].sql(sql,function(results){
            executeCallback(results[0].Name);
        });

    };

}
