module.exports = Add;

function Add(ID,right){
    var config = this.config;

    //check rights string
    if(right != 'publish'
        && right != 'answer'
        && right != 'view'
        && right != 'view_personal_infromation'
    ){
        return;
    }

    //get rights string
    var sql_string = 'SELECT Rights FROM RightsTable WHERE ID=' + ID;

    config.modules['saferman'].sql(sql_string,function(results){

        var match = new RegExp(right);
        var value = (match.exec(results[0].Rights)!=null);

        if(value){
            //user has this right
        }else{
            //user not has this right
            //update rights string
            sql_string = "UPDATE RightsTable SET Rights='" + results[0].Rights + "|" + right + "' WHERE ID=" + ID;
            config.modules['saferman'].sql(sql_string);
        }

    });
}

