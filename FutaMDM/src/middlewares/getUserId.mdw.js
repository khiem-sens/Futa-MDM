module.exports = async (req, res, next) => {
    const authUser = req.session.authUser;
    if(authUser == undefined){
        req.userid = null;
    }else{
        req.userid = authUser.rows[0].email;
    }
    next();
}