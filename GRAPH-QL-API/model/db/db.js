const mongoose = require("mongoose");

const databaseConnection = function (callback) {
    mongoose
        .connect(process.env.URL)
        .then((res) => {
            callback();
            console.log("database connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = databaseConnection;
