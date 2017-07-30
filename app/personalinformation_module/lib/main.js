module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.initUser = require('./initUser.js');

API.prototype.ifUsernameMatchPasswordGetID = require('./ifUsernameMatchPasswordGetID.js');

API.prototype.getUsernameByID = require('./getUsernameByID.js');
