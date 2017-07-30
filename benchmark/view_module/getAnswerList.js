'use strict';

const config = require('../../app/initTestEnvironment.js')();
const common = require('../common');
const fs = require('fs');
const path = require('path');

const bench = common.createBenchmark(main, {
    n: [1e4],
});


function main(conf) {
    const n = conf.n >>> 0;

    bench.start();
    (function r(cntr) {
        if (cntr-- <= 0)
            return bench.end(n);
        config.modules['view_module'].getAnswerList(1,function(){
            r(cntr);
        })
    }(n));
}
