//test environment init
const expect = require('chai').expect;
const directory = '../../';

//module load area
const sign = require(directory + './sign');
const saferman = require('saferman')('879574764');

describe('getIdByUsernameAndPassword',function(){

    before(function(done){
        var deleteUSER = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM USER',function(){
                saferman.sql('TRUNCATE USER',function(){
                    resolve();
                });
            });
        });

        var deleteSHADOW = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM SHADOW',function(){
                saferman.sql('TRUNCATE SHADOW',function(){
                    resolve();
                });
            });
        });


        Promise.all([
            deleteUSER,
            deleteSHADOW
        ]).then(()=>{
            var insertSHADOW1 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO SHADOW (ID,shadow) VALUE (1,"123")',function(){
                    resolve();
                });
            });

            var insertUSER1 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO USER (ID,username) VALUE (1,"abc")',function(){
                    resolve();
                });
            });

            var insertSHADOW2 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO SHADOW (ID,shadow) VALUE (2,"abc")',function(){
                    resolve();
                });
            });

            var insertUSER2 = new Promise(function(resolve,reject){
                saferman.sql('INSERT INTO USER (ID,username) VALUE (2,"123")',function(){
                    resolve();
                });
            });


            Promise.all([
                insertUSER1,
                insertSHADOW1,
                insertUSER2,
                insertSHADOW2
            ]).then(function(){
                done();
            });
        });
    });

    it('user1,correct password and username',function(done){
        sign.getIdByUsernameAndPassword('abc',"123",function(result){
            expect(result).to.be.a('number');
            expect(result).to.be.equal(1);

            done();
        });
    });

    it('user1,incorrect password and username',function(done){
        sign.getIdByUsernameAndPassword('abc',"0",function(result){
            expect(result).to.be.equal(null);

            done();
        });
    });

    it('user2,correct password and username',function(done){
        sign.getIdByUsernameAndPassword('123',"abc",function(result){
            expect(result).to.be.a('number');
            expect(result).to.be.equal(2);

            done();
        });
    });

});
