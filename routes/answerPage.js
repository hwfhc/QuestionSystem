module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerPage',function(req,res){
        res.sendFile(directory + '/views/answerPage.html');
    });

    app.post('/answerPage/answerAskQuestion',function(req,res){
        var answer = req.body.answer;
        var questionID = req.session.questionID;
        var userID = req.session.ID;

        config.modules['answer_module'].answerAskQuestion(answer,questionID,userID,function(){
            res.sendFile(directory + '/views/signInSuccess.html');
        })
    });

}
