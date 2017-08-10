module.exports = answerAskQuestion;

function answerAskQuestion(answer,questionID,userID,callback){

    var config = this.config;

    var sql = config.modules['saferman'].format('SELECT ID FROM AnswerTable WHERE questionID=? AND userID=?',
        [questionID,userID]);

    config.modules['saferman'].sql(sql,function(results){
        if(results.length != 0){
            var ID = results[0].ID;
            haveAnswered();
        }else{
            haveNotAnswered();
        }

        function haveNotAnswered(){

            let sql = 'SELECT count(ID) FROM AnswerTable';
            config.modules['saferman'].sql(sql,function(results){
                let NextUsableID = results[0]['count(ID)'] + 1;

                initAnswerTable(NextUsableID);
                executeCallback();

                function initAnswerTable(NextUsableID){
                    let sql = config.modules['saferman'].format(
                        'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUE (?,?,?,?,0,0)',
                        [NextUsableID,questionID,userID,answer]);
                    config.modules['saferman'].sql(sql);
                }
            });

        }

        function haveAnswered(){
            var sql = config.modules['saferman'].format('UPDATE AnswerTable SET answer=?,score=0 WHERE ID=?',
                [answer,ID]);

            config.modules['saferman'].sql(sql,function(results){
                executeCallback();
            });
        }
    })


    function executeCallback(argumentOfCallback){
        if(callback!=undefined)
            callback(argumentOfCallback);
    }
}
