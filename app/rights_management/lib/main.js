module.exports = start;

function start(config){
    var app = config.app;

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.isAvailable = function(ID,right){
    this.config.connection.query('SELECT * FROM RightsTable',
        function (error, results, fields){
            if (error) throw error;
            results[0].Rights.split('|').some(function(item,index,array){
                return (right == item);
            });
        });

}
