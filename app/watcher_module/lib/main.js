const fs = require('fs');

module.exports = start;

function start(directory){

    return (new logger(directory));
};

function logger(directory){
    let stdout = new console.Console(fs.createWriteStream(directory+'/stdout.log',{flags:'a'}));
    let errout = new console.Console(fs.createWriteStream(directory+'/stderr.log',{flags:'a'}));

    this.console = function(message){
        stdout.log(message)
    }

    this.error = function(message){
        errout.log(message)
    }
}
