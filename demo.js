const cluster = require('cluster');
const fs = require('fs');

cluster.setupMaster({
    exec: 'main.js',
});

cluster.fork();
cluster.fork();
cluster.fork();
cluster.fork();

const logger = initLogger();
const logger2 = initLogger2();

function initLogger(){
    let output = fs.createWriteStream('./stdout.log',{flags:'a'});

    let logger = new console.Console(output);

    return logger;
}

function initLogger2(){
    let errorOutput = fs.createWriteStream('./stderr.log',{flags:'a'});

    let logger = new console.Console(errorOutput);

    return logger;
}

for(let id in cluster.workers){
    cluster.workers[id].on('message',function(message){
        logger.log(message.log);
    });
}

cluster.on('exit',function(worker,code,signal){
    logger2.log(`WORKER ${worker.process.pid} died FOR ${signal || code} IN ${new Date()};`);

    cluster.fork();

});

