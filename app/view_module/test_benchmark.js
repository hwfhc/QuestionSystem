var express = require('express');

//init global config
var directory = '/home/firewaterge/Repositories/QuestionSystem';

var config = {
    app: express(),
    directory: directory,
    modules: []
};

initModule(config);

function initModule(config){

    config.modules['sign_module'] = (require('sign_module'))(config);
    config.modules['rights_management'] = (require('rights_management'))(config);
    config.modules['personalinformation_module'] = (require('personalinformation_module'))(config);
    config.modules['saferman'] = (require('saferman'))(config);
    config.modules['publish_module'] = (require('publish_module'))(config);
    config.modules['answer_module'] = (require('answer_module'))(config);
    config.modules['view_module'] = (require('view_module'))(config);
}



var benchmark = require('benchmark');

var bench = new benchmark('test',function(){
});

bench.start();
var a;
a++;
bench.end();

bench.on('complete',function(event){
    console.log(String(event.target));
});

bench.on('cycle',function(event){
    console.log('cycle');
});

bench.run();
