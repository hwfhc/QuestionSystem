module.exports = start;

function start(config){
    var app = config.app;

    app.get('/signPage', function(req, res){
        res.sendFile(config.directory + '/signPage/index.html');
    });

    app.get('/signPage/signIn', function(req, res){
        res.sendFile(config.directory + '/index.html');
    });

    app.get('/signPage/signUP', function(req, res){
        res.sendFile(config.directory + '/index.html');
    });

    app.get('/signPage/logOut', function(req, res){
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
