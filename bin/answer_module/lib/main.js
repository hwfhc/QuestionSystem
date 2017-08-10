module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.answerAskQuestion = require('./answerAskQuestion.js');

API.prototype.setScoreByID = require('./setScoreByID.js');
