module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.getUsernameByID = require('./getUsernameByID.js');
