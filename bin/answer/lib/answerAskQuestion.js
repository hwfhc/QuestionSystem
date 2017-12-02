module.exports = answerAskQuestion;

const saferman = require('saferman');
const user = require('../../user');

function answerAskQuestion(answer,questionID,userID,callback){

    var sql = saferman.format(
        `SELECT ID FROM ANSWER
        WHERE questionID=? AND authorID=?`,
        [questionID,userID]);

    saferman.sql(sql,function(results){
        if(results.length != 0){
            var ID = results[0].ID;
            haveAnswered();
        }else{
            haveNotAnswered();
        }

        function haveNotAnswered(){
            user.getUsernameByID(userID,function(username){
                if(username){
                    var sqlString = saferman.format(
                        `INSERT INTO
                        ANSWER (ID,questionID,authorID,answer,score)
                        VALUE (null,?,?,?,?)`,
                        [questionID,userID,answer,5]);
                    saferman.sql(sqlString,executeCallback);
                }
            });
        }

        function haveAnswered(){
            var sqlString = saferman.format(
                `UPDATE ANSWER SET answer=?,score=0
                WHERE ID=?`,
                [answer,ID]);
            saferman.sql(sqlString,executeCallback);
        }
    })


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
