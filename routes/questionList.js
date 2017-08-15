module.exports = init;

const view_module = require('../bin/view_module');

function init(app,directory){
    app.get('/questionList',function(req,res){
        res.sendFile('questionList.html');
    });

    app.get('/questionList/getQuestionList', function(req, res){
        view_module.getQuestionList(function(results){
            res.send(JSON.stringify(results));
        })
    });

}

