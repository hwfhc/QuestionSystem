module.exports = Add;

function Add(ID,right,callback){

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
        let addRightForUser = () => {
            let sql = "UPDATE RightsTable SET Rights='" + sqlResults[0].Rights + "|" + right + "' WHERE ID=" + ID ;
            this.config.modules['saferman'].sql(sql,executeCallback);
        }



        let RegExpToMatch = new RegExp(right);
        let isUserHaveRight = (RegExpToMatch.exec(sqlResults[0].Rights)!=null);

        if(isUserHaveRight){
            executeCallback(false);
        }else{
            addRightForUser();
        }

    }



    if(isRightStringLegal(right) == false){
        executeCallback(false);
        return;
    }

    let sql = 'SELECT Rights FROM RightsTable WHERE ID=' + ID;
    this.config.modules['saferman'].sql(sql,handleResultsOfSQL);
}

