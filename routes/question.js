module.exports = init;

const sign_module = require('../bin/sign_module');

function init(app,directory){
    app.get('/question/list',function(req,res){
        view_module.getQuestionList(function(results){
            res.send(JSON.stringify(results));
        })
    });

    app.get('/question/:questionID/detail',function(req,res){
        let dataToSended = {};

        let questionID = req.param['questionID'];
        let authorID;
        let userID = getUserID();

        if(!questionID){
            res.redirect('/personalHomePage');
            return;
        }

        view_module.getQuestionDetail(questionID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.total_score = result.total_score;

            authorID = result.authorID;

            personalinformation_module.getUsernameByID(authorID,function(result){
                dataToSended.author_name = result;

                view_module.getScoreByUserID(userID,questionID,function(result){
                    dataToSended.score = result.score;
                    dataToSended.answer = result.answer;

                    if(userID==authorID){
                        dataToSended.isAuthor = true;
                    }else{
                        dataToSended.isAuthor = false;
                    }

                    res.send(JSON.stringify(dataToSended));
                });
            });
        });
    });

    app.get('/question/:id/title',function(req,res){

    });

    app.get('/question/:id/author',function(req,res){

    });

    app.post('/question/publish',function(req,res){
        var userID = getUserID(req);
        var title = req.body.title;
        var description = req.body.description;

        publish_module.publishAskQuestion(title,description,5,req.session.ID,function (){
            res.redirect('/signInSuccess');
        });
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
