module.exports = init;

function init(app,directory){
    app.get('/pleaseSignInFirst',function(req,res){
        res.sendFile('pleaseSignInFirst.html');
    });

    app.get('/signInSuccess',function(req,res){
        res.sendFile('signInSuccess.html');
    });

    app.get('/signInFail',function(req,res){
        res.sendFile('signInFail.html');
    });
}

