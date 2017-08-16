module.exports = answerAskQuestion;

const saferman = require('saferman');
const personalinformation_module = require('../../personalinformation_module');

function answerAskQuestion(answer,questionID,userID,callback){

    var sql = saferman.format('SELECT ID FROM AnswerTable WHERE questionID=? AND userID=?',
        [questionID,userID]);

    saferman.sql(sql,function(results){
        if(results.length != 0){
            var ID = results[0].ID;
            haveAnswered();
        }else{
            haveNotAnswered();
        }

        function haveNotAnswered(){
            personalinformation_module.getUsernameByID(userID,function(username){
                if(username){
                    var sqlString = saferman.format(
                        'INSERT INTO AnswerTable (ID,questionID,userID,Username,answer,score,state) VALUE (null,?,?,?,?,0,0)',
                        [questionID,userID,username,answer]);
                    saferman.sql(sqlString,executeCallback);
                }
            });
        }

        function haveAnswered(){
            var sqlString = saferman.format('UPDATE AnswerTable SET answer=?,score=0 WHERE ID=?',
                [answer,ID]);
            saferman.sql(sqlString,executeCallback);
        }
    })


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
