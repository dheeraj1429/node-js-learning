const UserModel = require("../models/user.shema");
const bcrypt = require("bcrypt");

// sign In
const signInUser = async function (req, res, next) {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (name && email && password === confirmPassword) {
            const newPassword = await bcrypt.hash(password, 10);

            const User = await UserModel({
                name,
                email,
                password: newPassword,
            });

            const userRef = await User.save();

            if (userRef) {
                return res.redirect("/auth/getAllusers");
            }
        }
    } catch (err) {
        console.log(err);
    }
};

// get all users
const getAllUsers = async function (req, res, next) {
    try {
        UserModel.find({}, { _id: 0, password: 0, __v: 0, createdAt: 0 })
            .then((result) => {
                res.status(200).json({
                    result,
                });
            })
            .then((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};

// delete user
const deleteUserFunction = async function (req, res, next) {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email && password === confirmPassword) return;

        const UserRef = await UserModel.findOne({
            email,
        });

        const varifyPassword = await bcrypt.compare(password, UserRef.password);

        if (varifyPassword) {
            const deleteRef = await UserModel.deleteOne({ email });

            if (deleteRef) {
                return res.redirect("/auth/getAllusers");
            }
        }
    } catch (err) {
        console.log(err);
    }
};

const screct = function (req, res, next) {
    const cookies = req.cookies;

    if (!cookies) {
        console.log("secret");
        return res.redirect("/signIn");
    }

    return res.send("your scret is here!!");
};

const goolgeLogin = function (req, res, next) {};

const googleCallBack = function (req, res, next) {};

const googleLogOut = function (req, res, next) {};

module.exports = {
    signInUser,
    getAllUsers,
    deleteUserFunction,
    goolgeLogin,
    googleCallBack,
    googleLogOut,
    screct,
};
