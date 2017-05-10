module.exports = start;

function start(config){
    var app = config.app;

    return (new API(config));
};

function API(config){
    this.config = config;
}

//exec callback function
API.prototype.sql = function(sql,callback){
    this.config.connection.query(sql,
        function (error, results, fields){
            if (error) throw error;

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
