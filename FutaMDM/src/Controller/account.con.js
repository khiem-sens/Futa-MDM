const User = require('../Model/Cassandra/user.cassandra');
const bcrypt = require('bcryptjs');

const SALT = 10;

class accountCon {

    getLogin(req, res) {
        res.render('accounts/login', {
            layout: false
        })
    }

    async checkAccount (req, res) {
        const result = {
            existEmail: true,
            correct_password: false
        }
        const user = await User.getUserByEmail(req.body.email);
        if (user.rows.length === 0) {
            result.existEmail = false;
        } else {
            const isCorrectPass = bcrypt.compareSync(req.body.password, user.rows[0].password);
            if (isCorrectPass === true) {
                result.correct_password = true;
            }
        }
        res.status(200).json(result);
    }

    async postLogin (req, res) {
        const user = await User.getUserByEmail(req.body.email);
        req.session.authUser = user;
        req.session.isAuth = true;
        res.status(200).json({});
    }

    getRegister(req, res) {
        res.render('accounts/register', {
            layout: false
        })
    }

    async isExistEmail(req, res) {
        const email = req.params.email;
        const data = await User.getUserByEmail(email);
        if (data.length === 0) {
            res.json({isExist: false})
        } else {
            res.json({
                isExist: true,
                user: data
            })
        }
    }

    async postRegister(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password, SALT);
        let user = await User.createUser(req.body);
        res.status(200).json({});
    }
        
}

module.exports = new accountCon();