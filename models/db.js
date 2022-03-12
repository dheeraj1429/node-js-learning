const mongoose = require('mongoose');
const cart = require('../cart');

const databaseCon = function (callBack) {
    mongoose
        .connect(cart.MongoDbUrl)
        .then((result) => {
            console.log('database connected..');
            callBack();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = databaseCon;
