module.exports = init;

const user = require('../bin/user');
const item = require('../bin/item');
const trade = require('../bin/trade');

function init(app,directory){
    app.get('/trade/list/:itemID',function(req,res){
        let itemID = req.params['itemID'];

        if(!itemID){
            return;
        }

        trade.getTradeList(itemID,result => {
            res.send(JSON.stringify(result));
        });
    });

    app.get('/answer/:answerID/detail',function(req,res){
        let dataToSended = {};
        let userIDofAnswer;
        let answerID = req.params['answerID'];

        let questionID;

        if(!answerID){
            return;
        }
        trade.getAnswerDetail(answerID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.answer_content = result.answer;
            dataToSended.username = result.username;

            res.send(JSON.stringify(dataToSended));
        });

    });

    app.get('/trade/:itemID/publish', function(req, res){
        var itemID = getItemID();
        var userID = getUserID();

        if(itemID && userID){
            trade.orderItem(userID,itemID,function(){
                res.redirect('/signInSuccess');
            });
        }else{
            res.redirect('/');
        }


        function getItemID(){
            return req.params['itemID'];
        }

        function getUserID(){
            return req.session.ID;
        }

    });

    app.get('/answer/:id/author',function(req,res){
        res.sendFile('signInSuccess.html');
    });

    app.post('/answer/:id/setScore',function(req,res){
        let score = getScore();
        let answerID = getAnswerID();

        if(score && answerID){
            trade.setScoreByID(answerID,score,function(){
                res.redirect('/signInSuccess');
            });
        }else{
            res.redirect('/');
        }

        function getScore(){
            return req.body.score;
        }

        function getAnswerID(){
            return req.session.answerID;
        }


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

