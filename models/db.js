const mongoose = require('mongoose');

const databaseCon = function (callBack) {
   mongoose
      .connect('mongodb://localhost:27017/shop')
      .then((result) => {
         console.log('database connected..');
         callBack();
      })
      .catch((err) => {
         console.log(err);
      });
};

module.exports = databaseCon;
