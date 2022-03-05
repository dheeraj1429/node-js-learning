const product = require('../models/productSchema');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const rootFolder = require('../util/rootFolder');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const UserCart = require('../cart');

const KEY = process.env.SCRET_KEY;

// Product upload page => GET
const uploadProductPage = async (req, res, next) => {
   try {
      const { userInfo } = req.cookies;

      if (userInfo) {
         const varifyToken = await jwt.verify(userInfo, KEY);

         return res.render('pages/productUpload', {
            head: 'product upload',
            userInfo: varifyToken,
         });
      }

      res.render('pages/productUpload', {
         head: 'product upload',
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// Create a product => POST
const uploadProduct = async function (req, res, nex) {
   try {
      const { title, description, image, price } = req.body;

      const newProduct = await product({
         name: title,
         discription: description,
         image: image,
         price: price,
      });

      const productRef = await newProduct.save();

      if (productRef) {
         return res.redirect('/home/card');
      }
   } catch (err) {
      console.log(err);
   }
};

// edit products
const editProducts = async function (req, res, next) {
   try {
      const { name, description, image, price, id } = req.body;

      const findUpdatedProduct = await product.updateOne(
         { $or: [{ name }, { _id: id }] },
         { $set: { name, description, image, price } }
      );

      if (findUpdatedProduct) {
         return res.redirect('/home/card');
      }
   } catch (err) {
      console.log(err);
   }
};

// delete product
const deleteDbProduct = async function (req, res, next) {
   try {
      const { cardItem } = req.body;

      const findBdProduct = await product.deleteOne({ _id: cardItem });

      if (!findBdProduct) return;

      if (findBdProduct) {
         return res.redirect('/home/card');
      }
   } catch (err) {
      console.log(err);
   }
};

// send email => POST
const sendEmail = async function (req, res, next) {
   try {
      const { email, number, message, name } = req.body;

      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: UserCart.UserEmail,
            pass: UserCart.Password,
         },
      });

      fs.readFile(
         path.join(rootFolder, 'views', 'pages', 'mail.ejs'),
         'utf-8',
         function (err, data) {
            if (err) {
               console.log(err);
            } else {
               const mailOptions = {
                  from: 'dheerajsingh1429@gmail.com',
                  to: email,
                  subject: 'testing and learning',
                  text: data,
                  html: ejs.render(data, {
                     name,
                     email,
                     message,
                     number,
                  }),
               };

               transporter.sendMail(mailOptions, function (err, result) {
                  if (err) {
                     console.log(err);
                  } else {
                     res.redirect('/home/card');
                     alert('mail send successful!!');
                  }
               });
            }
         }
      );
   } catch (err) {
      console.log(err);
   }
};

// forget password

module.exports = {
   uploadProductPage,
   uploadProduct,
   editProducts,
   deleteDbProduct,
   sendEmail,
};
