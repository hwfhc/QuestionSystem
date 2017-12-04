const expect = require('chai').expect;
const directory = '../../';

const sign = require(directory + './sign');
const saferman = require('saferman')('879574764');

describe('signUp',function(){

    before(function(done){
        let deleteUSER = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM USER',function(){
                saferman.sql('TRUNCATE USER',function(){
                    resolve();
                });
            });
        });

        let deleteSHADOW = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM SHADOW',function(){
                saferman.sql('TRUNCATE SHADOW',function(){
                    resolve();
                });
            });
        });


        Promise.all([
            deleteUSER,
            deleteSHADOW
        ]).then(function(){
            done();
        })
    });

    it('init user1,valid',function(done){

        sign.signUp('testman','123',function(){

            let checkUSER = new Promise(function(resolve,reject){
                let sql = saferman.format(
                    'SELECT ID FROM USER WHERE username=?',
                    ['testman']);
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let ID = sqlResults[0].ID;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(ID).to.be.a('number');
                    expect(ID).to.be.equal(1);

                    resolve();
                }
            });

            let checkSHADOW = new Promise(function(resolve,reject){
                var sql = 'SELECT shadow FROM SHADOW WHERE ID=1';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let shadow = sqlResults[0].shadow;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(shadow).to.be.a('string');
                    expect(shadow).to.be.equal('123');

                    resolve();
                }
            });


            Promise.all([
                checkUSER,
                checkSHADOW
            ]).then(function(){
                done();
            });

        });

    });


    it('init user2,valid',function(done){

        sign.signUp('test','12',function(){

            let checkUSER = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM USER WHERE username="test"';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let ID = sqlResults[0].ID;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(ID).to.be.a('number');
                    expect(ID).to.be.equal(2);

                    resolve();
                }
            });

            let checkSHADOW = new Promise(function(resolve,reject){
                var sql = 'SELECT shadow FROM SHADOW WHERE ID=2';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let shadow = sqlResults[0].shadow;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(shadow).to.be.a('string');
                    expect(shadow).to.be.equal('12');

                    resolve();
                }
            });


            Promise.all([
                checkUSER,
                checkSHADOW
            ]).then(function(){
                done();
            });

        });

    });

    it('init user3,duplicate',function(done){

        sign.signUp('testman','3',function(){

            let checkUSER = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM USER WHERE username="testman"';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(1);

                    resolve();
                }
            });

            let checkSHADOW = new Promise(function(resolve,reject){
                var sql = 'SELECT shadow FROM SHADOW WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });


            Promise.all([
                checkUSER,
                checkSHADOW
            ]).then(function(){
                done();
            })

        });

    });

    it('init user4,invalid username',function(done){

        sign.signUp('test<>"','3',function(){

            let checkUSER = new Promise(function(resolve,reject){
                var sql = saferman.format(
                    'SELECT ID FROM USER WHERE username=?',
                    ['test<>"']);
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkSHADOW = new Promise(function(resolve,reject){
                var sql = 'SELECT shadow FROM SHADOW WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });


            Promise.all([
                checkUSER,
                checkSHADOW
            ]).then(function(){
                done();
            })

        });

    });

    it('init user4,invalid password',function(done){

        sign.signUp('password','<>3',function(){

            let checkUSER = new Promise(function(resolve,reject){
                var sql = saferman.format(
                    'SELECT ID FROM USER WHERE username=?',
                    ['password']);
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkSHADOW = new Promise(function(resolve,reject){
                var sql = 'SELECT shadow FROM SHADOW WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            Promise.all([
                checkUSER,
                checkSHADOW
            ]).then(function(){
                done();
            })

        });

    });


});
