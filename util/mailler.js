const nodemailer = require('nodemailer');
const UserCart = require('../cart');

const userMellterFunction = function () {
   const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: UserCart.UserEmail,
         pass: UserCart.Password,
      },
   });

   return transporter;
};

const mailOptionsFunction = function (user, email, data, html) {
   const mailOptions = {
      from: user,
      to: email,
      subject: 'testing and learning',
      html,
   };

   return mailOptions;
};

module.exports = {
   userMellterFunction,
   mailOptionsFunction,
};
