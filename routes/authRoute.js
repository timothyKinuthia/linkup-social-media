const express = require('express');

//imports
const authController = require('../controllers/auth')

const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh_token', authController.genAccessToken);




module.exports = router;