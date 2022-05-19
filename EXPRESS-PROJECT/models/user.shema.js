const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the user name"],
    },
    email: {
        type: String,
        required: [true, "please enter the user email address"],
    },
    password: {
        type: String,
        required: [true, "please enter the password"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = new mongoose.model("user", User);

module.exports = UserModel;
