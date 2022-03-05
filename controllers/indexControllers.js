const product = require('../models/productSchema');
const getCookie = require('../util/getCookie');

// home page => GET
const getHomePage = async (req, res, next) => {
   try {
      const userCookie = await getCookie(req, res, next);

      if (userCookie) {
         return res.render('pages/home', {
            head: 'home-page',
            userInfo: userCookie,
         });
      }

      res.render('pages/home', {
         head: 'home page',
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// Card Page
const getCardPage = async (req, res, next) => {
   try {
      const allProductData = await product.find();

      const userCookie = await getCookie(req, res, next);

      if (userCookie) {
         return res.render('pages/card', {
            head: 'home page',
            data: allProductData,
            userInfo: userCookie,
         });
      }

      res.render('pages/card', {
         head: 'card page',
         data: allProductData,
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// product edit page
const getProductEditPage = async (req, res, next) => {
   try {
      const { cardItem } = req.body;

      const findDbProduct = await product.findOne({ _id: cardItem });

      const userCookie = await getCookie(req, res, next);

      if (!findDbProduct) {
         return res.send('not product found!!!');
      }

      if (userCookie) {
         return res.render('pages/productEdit', {
            head: 'product-edit',
            data: [findDbProduct],
            userInfo: userCookie,
         });
      }

      res.render('pages/productEdit', {
         head: 'product edit page',
         data: [findDbProduct],
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// user login page
const userLoginPage = async (req, res, next) => {
   try {
      const userCookie = await getCookie(req, res, next);

      if (userCookie) {
         return res.render('pages/home', {
            head: 'home page',
            userInfo: userCookie,
         });
      }
      return res.render('pages/login', {
         head: 'login',
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// log Out
const userLogOut = async function (req, res, next) {
   try {
      const userCookie = await getCookie(req, res, next);

      if (userCookie) {
         res.clearCookie('userInfo');
         res.render('pages/home', {
            head: 'home-page',
            userInfo: undefined,
         });
      }
   } catch (err) {
      console.log(err);
   }
};

// user sign in page
const userSignPage = async function (req, res, next) {
   try {
      res.render('pages/signin', {
         head: 'sign-in',
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// newsletter page
const newsletterPage = async function (req, res, next) {
   try {
      const userCookie = await getCookie(req, res, next);

      if (userCookie) {
         return res.render('pages/newsletter', {
            head: 'newsletter',
            userInfo: userCookie,
         });
      }

      res.render('pages/newsletter', {
         head: 'newsletter',
         userInfo: undefined,
      });
   } catch (err) {
      console.log(err);
   }
};

// forget password
const forgetPassword = function (req, res, next) {
   let userInfo;

   res.render('pages/forgetpassword', {
      head: 'forget-password',
      userInfo,
   });
};

// rest forgetpassword
const restPassword = function (req, res, next) {
   res.render('pages/restpassword', {
      head: 'rest-password',
      userInfo: undefined,
      id: req.params.id,
   });
};

module.exports = {
   getHomePage,
   getCardPage,
   getProductEditPage,
   userLoginPage,
   userLogOut,
   userSignPage,
   newsletterPage,
   forgetPassword,
   restPassword,
};
