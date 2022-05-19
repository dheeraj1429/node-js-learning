const mongoose = require("mongoose");

const databaseConnectionFuntion = function (callback) {
    mongoose
        .connect("mongodb://localhost:27017/node-ecommerce")
        .then((res) => {
            console.log("database conencted");
            callback();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = databaseConnectionFuntion;
