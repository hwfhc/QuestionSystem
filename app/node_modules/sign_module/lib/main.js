module.exports = start;

function start(config){
    var app = config.app;

    app.get('/signPage', function(req, res){
        res.sendFile(config.directory + '/signPage/SignIn.html');
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

    return (new API());
};

function signIn(){

}

function signUp(){

}
function logOut(){

}

function API(){
    this.a = '23';
}

API.prototype.hehe = function(){
    console.log('asdf');
}
