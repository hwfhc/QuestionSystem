module.exports = start;

function start(config){
    var app = config.app;

    app.get('/signPage', function(req, res){
        console.log('signPage');
        res.sendFile(config.directory + '/index.html');
    });

    return (new test());
};

function test(){
    this.a = '23';
}

test.prototype.hehe = function(){
    console.log('asdf');
}
