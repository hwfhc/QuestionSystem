var server = require('./app/server');

console.log(`Worker ${process.pid} start`);
process.title = 'node_worker';

