const cpus = require('os').cpus();
const http = require('http');
const cluster = require('cluster');

if(cluster.isMaster){
    console.log(`Master ${process.pid} is running`);

    for(let i=0;i<cpus.length;i++){
        cluster.fork('./main.js');
    }

    cluster.on('exit',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} died`);
    });
}else{
     console.log(`Worker ${process.pid} start`);
}

console.log('complete');
