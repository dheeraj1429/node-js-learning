const Usermodel = require("../model/Schema/user.Schema");

const loginFailPage = function (req, res, next) {
    console.log("noew");

    return res.render("pages/login-fail");
};

const loginSuccess = function (req, res, next) {
    return res.render("pages/loginSuccess");
};

const secretPage = function (req, res, next) {
    return res.render("pages/secret-page");
};

const logOut = function (req, res, next) {
    req.logOut();
    res.redirect("/");
};

const signInPage = function (req, res, next) {
    return res.render("pages/signIn-page");
};

const forgetPassword = function (req, res, next) {
    return res.render("pages/forget-password");
};

const signinUser = async function (req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (name && email && password) {
            const newUser = await Usermodel({
                name: name,
                email: email,
                password: password,
            });

            const userRef = await newUser.save();

            const tokne = await userRef.genrateUserTokne();

            console.log(tokne);

            console.log(userRef);
        } else {
            return res.status(400).json({ message: "something worng" });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    loginFailPage,
    loginSuccess,
    secretPage,
    logOut,
    signInPage,
    forgetPassword,
    signinUser,
};
