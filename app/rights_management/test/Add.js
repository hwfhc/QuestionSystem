//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['rights_management'] = (require(directory + './rights_management'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('Add',function(){

    //test_1
    it('test',function(done){
        done();
    });
})
