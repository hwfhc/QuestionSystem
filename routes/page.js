module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
    app.get('/signPage',function(req,res){
        console.log('asdf');
        sign_module.logOut(req);
        res.sendFile('signPage.html');
    });


    app.get('/homePage',function(req,res){
        var id = getUserID(req);
        res.redirect(`/homePage/${id}`)
    });

    app.get('/homePage/:id',function(req,res){
        res.sendFile('homePage.html');
    });


    app.get('/publishPage',function(req,res){
        res.sendFile('publishPage.html');
    });

    app.get('/questionList',function(req,res){
        res.sendFile('questionList.html');
    });

    app.get('/questionDetail/:questionID', function(req, res){
        res.sendFile('questionDetail.html');
        /*req.session.questionID = req.params['id'];
        let questionID = getQuestionID(req);

        if(questionID){
            res.sendFile('questionDetail.html');
        }else{
            res.redirect('/personalHomePage');
        }*/
    });

    app.get('/answerPage/:questionID',function(req,res){
        res.sendFile('answerPage.html');
    });

    app.get('/answerDetail/:answerID', function(req, res){
        res.sendFile('answerDetail.html');
    });

    app.get('/answerList/:questionID',function(req,res){
        res.sendFile('answerList.html');
    });

    app.get('/signInSuccess',function(req,res){
        res.sendFile('signInSuccess.html');
    });

    app.get('/signInFail',function(req,res){
        res.sendFile('signInFail.html');
    });
}

function getUserID(req){
    return req.session.ID;
}

function getQuestionID(req){
    return req.session.questionID;
}

function getAnswerID(req){
    return req.query.ID;
}

