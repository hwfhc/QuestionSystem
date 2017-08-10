//test environment init
var expect = require('chai').expect;

var config = {
    modules: []
};

//module load area
config.modules['rights_management'] = (require('rights_management'))(config);
config.modules['saferman'] = (require('saferman'))(config);

describe('isAvailable',function(){

    before(function(done){
        var deleteRightsTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('DELETE FROM RightsTable',function(){
                resolve();
            });
        });

        var insertRightsTable = new Promise(function(resolve,reject){
            config.modules['saferman'].sql('INSERT INTO RightsTable (ID,Rights) VALUE (1,"|publish|view")',function(){
                resolve();
            });
        });

        Promise.all([
            deleteRightsTable,
            insertRightsTable]).then(function(){
                done();
            });

    });


    //test_1
    it('sql publish',function(){
        config.modules['rights_management'].isAvailable(1,'publish',function(value){
            expect(value).to.be.a('boolean');
            expect(value).to.be.equal(true);

        });
    });


    //test_2
    it('sql answer',function(){
        config.modules['rights_management'].isAvailable(1,'answer',function(value){
            expect(value).to.be.a('boolean');
            expect(value).to.be.equal(false);
        });
    });


    //test_3
    it('sql view',function(){
        config.modules['rights_management'].isAvailable(1,'view',function(value){
            expect(value).to.be.a('boolean');
            expect(value).to.be.equal(true);
        });
    });


    //test_4
    it('sql ew',function(){
        config.modules['rights_management'].isAvailable(0,'ew',function(value){
            expect(value).to.be.a('boolean');
            expect(value).to.be.equal(false);
        });
    });

});
