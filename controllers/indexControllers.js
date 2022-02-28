const product = require('../models/productSchema');

// home page => GET
const getHomePage = (req, res, next) => {
   res.render('pages/home', {
      head: 'home page',
   });
};

// Card Page
const getCardPage = async (req, res, next) => {
   try {
      const allProductData = await product.find();

      res.render('pages/card', {
         head: 'card page',
         data: allProductData,
      });
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   getHomePage,
   getCardPage,
};
