const product = require('../models/productSchema');
const getSessionData = require('../util/getSessionData');

let userInfo;

// home page => GET
const getHomePage = async (req, res, next) => {
    try {
        const userSessionInfo = await getSessionData(req, res, next);

        console.log(req.session.cartItem);

        if (userSessionInfo) {
            return res.render('pages/home', {
                head: 'home-page',
                userInfo: userSessionInfo,
            });
        }

        res.render('pages/home', {
            head: 'home page',
            userInfo,
        });
    } catch (err) {
        console.log(err);
    }
};

// Card Page
const getCardPage = async (req, res, next) => {
    try {
        const allProductData = await product.find();
        const userSessionInfo = await getSessionData(req, res, next);

        if (userSessionInfo) {
            return res.render('pages/card', {
                head: 'home page',
                data: allProductData,
                userInfo: userSessionInfo,
            });
        }

        res.render('pages/card', {
            head: 'card page',
            data: allProductData,
            userInfo,
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
        const userSessionInfo = await getSessionData(req, res, next);

        if (!findDbProduct) {
            return res.send('not product found!!!');
        }

        if (userSessionInfo) {
            return res.render('pages/productEdit', {
                head: 'product-edit',
                data: [findDbProduct],
                userInfo: userSessionInfo,
            });
        }

        res.render('pages/productEdit', {
            head: 'product edit page',
            data: [findDbProduct],
            userInfo,
        });
    } catch (err) {
        console.log(err);
    }
};

// user login page
const userLoginPage = async (req, res, next) => {
    try {
        const userSessionInfo = await getSessionData(req, res, next);

        if (userSessionInfo) {
            return res.render('pages/home', {
                head: 'home page',
                userInfo: userSessionInfo,
            });
        }

        return res.render('pages/login', {
            head: 'login',
            userInfo,
        });
    } catch (err) {
        console.log(err);
    }
};

// log Out
const userLogOut = async function (req, res, next) {
    try {
        const userSessionInfo = await getSessionData(req, res, next);

        if (userSessionInfo) {
            req.session.destroy(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('pages/home', {
                        head: 'home-page',
                        userInfo,
                    });
                }
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
            userInfo,
        });
    } catch (err) {
        console.log(err);
    }
};

// newsletter page
const newsletterPage = async function (req, res, next) {
    try {
        const userSessionInfo = await getSessionData(req, res, next);

        if (userSessionInfo) {
            return res.render('pages/newsletter', {
                head: 'newsletter',
                userInfo: userSessionInfo,
            });
        }

        res.render('pages/newsletter', {
            head: 'newsletter',
            userInfo,
        });
    } catch (err) {
        console.log(err);
    }
};

// forget password
const forgetPassword = function (req, res, next) {
    res.render('pages/forgetpassword', {
        head: 'forget-password',
        userInfo,
    });
};

// rest forgetpassword
const restPassword = function (req, res, next) {
    res.render('pages/restpassword', {
        head: 'rest-password',
        userInfo,
        id: req.params.id,
    });
};

// single page
const singlePage = async function (req, res, next) {
    try {
        const { id } = req.params;
        const userSessionInfo = await getSessionData(req, res, next);
        const findProductFromDb = await product.findOne({ _id: id });

        if (userSessionInfo) {
            return res.render('pages/singleProduct', {
                head: 'single-product page',
                userInfo: userSessionInfo,
                data: findProductFromDb,
            });
        }

        res.render('pages/singleProduct', {
            head: 'single-product page',
            userInfo,
            data: findProductFromDb,
        });
    } catch (err) {
        console.log(err);
    }
};

// upload video page
const uploadVideoPage = async function (req, res, next) {
    try {
        const userSessionInfo = await getSessionData(req, res, next);
        if (userSessionInfo) {
            return res.render('pages/uploadVideo', {
                head: 'upload videos',
                userInfo: userSessionInfo,
            });
        }

        res.render('pages/uploadVideo', {
            head: 'upload videos',
            userInfo,
        });
    } catch (err) {
        console.log(err);
    }
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
    singlePage,
    uploadVideoPage,
};
