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

API.prototype.Delete = require('./Delete.js');
