const cpus = require('os').cpus();
const http = require('http');
const cluster = require('cluster');

cluster.setupMaster({
    exec: 'main.js',
});

cluster.fork();
cluster.fork();
cluster.fork();
cluster.fork();

cluster.on('exit',whenExit)

function whenExit(worker,code,signal){
    console.log('worker %d died %s.restart...',
        worker.process.pid,signal || code);

    cluster.fork();

}
