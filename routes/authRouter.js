const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');

router.post('/user-signin', authControllers.userSignIn);
router.post('/login', authControllers.userLogin);

module.exports = router;
