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
    var sql_string = 'SELECT * FROM RightsTable WHERE ID=' + ID;

    this.config.modules['saferman'].sql(sql_string,function(results){
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

    //check rights string

    //get rights string
    var sql_string = 'SELECT * FROM RightsTable WHERE ID=' + ID;

    this.config.modules['saferman'].sql(sql_string,function(results){
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

    //update rights string
    this.config.modules['saferman'].sql("UPDATE RightsTable SET rights='write' WHERE ID=0");
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
