//test environment init
var expect = require('chai').expect;
var directory = '../../';

//module load area
const view_module = require(directory + './view_module');
const saferman = require('saferman');

describe('getQuestionList',function(){

    before(function(done){
        var deletePersonalInformation = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM AskQuestionTable',function(){
                resolve();
            });
        });

        var insertAskQuestionTable1 = new Promise(function(resolve,reject){
            saferman.sql(
                'INSERT INTO AskQuestionTable (ID,title,description,total_score,time,authorID) VALUE (1,"title1","description1",5,0,1)',function(){
                    resolve();
                });
        });

        var insertAskQuestionTable2 = new Promise(function(resolve,reject){
            saferman.sql(
                'INSERT INTO AskQuestionTable (ID,title,description,total_score,time,authorID) VALUE (2,"title2","description2",5,0,2)',function(){
                    resolve();
                });
        });

        Promise.all([
            insertAskQuestionTable1,
            insertAskQuestionTable2
        ]).then(function(){
            done();
        });
    });

    it('getQuestionList2',function(done){
        view_module.getQuestionList(function(results){
            expect(results.length).to.be.equal(2);

            expect(results[0].ID).to.be.equal(1);
            expect(results[0].ID).to.be.a('number');
            expect(results[0].title).to.be.equal('title1');
            expect(results[0].title).to.be.a('string');

            expect(results[1].ID).to.be.equal(2);
            expect(results[1].ID).to.be.a('number');
            expect(results[1].title).to.be.equal('title2');
            expect(results[1].title).to.be.a('string');

            done();
        });
    });

    it('getQuestionList1',function(done){
        view_module.getQuestionList(function(results){
            expect(results.length).to.be.equal(2);

            expect(results[0].ID).to.be.equal(1);
            expect(results[0].ID).to.be.a('number');
            expect(results[0].title).to.be.equal('title1');
            expect(results[0].title).to.be.a('string');

            expect(results[1].ID).to.be.equal(2);
            expect(results[1].ID).to.be.a('number');
            expect(results[1].title).to.be.equal('title2');
            expect(results[1].title).to.be.a('string');

            done();
        });

    });

});
