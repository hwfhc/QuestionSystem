//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['rights_management'] = (require(directory + './rights_management'))(config);
config.modules['personalinformation_module'] = (require(directory + './personalinformation_module'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('initUser',function(){

    before(function(done){
        let deletePersonalInformation = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM PersonalInformation',function(){
                resolve();
            });
        });

        let deleteShadowTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM ShadowTable',function(){
                resolve();
            });
        });

        let deleteRightsTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM RightsTable',function(){
                resolve();
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

    it('init user1,leagal',function(done){

        config.modules['personalinformation_module'].initUser('testman',123,function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM PersonalInformation WHERE Name="testman"';
                config.modules['saferman'].sql(sql,handleSQLResults);


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
                config.modules['saferman'].sql(sql,handleSQLResults);


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
                config.modules['saferman'].sql(sql,handleSQLResults);


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


    /*it('init user2,illeagal',function(done){

        config.modules['personalinformation_module'].initUser('testman',123,function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM PersonalInformation WHERE Name="testman"';
                config.modules['saferman'].sql(sql,handleSQLResults);


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
                config.modules['saferman'].sql(sql,handleSQLResults);


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
                config.modules['saferman'].sql(sql,handleSQLResults);


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

    });*/

    it('init user2,duplicate',function(done){

        config.modules['personalinformation_module'].initUser('testman',3,function(){

            let checkPersonalInformation = new Promise(function(resolve,reject){
                var sql = 'SELECT ID FROM PersonalInformation WHERE Name="testman"';
                config.modules['saferman'].sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(1);

                    resolve();
                }
            });

            let checkShadowTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Shadow FROM ShadowTable WHERE ID=2';
                config.modules['saferman'].sql(sql,handleSQLResults);


                function handleSQLResults(sqlResults){
                    expect(sqlResults.length).to.be.equal(0);

                    resolve();
                }
            });

            let checkRightsTable = new Promise(function(resolve,reject){
                var sql = 'SELECT Rights FROM RightsTable WHERE ID=2';
                config.modules['saferman'].sql(sql,handleSQLResults);


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

})
