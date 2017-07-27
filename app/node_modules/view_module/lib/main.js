module.exports = start;

function start(config){

    return (new API(config));
};

function API(config){
    this.config = config;
}

API.prototype.getQuestionList = require('./getQuestionList.js');

API.prototype.getAnswerList = require('./getAnswerList.js');

API.prototype.getQuestionDetail = require('./getQuestionDetail.js');

API.prototype.getAnswerAndUserIDbyID = require('./getAnswerAndUserIDbyID.js');

API.prototype.getScoreByUserID = require('./getScoreByUserID.js');
