module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.publishAskQuestion = require('./publishAskQuestion.js');

//API.prototype.publishMultipleChoice = require('.publishMultipleChoice.js');

//以后再做   API.prototype.publishTeamWork = require('./publishTeamWork.js');

