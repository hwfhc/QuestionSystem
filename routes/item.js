module.exports = init;

const user = require('../bin/user');
const item = require('../bin/item');
const trade = require('../bin/trade');

function init(app,directory){
    app.get('/item/list',function(req,res){
        item.getItemList(function(results){
            res.send(JSON.stringify(results));
        })
    });

    app.get('/item/my/list',function(req,res){
        var userID = getUserID(req);

        item.getItemListByUserID(userID,function(results){
            res.send(JSON.stringify(results));
        })
    });

    app.get('/item/:itemID/detail',function(req,res){
        let dataToSended = {};

        let itemID = req.params['itemID'];
        let authorID;
        let userID = getUserID(req);

        item.getItemDetail(userID,itemID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.author_name = result.username;

            res.send(JSON.stringify(dataToSended));
        });
    });

    app.get('/question/:id/title',function(req,res){

    });

    app.get('/question/:id/author',function(req,res){

    });

    app.post('/item/publish',function(req,res){
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
