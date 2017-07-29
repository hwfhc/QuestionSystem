var config = undefined;

var saferman = (require('saferman'))(config);
console.log('start');

var sql = 'UPDATE AnswerTable SET answer=? WHERE ID=1';
var answer =  "'" +'"eae"asd';
console.log(saferman.format(sql,[answer,1]));
