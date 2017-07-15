var benchmark = require('benchmark');

var bench = new benchmark('test',function(){
    let a=0;
    a++;
});

bench.on('complete',function(event){
    console.log(String(event.target));
});

bench.run();
