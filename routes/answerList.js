module.exports = init;

function init(config){
    var app = config.app;
    var directory = config.directory;

    app.get('/answerList',function(req,res){
        res.sendFile(directory + '/views/answerList.html');
    });

    app.get('/answerList/getAnswerList',function(req,res){
        var answerList = {list : [
            {name:'黄旭东',link:'/answerDetail'},
            {name:'士兵76',link:'/answerDetail'},
            {name:'吕布',link:'/answerDetail'},
        ]}

        res.send(JSON.stringify(answerList));
    });

}

