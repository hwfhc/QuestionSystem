module.exports = answerAskQuestion;

const saferman = require('saferman');

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

            let sql = 'SELECT count(ID) FROM AnswerTable';
            saferman.sql(sql,function(results){
                let NextUsableID = results[0]['count(ID)'] + 1;

                initAnswerTable(NextUsableID);
                executeCallback();

                function initAnswerTable(NextUsableID){
                    let sql = saferman.format(
                        'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUE (?,?,?,?,0,0)',
                        [NextUsableID,questionID,userID,answer]);
                    saferman.sql(sql);
                }
            });

        }

        function haveAnswered(){
            var sql = saferman.format('UPDATE AnswerTable SET answer=?,score=0 WHERE ID=?',
                [answer,ID]);

            saferman.sql(sql,function(results){
                executeCallback();
            });
        }
    })


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
