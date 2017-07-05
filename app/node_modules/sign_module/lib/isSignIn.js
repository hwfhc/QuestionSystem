module.exports = isSignIn;

function isSignIn(req){
    if(req.session.ID != undefined){
        return true;
    }else{
        return false;
    }
}
