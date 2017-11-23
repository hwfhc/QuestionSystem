module.exports = init;

const user = require('../bin/user');
const item = require('../bin/item');
const order = require('../bin/order');

function init(app,directory){
    app.get('/question/list',function(req,res){
        item.getItemList(function(results){
            res.send(JSON.stringify(results));
        })
    });

    app.get('/question/:questionID/detail',function(req,res){
        let dataToSended = {};

        let questionID = req.params['questionID'];
        let authorID;
        let userID = getUserID(req);

        item.getItemDetail(userID,questionID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.total_score = result.total_score;
            dataToSended.author_name = result.Name;

            if(result.answer) dataToSended.answer = result.answer;
            else dataToSended.answer = 'You have not answer this question!';

            if(result.score) dataToSended.score = result.score;
            else dataToSended.score = 0;

            res.send(JSON.stringify(dataToSended));
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

        item.publishItem(title,description,5,req.session.ID,function (){
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
