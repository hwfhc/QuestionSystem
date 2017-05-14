module.exports = start;

function start(config){
    var app = config.app;

    return (new API(config));
};

function API(config){
    this.config = config;
}

//exec callback function
API.prototype.isAvailable = require('./isAvailable.js');

API.prototype.Add = require('./Add.js');

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
