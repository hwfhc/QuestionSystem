var saferman = (require('../index.js'))();

function test(results){
    console.log(results[0]);
}

saferman.sql('SELECT * FROM RightsTable',test);
