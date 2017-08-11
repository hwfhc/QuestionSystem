module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.isAvailable = require('./isAvailable.js');

API.prototype.Add = require('./Add.js');

API.prototype.Delete = require('./Delete.js');
