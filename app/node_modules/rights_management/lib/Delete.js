module.exports = Delete;

function Delete(ID,right,callback){
    let handleResultsOfSQL = (sqlResults) => {

        let DeleteRightForUser = () => {
            let RightsOfUserAfterDelete = sqlResults[0].Rights.replace('|' + right,'');
            sql = "UPDATE RightsTable SET Rights='" + RightsOfUserAfterDelete +  "' WHERE ID=" + ID;

            this.config.modules['saferman'].sql(sql,executeCallback);
        }



        if(sqlResults != null){
            DeleteRightForUser();
        }else{
            executeCallback(false);
        }

    }

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



    if(isRightStringLegal(right) == false){
        executeCallback(false);
        return;
    }

    let sql = 'SELECT Rights FROM RightsTable WHERE ID=' + ID;
    this.config.modules['saferman'].sql(sql,handleResultsOfSQL);

}
