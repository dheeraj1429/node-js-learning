const expres = require('express');
const router = expres.Router();

const adminControllers = require('../controllers/adminControllers');

router.get('/product', adminControllers.uploadProductPage);
router.post('/uploadProduct', adminControllers.uploadProduct);
router.post('/edit-product', adminControllers.editProducts);

module.exports = router;
