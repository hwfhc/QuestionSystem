//test environment init
var expect = require('chai').expect;
var directory = '../../';

//module load area
const saferman = require('saferman')('879574764');
const answer_module = require(directory + './answer_module');

describe('answerAskQuestion',function(){

    before(function(done){

        let deleteAnswerTable = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM AnswerTable',function(){
                saferman.sql('TRUNCATE AnswerTable',function(){
                    resolve();
                });
            });
        }).then(function(){
            let insertAnswerTable1 = new Promise(function(resolve,reject){

                let sqlString = saferman.format(
                    'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUES (?,?,?,?,?,?)',
                    [1,1,1,'test1',0,0]);

                saferman.sql(
                    sqlString,function(){
                        resolve();
                    });
            });

            let insertAnswerTable2 = new Promise(function(resolve,reject){

                let sqlString = saferman.format(
                    'INSERT INTO AnswerTable (ID,questionID,userID,answer,score,state) VALUES (?,?,?,?,?,?)',
                    [2,1,2,'test2',0,0]);

                saferman.sql(sqlString,function(){
                    resolve();
                });
            });

            Promise.all([
                insertAnswerTable1,
                insertAnswerTable2
            ]).then(function(){
                done();
            });
        });

    });

    it('add answer3',function(done){
        let answerAskQuestion = new Promise((resolve,reject)=>{
            answer_module.answerAskQuestion('test3',2,1,function(){
                resolve();
            });
        }).then(function(){
            let sqlString = saferman.format(
                'SELECT * FROM AnswerTable WHERE ID=?',
                [3]);

            saferman.sql(sqlString,function(results){
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
            answer_module.answerAskQuestion('test2 update',1,2,function(){
                resolve();
            });
        }).then(function(){
            let sqlString = saferman.format(
                'SELECT * FROM AnswerTable WHERE ID=?',
                [2]);

            saferman.sql(sqlString,function(results){
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
