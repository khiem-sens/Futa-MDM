module.exports = async (req, res, next) => {
        req.userid = 'group4';
        req.username = 'Group 4';
        next();
}