//test environment init
var expect = require('chai').expect;
var directory = '../../';

var config = {
    modules: []
};

//module load area
config.modules['rights_management'] = (require(directory + './rights_management'))(config);
config.modules['saferman'] = (require(directory + './saferman'))(config);

describe('initRightsOfUser',function(){

    before(function(done){
        config.modules['saferman'].sql('DELETE FROM RightsTable',function(){
            done();
        });
    });

    //test_1
    it('init user 1',function(done){
        config.modules['rights_management'].initRightsOfUser(1,function(){
            var sql_string = 'SELECT Rights FROM RightsTable WHERE ID=1';

            config.modules['saferman'].sql(sql_string,function(results){
                var match = new RegExp('|publish|view');
                var matchResult = (match.exec(results[0].Rights)!=null);

                expect(matchResult).to.be.a('boolean');
                expect(matchResult).to.be.equal(true);

                match = new RegExp('answer');
                matchResult = (match.exec(results[0].Rights)!=null);

                expect(matchResult).to.be.a('boolean');
                expect(matchResult).to.be.equal(false);

                done();
            });
        });

    });

    it('init user 2',function(done){
        config.modules['rights_management'].initRightsOfUser(2,function(){
            var sql_string = 'SELECT Rights FROM RightsTable WHERE ID=2';

            config.modules['saferman'].sql(sql_string,function(results){
                var match = new RegExp('|publish|view');
                var matchResult = (match.exec(results[0].Rights)!=null);

                expect(matchResult).to.be.a('boolean');
                expect(matchResult).to.be.equal(true);

                match = new RegExp('answer');
                matchResult = (match.exec(results[0].Rights)!=null);

                expect(matchResult).to.be.a('boolean');
                expect(matchResult).to.be.equal(false);

                done();
            });
        });

    });
})
