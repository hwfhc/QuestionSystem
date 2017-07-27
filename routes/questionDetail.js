module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/questionDetail', function(req, res){
        req.session.questionID = req.query.ID;
        let questionID = getQuestionID();

        if(questionID){
            res.sendFile(directory + '/views/questionDetail.html');
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

        if(!questionID){
            res.redirect('/personalHomePage');
            return;
        }

        config.modules['view_module'].getQuestionDetail(questionID,function(result){
            dataToSended.title = result.title;
            dataToSended.description = result.description;
            dataToSended.total_score = result.total_score;

            authorID = result.authorID;

            config.modules['personalinformation_module'].getUsernameByID(authorID,function(result){
                dataToSended.author_name = result;

                config.modules['view_module'].getScoreByUserID(req.session.ID,function(score){
                    dataToSended.score = score;

                    res.send(JSON.stringify(dataToSended));
                });
            });
        })

        function getQuestionID(){
            return req.session.questionID;
        }
    });

}

