const product = require('../models/productSchema');
const jwt = require('jsonwebtoken');

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

module.exports = {
   uploadProductPage,
   uploadProduct,
   editProducts,
   deleteDbProduct,
};
