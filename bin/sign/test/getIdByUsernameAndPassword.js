//test environment init
const expect = require('chai').expect;
const directory = '../../';

//module load area
const sign_module = require(directory + './sign_module');
const saferman = require('saferman')('879574764');

describe('getIdByUsernameAndPassword',function(){

    before(function(done){
        var deletePersonalInformation = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM PersonalInformation',function(){
                saferman.sql('TRUNCATE PersonalInformation',function(){
                    resolve();
                });
            });
        });

        var deleteShadowTable = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM ShadowTable',function(){
                saferman.sql('TRUNCATE ShadowTable',function(){
                    resolve();
                });
            });
        });


        Promise.all([
            deletePersonalInformation,
            deleteShadowTable
        ]).then(()=>{
            var insertShadowTable1 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO ShadowTable (ID,Shadow) VALUE (1,"123")',function(){
                    resolve();
                });
            });

            var insertPersonalInformation1 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO PersonalInformation (ID,Name) VALUE (1,"abc")',function(){
                    resolve();
                });
            });

            var insertShadowTable2 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO ShadowTable (ID,Shadow) VALUE (2,"abc")',function(){
                    resolve();
                });
            });

            var insertPersonalInformation2 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO PersonalInformation (ID,Name) VALUE (2,"123")',function(){
                    resolve();
                });
            });


            Promise.all([
                insertPersonalInformation1,
                insertShadowTable1,
                insertPersonalInformation2,
                insertShadowTable2
            ]).then(function(){
                done();
            });
        });
    });

    it('user1,correct password and username',function(done){
        sign_module.getIdByUsernameAndPassword('abc',"123",function(result){
            expect(result).to.be.a('number');
            expect(result).to.be.equal(1);

            done();
        });
    });

    it('user1,incorrect password and username',function(done){
        sign_module.getIdByUsernameAndPassword('abc',"0",function(result){
            expect(result).to.be.equal(null);

            done();
        });
    });

    it('user2,correct password and username',function(done){
        sign_module.getIdByUsernameAndPassword('123',"abc",function(result){
            expect(result).to.be.a('number');
            expect(result).to.be.equal(2);

            done();
        });
    });

});
