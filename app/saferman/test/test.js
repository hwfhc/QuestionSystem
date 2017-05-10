var saferman = (require('../index.js'))();

console.log(1);

function test(error,results,fields){
    if (error) throw error;

    console.log(results[0]);
}

saferman.sql('SELECT * FROM RightsTable',test);
