const expect = require('chai').expect;
const directory = '../../';

const sign_module = require(directory + './sign_module');
const saferman = require('saferman')('879574764');

describe('signUp',function(){

    before(function(done){
        let deletePersonalInformation = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM PersonalInformation',function(){
                saferman.sql('TRUNCATE PersonalInformation',function(){
                    resolve();
                });
            });
        });

        let deleteShadowTable = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM ShadowTable',function(){
                saferman.sql('TRUNCATE ShadowTable',function(){
                    resolve();
                });
            });
        });

        let deleteRightsTable = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM RightsTable',function(){
                saferman.sql('TRUNCATE RightsTable',function(){
                    resolve();
                });
            });
        });



        Promise.all([
            deletePersonalInformation,
            deleteShadowTable,
            deleteRightsTable
        ]).then(function(){
            done();
        })
    });

    it('init user1,valid',function(done){

        sign_module.signUp('testman','123',function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                let sql = saferman.format(
                    'SELECT ID FROM PersonalInformation WHERE Name=?',
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

            let checkShadowTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Shadow FROM ShadowTable WHERE ID=1';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let Shadow = sqlResults[0].Shadow;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(Shadow).to.be.a('string');
                    expect(Shadow).to.be.equal('123');

                    resolve();
                }
            });

            let checkRightsTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Rights FROM RightsTable WHERE ID=1';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let Rights = sqlResults[0].Rights;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(Rights).to.be.a('string');
                    expect(Rights).to.be.equal('|publish|view');

                    resolve();
                }
            });


            Promise.all([
                checkPersonalInformation,
                checkShadowTable,
                checkRightsTable
            ]).then(function(){
                done();
            });

        });

    });


    it('init user2,valid',function(done){

        sign_module.signUp('test','12',function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM PersonalInformation WHERE Name="test"';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let ID = sqlResults[0].ID;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(ID).to.be.a('number');
                    expect(ID).to.be.equal(2);

                    resolve();
                }
            });

            let checkShadowTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Shadow FROM ShadowTable WHERE ID=2';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let Shadow = sqlResults[0].Shadow;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(Shadow).to.be.a('string');
                    expect(Shadow).to.be.equal('12');

                    resolve();
                }
            });

            let checkRightsTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Rights FROM RightsTable WHERE ID=2';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    let Rights = sqlResults[0].Rights;

                    expect(sqlResults.length).to.be.equal(1);
                    expect(Rights).to.be.a('string');
                    expect(Rights).to.be.equal('|publish|view');

                    resolve();
                }
            });


            Promise.all([
                checkPersonalInformation,
                checkShadowTable,
                checkRightsTable
            ]).then(function(){
                done();
            });

        });

    });

    it('init user3,duplicate',function(done){

        sign_module.signUp('testman','3',function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM PersonalInformation WHERE Name="testman"';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(1);

                    resolve();
                }
            });

            let checkShadowTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Shadow FROM ShadowTable WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkRightsTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Rights FROM RightsTable WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });


            Promise.all([
                checkPersonalInformation,
                checkShadowTable,
                checkRightsTable
            ]).then(function(){
                done();
            })

        });

    });

    it('init user4,invalid username',function(done){

        sign_module.signUp('test<>"','3',function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = saferman.format(
                    'SELECT ID FROM PersonalInformation WHERE Name=?',
                    ['test<>"']);
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkShadowTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Shadow FROM ShadowTable WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkRightsTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Rights FROM RightsTable WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });


            Promise.all([
                checkPersonalInformation,
                checkShadowTable,
                checkRightsTable
            ]).then(function(){
                done();
            })

        });

    });

    it('init user4,invalid password',function(done){

        sign_module.signUp('password','<>3',function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = saferman.format(
                    'SELECT ID FROM PersonalInformation WHERE Name=?',
                    ['password']);
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkShadowTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Shadow FROM ShadowTable WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkRightsTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Rights FROM RightsTable WHERE ID=3';
                saferman.sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });


            Promise.all([
                checkPersonalInformation,
                checkShadowTable,
                checkRightsTable
            ]).then(function(){
                done();
            })

        });

    });


});
