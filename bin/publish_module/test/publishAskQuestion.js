//test environment init
var expect = require('chai').expect;
var directory = '../../';

//module load area
const publish_module = require(directory + './publish_module');
const saferman = require('saferman')('879574764');

describe('initUser',function(){

    before(function(done){
        saferman.sql('DELETE FROM AskQuestionTable',function(){
            saferman.sql('TRUNCATE AskQuestionTable',function(){
                done();
            });
        });
    });

    it('question1 author1: check title,description,total_score',function(done){

        publish_module.publishAskQuestion('test','wwww',5,1,function(){

            var sql = saferman.format('SELECT title,description,total_score FROM AskQuestionTable WHERE ID=?',
                [1]);

            saferman.sql(sql,handleSQLResults);


            function handleSQLResults(sqlResults){
                let result = sqlResults[0];

                expect(sqlResults.length).to.be.equal(1);
                expect(result.title).to.be.a('string');
                expect(result.title).to.be.equal('test');

                expect(result.description).to.be.a('string');
                expect(result.description).to.be.equal('wwww');

                expect(result.total_score).to.be.a('number');
                expect(result.total_score).to.be.equal(5);

                done();
            }

        });

    });

    it('question2 autho1: ID increase test',function(done){

        publish_module.publishAskQuestion('testman','aaa',5,1,function(){

            var sql = saferman.format('SELECT title,description,total_score FROM AskQuestionTable WHERE ID=?',
                [2]);

            saferman.sql(sql,handleSQLResults);


            function handleSQLResults(sqlResults){
                let result = sqlResults[0];

                expect(sqlResults.length).to.be.equal(1);
                expect(result.title).to.be.a('string');
                expect(result.title).to.be.equal('testman');

                expect(result.description).to.be.a('string');
                expect(result.description).to.be.equal('aaa');

                expect(result.total_score).to.be.a('number');
                expect(result.total_score).to.be.equal(5);

                done();
            }

        });

    });

    it('question3 author2: other author publish test',function(done){

        publish_module.publishAskQuestion('safe','wwww',5,2,function(){

            var sql = saferman.format('SELECT authorID FROM AskQuestionTable WHERE ID=?',
                [3]);

            saferman.sql(sql,handleSQLResults);


            function handleSQLResults(sqlResults){
                let result = sqlResults[0];

                expect(sqlResults.length).to.be.equal(1);

                expect(result.authorID).to.be.a('number');
                expect(result.authorID).to.be.equal(2);

                done();
            }

        });

    });

    it('question1: duplicate title test',function(done){

        publish_module.publishAskQuestion('test','eeee',5,2,function(){

            var sql = saferman.format('SELECT ID FROM AskQuestionTable WHERE title=?',
                ['test']);

            saferman.sql(sql,handleSQLResults);


            function handleSQLResults(sqlResults){
                let result = sqlResults[0];

                expect(sqlResults.length).to.be.equal(1);

                done();
            }

        });

    });

});
