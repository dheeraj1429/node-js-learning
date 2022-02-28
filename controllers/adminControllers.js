const product = require('../models/productSchema');

// Product upload page => GET
const uploadProductPage = (req, res, next) => {
   res.render('pages/productUpload', {
      head: 'product upload',
   });
};

// get upload product request => POST
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
   } catch (err) {
      console.log(err);
   }
};

// Edit Products
const editProducts = async function (req, res, next) {
   try {
      const { cardItem } = req.body;

      const findProductsData = await product.find({ _id: cardItem });

      console.log(findProductsData);
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   uploadProductPage,
   uploadProduct,
   editProducts,
};
