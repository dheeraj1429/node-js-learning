const expres = require('express');
const router = expres.Router();

const adminControllers = require('../controllers/adminControllers');

router.get('/product', adminControllers.uploadProductPage);
router.post('/uploadProduct', adminControllers.uploadProduct);
router.post('/edit-product', adminControllers.editProducts);
router.post('/delete-product', adminControllers.deleteDbProduct);
router.post('/send-email', adminControllers.sendEmail);

module.exports = router;
