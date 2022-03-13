const expres = require('express');
const router = expres.Router();

const indexControllers = require('../controllers/indexControllers');

router.get('/', indexControllers.getHomePage);
router.get('/card', indexControllers.getCardPage);
router.post('/product-edit/:id', indexControllers.getProductEditPage);
router.get('/login', indexControllers.userLoginPage);
router.post('/log-out', indexControllers.userLogOut);
router.get('/signin', indexControllers.userSignPage);
router.get('/newsletter', indexControllers.newsletterPage);
router.get('/forget-password', indexControllers.forgetPassword);
router.get('/rest-password/:id', indexControllers.restPassword);
router.get('/single-product/:id', indexControllers.singlePage);
router.get('/uploadVideo', indexControllers.uploadVideoPage);
router.get('/allYtVideos', indexControllers.allYtVideos);

module.exports = router;
