//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['rights_management'] = (require(directory + './rights_management'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('isAvailable',function(){

    //test_1
    it('sql publish',function(){
        config.modules['rights_management'].isAvailable(0,'publish',function(value){
            expect(value).to.be.a('boolean');
            expect(value).to.be.equal(true);

        });
    });


    //test_2
    it('sql answer',function(){
        config.modules['rights_management'].isAvailable(0,'answer',function(value){
            expect(value).to.be.a('boolean');
            expect(value).to.be.equal(false);
        });
    });


    //test_3
    it('sql view',function(){
        config.modules['rights_management'].isAvailable(0,'view',function(value){
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
