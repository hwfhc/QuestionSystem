module.exports = initRightsOfUser;

function initRightsOfUser(ID,callback){

    let executeCallback = () => {
        if(callback!=undefined)
            callback();
    }


    let sql = "INSERT INTO RightsTable (ID,Rights) VALUE (" + ID + ",'|publish|view')";
    this.config.modules['saferman'].sql(sql,executeCallback);
}

