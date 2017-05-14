module.exports = isAvailable;

function isAvailable(ID,right,callback){
    var config = this.config;

    //check whether right string is legal
    if(right != 'publish'
        && right != 'answer'
        && right != 'view'
        && right != 'view_personal_infromation'
    ){
        if(callback!=undefined)
            callback(false);

        return;
    }

    var sql_string = 'SELECT Rights FROM RightsTable WHERE ID=' + ID;

    config.modules['saferman'].sql(sql_string,function(results){
        var value;

        if(results[0] != undefined){
            var match = new RegExp(right);
            value = (match.exec(results[0].Rights)!=null);

            if(callback!=undefined)
                callback(value);
        }else{
            value = false;

            if(callback!=undefined)
                callback(value);
        }
    });
}
