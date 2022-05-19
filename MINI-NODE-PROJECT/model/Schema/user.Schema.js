const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const KEY = process.env.KEY;

const User = new mongoose.Schema({
    name: { type: String, required: [true, "please enter user name"] },
    email: { type: String, required: [true, "please enter user email"] },
    password: { type: String, required: [true, "please enter user password"] },
    tokens: [{ token: { type: String, required: [true, "please genrate the user token"] } }],
});

User.methods.genrateUserTokne = async function () {
    try {
        const token = await jwt.sign({ _id: this._id, name: this.name, email: this.email }, KEY);
        this.tokens = this.tokens.concat({ token });
        this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

User.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const hashing = await bcryptjs.hash(this.password, 11);
            this.password = hashing;
        }
        next();
    } catch (err) {
        console.log(err);
    }
});

const UserModel = mongoose.model("user", User);

module.exports = UserModel;
