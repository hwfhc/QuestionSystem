module.exports = init;

const publish_module = require('../bin/publish_module');
const view_module = require('../bin/view_module');
const personalinformation_module = require('../bin/personalinformation_module');
const question = require('../bin/question');

function init(app,directory){
    app.get('/question/list',function(req,res){
        question.getQuestionList(function(results){
            res.send(JSON.stringify(results));
        })
    });

    app.get('/question/:questionID/detail',function(req,res){
        let dataToSended = {};

        let questionID = req.params['questionID'];
        let authorID;
        let userID = getUserID(req);

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
