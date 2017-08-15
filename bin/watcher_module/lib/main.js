const fs = require('fs');
let stdout;
let errout;

let init = module.exports = function init(directory){
    stdout = new console.Console(fs.createWriteStream(directory+'/stdout.log',{flags:'a'}));
    errout = new console.Console(fs.createWriteStream(directory+'/stderr.log',{flags:'a'}));

    return init;
};

init.console = function(message){
    stdout.log(message)
}

init.error = function(message){
    errout.log(message)
}

