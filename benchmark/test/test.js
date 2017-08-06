'use strict';
const common = require('../common.js');
const assert = require('assert');
const bench = common.createBenchmark(main, {
    n: [1e3],
    len: [1e2],
    method: ['strict', 'nonstrict']
});

function main(conf) {
    const n = +conf.n;
    const len = +conf.len;
    var i;

    const data = Buffer.allocUnsafe(len);
    const actual = Buffer.alloc(len);
    const expected = Buffer.alloc(len);
    data.copy(actual);
    data.copy(expected);

    switch (conf.method) {
        case 'strict':
            bench.start();
            for (i = 0; i < n; ++i) {
                // eslint-disable-next-line no-restricted-properties
                test();
            }
            bench.end(n);
            break;
        case 'nonstrict':
            bench.start();
            for (i = 0; i < n; ++i) {
                assert.deepStrictEqual(actual, expected);
            }
            bench.end(n);
            break;
        default:
            throw new Error('Unsupported method');
    }


    function test(){
        var a=0;
        for(let i=0;i<10000;i++){
            a+i;
        }
        return a;
    }
}
