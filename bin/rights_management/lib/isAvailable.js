module.exports = isAvailable;

function isAvailable(ID,right,callback){

    let executeCallback = (argumentOfCallback) => {
        if(callback!=undefined)
            callback(argumentOfCallback);
    }

    let isRightStringLegal = (right) => {
        if(right != 'publish'
            && right != 'answer'
            && right != 'view'
            && right != 'view_personal_infromation'
        ){
            return false;
        }else{
            return true;
        }
    }

    let handleResultsOfSQL = (sqlResults) => {
        let isMatchSucceed;

        if(results[0] != undefined){
            let RegExpToMatch = new RegExp(right);
            isMatchSucceed = (RegExpToMatch.exec(sqlResults[0].Rights)!=null);

            executeCallback(isMatchSucceed);
        }else{
            executeCallback(false);
        }
    }



    if(isRightStringLegal(right) == false){
        executeCallback(false);
        return;
    }

    let sql = 'SELECT Rights FROM RightsTable WHERE ID=' + ID;
    this.config.modules['saferman'].sql(sql,handleResultsOfSQL);


}
