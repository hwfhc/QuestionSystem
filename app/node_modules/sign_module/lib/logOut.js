module.exports = logOut;

function logOut(req){
    req.session.ID = undefined;
}
