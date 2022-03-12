const User = require('../models/userSchema');
const bcryptjs = require('bcryptjs');

// user sign in
const userSignIn = async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        const userPasswordMatch = await bcryptjs.compare(password, findUser.password);
        const token = await findUser.genrateUserToken();

        if (userPasswordMatch) {
            req.session.userInfo = token;
            res.redirect('/home/card');
        } else {
            console.log('auth error ! something worng !');
        }
    } catch (err) {
        console.log(err);
    }
};

// user login
const userLogin = async function (req, res, next) {
    try {
        const { name, email, password, comfirmPassword } = req.body;
        if (password === comfirmPassword) {
            const userInsert = await new User({
                name,
                email,
                password,
            });

            const userInsertRef = await userInsert.save();
            const tokne = await userInsert.genrateUserToken();

            if (userInsertRef) {
                req.session.userInfo = tokne;
                //  res.cookie('userInfo', tokne);
                res.redirect('/home/card');
            } else {
                console.log('auth error ! somthing worng !');
            }
        } else {
            console.log('please check the password');
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    userSignIn,
    userLogin,
};
