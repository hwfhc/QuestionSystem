const cluster = require('cluster');
const fs = require('fs');
const logger = require('./bin/watcher')('./logs');;

cluster.setupMaster({
    exec: './bin/server.js',
});

cluster.fork();
cluster.fork();

for(let id in cluster.workers){
    cluster.workers[id].on('message',function(message){
        logger.console(message.log);
    });
}

cluster.on('exit',function(worker,code,signal){
    logger.error(`WORKER ${worker.process.pid} died FOR ${signal || code} IN ${new Date()};`);

    cluster.fork();

});

