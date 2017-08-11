//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['saferman'] = (require(directory + './saferman'))(config);

/////I have not complete this unit test
describe('SQL',function(){
   it('insert',function(done){
        config.modules['saferman'].sql(,function(){
            var sql_string = 'SELECT Rights FROM RightsTable WHERE ID=0';

            config.modules['saferman'].sql(sql_string,function(results){
                var match = new RegExp('answer');
                var value = (match.exec(results[0].Rights)!=null);

                expect(value).to.be.a('boolean');
                expect(value).to.be.equal(true);

                done();
            });
        });

    });
});
