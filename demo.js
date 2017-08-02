const cluster = require('cluster');
const fs = require('fs');

cluster.setupMaster({
    exec: 'main.js',
});

cluster.fork();
cluster.fork();
cluster.fork();
cluster.fork();

cluster.on('exit',function(worker,code,signal){
    console.log('worker %d died %s.restart...',
        worker.process.pid,signal || code);

    cluster.fork();

});

const logger = initLogger();

function initLogger(){
    let output = fs.createWriteStream('./stdout.log',{flags:'a'});
    let errorOutput = fs.createWriteStream('./stderr.log',{flags:'a'});

    let logger = new console.Console(output,errorOutput);

    return logger;
}

cluster.on('message',function(message){
    console.log('get message:',message);
//    logger.log(message);
});

