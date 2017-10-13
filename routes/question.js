module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
    app.get('/signPage',function(req,res){
        console.log('asdf');
        sign_module.logOut(req);
        res.sendFile('signPage.html');
    });

    app.get('/question/list',function(req,res){
        res.sendFile('questionList.html');
    });
    app.get('/question/:id/detail',function(req,res){
		
    });
    app.get('/question/:id/title',function(req,res){
		
    });
    app.get('/question/:author',function(req,res){
		
    });
    app.get('/question/public',function(req,res){
		
    });

	
	
function getUserID(req){
    return req.session.ID;
}

function getQuestionID(req){
    return req.session.questionID;
}

function getAnswerID(req){
    return req.query.ID;
}