module.exports = start;

function start(config){
    var app = config.app;

    return (new API(config));
};

function API(config){
    this.config = config;
}

//exec callback function
API.prototype.isAvailable = function(ID,right,callback){
    var config = this.config;

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

API.prototype.Add = function(ID,right){
    var config = this.config;

    //check rights string

    //get rights string
    var sql_string = 'SELECT Rights FROM RightsTable WHERE ID=' + ID;

    config.modules['saferman'].sql(sql_string,function(results){

        var match = new RegExp(right);
        var value = (match.exec(results[0].Rights)!=null);

        if(value){
            //user has this right
        }else{
            //user not has this right
            //update rights string
            sql_string = "UPDATE RightsTable SET Rights='" + results[0].Rights + "|" + right + "' WHERE ID=" + ID;
            config.modules['saferman'].sql(sql_string);
        }

    });
}

API.prototype.Delete = function(ID,right){
    this.config.modules['saferman'].sql('SELECT * FROM RightsTable',function(results){
        var value;

        if(results[0] != undefined){
            var match = new RegExp(right);
            value = (match.exec(results[0].Rights)!=null);

            callback(value);
        }else{
            value = false;

            callback(value);
        }
    });
}
