//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['sign_module'] = (require(directory + './sign_module'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('getIdByUsernameAndPassword',function(){

    before(function(done){
        var deletePersonalInformation = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM PersonalInformation',function(){
                resolve();
            });
        });

        var deleteShadowTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM ShadowTable',function(){
                resolve();
            });
        });

        var insertShadowTable1 = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO ShadowTable (ID,Shadow) VALUE (1,"123")',function(){
                resolve();
            });
        });

        var insertPersonalInformation1 = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO PersonalInformation (ID,Name) VALUE (1,"abc")',function(){
                resolve();
            });
        });

        var insertShadowTable2 = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO ShadowTable (ID,Shadow) VALUE (2,"abc")',function(){
                resolve();
            });
        });

        var insertPersonalInformation2 = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO PersonalInformation (ID,Name) VALUE (2,"123")',function(){
                resolve();
            });
        });



        Promise.all([
            deletePersonalInformation,
            deleteShadowTable
        ]).then(()=>{
            Promise.all([
                insertPersonalInformation1,
                insertShadowTable1,
                insertPersonalInformation2,
                insertShadowTable2
            ]).then(()=>{
                done();
            });
        });
    });

    it('user1,correct password and username',function(done){
        config.modules['sign_module'].getIdByUsernameAndPassword('abc',"123",function(result){
            expect(result).to.be.a('number');
            expect(result).to.be.equal(1);

            done();
        });
    });

    it('user1,incorrect password and username',function(done){
        config.modules['sign_module'].getIdByUsernameAndPassword('abc',"0",function(result){
            expect(result).to.be.equal(null);

            done();
        });
    });

    it('user2,correct password and username',function(done){
        config.modules['sign_module'].getIdByUsernameAndPassword('123',"abc",function(result){
            expect(result).to.be.a('number');
            expect(result).to.be.equal(2);

            done();
        });
    });

});
