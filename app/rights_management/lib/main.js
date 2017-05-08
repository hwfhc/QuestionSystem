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
    this.config.connection.query('SELECT * FROM RightsTable',
        function (error, results, fields){
            if (error) throw error;

            if(results[0] != undefined){
                var match = /publish/
                console.log(match.exec(results[0].Rights)!=null);
            }else{
                return false;
            }
        });
}
