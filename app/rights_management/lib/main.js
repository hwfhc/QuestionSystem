module.exports = start;

function start(config){
    var app = config.app;

    config.connection.query('SELECT * FROM RightsTable',function (error, results, fields){
        if (error) throw error;
        console.log(results[0].Rights.split('|'));
    });

    return (new test());
};

function test(){
    this.a = '23';
}

test.prototype.hehe = function(){
    console.log('asdf');
}
