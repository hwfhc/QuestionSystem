module.exports = init;

const view_module = require('../bin/view_module');
const personalinformation_module = require('../bin/personalinformation_module');

function init(app,directory){
    app.get('/questionDetail', function(req, res){
        req.session.questionID = req.query.ID;
        let questionID = getQuestionID();

        if(questionID){
            res.sendFile('questionDetail.html');
        }else{
            res.redirect('/personalHomePage');
        }


        function getQuestionID(){
            return req.session.questionID;
        }
    });

    app.get('/questionDetail/getQuestionDetail', function(req, res){
        let dataToSended = {};

        let questionID = getQuestionID();
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


        function getUserID(){
            return req.session.ID;
        }

        function getQuestionID(){
            return req.session.questionID;
        }
    });

}

