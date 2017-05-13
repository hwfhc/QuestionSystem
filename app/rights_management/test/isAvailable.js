//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

var test;//the value use to be test

//module load area
config.modules['rights_management'] = (require(directory + './rights_management'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

//test_1

config.modules['rights_management'].isAvailable(0,'publish',function(value){
    test = value;

    //test_1 area
    expect(test).to.be.a('boolean');
    expect(test).to.be.equal(true);
});

//test_2

config.modules['rights_management'].isAvailable(0,'answer',function(value){
    test = value;

    //test_2 area
    expect(test).to.be.a('boolean');
    expect(test).to.be.equal(false);
});

//test_3

config.modules['rights_management'].isAvailable(0,'view',function(value){
    test = value;

    //test_3 area
    expect(test).to.be.a('boolean');
    expect(test).to.be.equal(true);
});
