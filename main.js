var server = require('./app/server');
console.log(`Worker ${process.pid} start`);
process.title = 'node_worker';

process.on('message',function(message){
    console.log('child get message:',message);
});

process.send({foo:'bar'});
