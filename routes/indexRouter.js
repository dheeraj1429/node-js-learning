const expres = require('express');
const router = expres.Router();

const indexControllers = require('../controllers/indexControllers');

router.get('/', indexControllers.getHomePage);
router.get('/card', indexControllers.getCardPage);

module.exports = router;
