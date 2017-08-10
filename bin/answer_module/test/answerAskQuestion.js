//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['answer_module'] = (require(directory + './answer_module'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('answerAskQuestion',function(){

    before(function(done){
        var deleteAnswerTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM AnswerTable',function(){
                resolve();
            });
        }).then(function(){
            Promise.all([
                insertAnswerTable1,
                insertAnswerTable2
            ]).then(function(){
                done();
            });
        });

        let insertAnswerTable1 = new Promise(function(resolve,reject){

            let sqlString = config.modules['saferman'].format(
                'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUE (?,?,?,?,?,?)',
                [1,1,1,'test1',0,0]);

            config.modules['saferman'].sql(
                sqlString,function(){
                    resolve();
                });
        });

        let insertAnswerTable2 = new Promise(function(resolve,reject){

            let sqlString = config.modules['saferman'].format(
                'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUE (?,?,?,?,?,?)',
                [2,1,2,'test2',0,0]);

            config.modules['saferman'].sql(sqlString,function(){
                resolve();
            });
        });
    });

    it('add answer3',function(done){
        let answerAskQuestion = new Promise((resolve,reject)=>{
            config.modules['answer_module'].answerAskQuestion('test3',2,1,function(){
                resolve();
            });
        }).then(function(){
            let sqlString = config.modules['saferman'].format(
                'SELECT * FROM AnswerTable WHERE ID=?',
                [3]);

            config.modules['saferman'].sql(sqlString,function(results){
                expect(results[0].ID).to.be.equal(3);
                expect(results[0].ID).to.be.a('number');
                expect(results[0].questionID).to.be.equal(2);
                expect(results[0].questionID).to.be.a('number');
                expect(results[0].userID).to.be.equal(1);
                expect(results[0].userID).to.be.a('number');
                expect(results[0].answer).to.be.equal('test3');
                expect(results[0].answer).to.be.a('string');
                expect(results[0].score).to.be.equal(0);
                expect(results[0].score).to.be.a('number');
                expect(results[0].state).to.be.equal(0);
                expect(results[0].state).to.be.a('number');

                done();
            });
        });
    });

   it('update answer2',function(done){
        let answerAskQuestion = new Promise((resolve,reject)=>{
            config.modules['answer_module'].answerAskQuestion('test2 update',1,2,function(){
                resolve();
            });
        }).then(function(){
            let sqlString = config.modules['saferman'].format(
                'SELECT * FROM AnswerTable WHERE ID=?',
                [2]);

            config.modules['saferman'].sql(sqlString,function(results){
                expect(results[0].ID).to.be.equal(2);
                expect(results[0].ID).to.be.a('number');
                expect(results[0].questionID).to.be.equal(1);
                expect(results[0].questionID).to.be.a('number');
                expect(results[0].userID).to.be.equal(2);
                expect(results[0].userID).to.be.a('number');
                expect(results[0].answer).to.be.equal('test2 update');
                expect(results[0].answer).to.be.a('string');
                expect(results[0].score).to.be.equal(0);
                expect(results[0].score).to.be.a('number');
                expect(results[0].state).to.be.equal(0);
                expect(results[0].state).to.be.a('number');

                done();
            });
        });
    });

});
