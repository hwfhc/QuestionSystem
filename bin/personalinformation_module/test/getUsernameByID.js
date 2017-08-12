//test environment init
const expect = require('chai').expect;
const directory = '../../';

//module load area
const personalinformation_module = require(directory + './personalinformation_module');
const saferman = require('saferman')('879574764');

describe('getUsernameByID',function(){

    before(function(done){
        let deletePersonalInformation = new Promise(function(resolve,reject){
            saferman.sql('DELETE FROM PersonalInformation',function(){
                saferman.sql('TRUNCATE PersonalInformation',function(){
                    resolve();
                });
            });
        }).then(function(){
            let insertPersonalInformation1 = new Promise(function(resolve,reject){

                let sqlString = saferman.format(
                    'INSERT INTO PersonalInformation (ID,Name) VALUE (?,?)',
                    [1,'testman']);

                saferman.sql(sqlString,function(){
                    resolve();
                });
            });

            let insertPersonalInformation2 = new Promise(function(resolve,reject){

                let sqlString = saferman.format(
                    'INSERT INTO PersonalInformation (ID,Name) VALUE (?,?)',
                    [2,'test']);

                saferman.sql(sqlString,function(){
                    resolve();
                });
            });


            Promise.all([
                insertPersonalInformation1,
                insertPersonalInformation2
            ]).then(function(){
                done();
            });
        });
    });

    it('get user1',function(done){
        new Promise((resolve,reject)=>{
            personalinformation_module.getUsernameByID(1,function(result){
                expect(result).to.be.equal('testman');
                expect(result).to.be.a('string');

                done();
            });
        });
    });

    it('get user2',function(done){
        new Promise((resolve,reject)=>{
            personalinformation_module.getUsernameByID(2,function(result){
                expect(result).to.be.equal('test');
                expect(result).to.be.a('string');

                done();
            });
        });
    });

    it('get user3',function(done){
        new Promise((resolve,reject)=>{
            personalinformation_module.getUsernameByID(3,function(result){
                expect(result).to.be.equal(null);

                done();
            });
        });
    });

});
