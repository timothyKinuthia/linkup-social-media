
const express = require('express');

//imports
const { auth } = require('../middlewares/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/search', auth, userController.searchUser);

router.get('/user/:id', auth, userController.getUser);

router.patch('/user', auth, userController.updateUser);

router.patch('/user/:id/follow', auth, userController.follow);

router.patch('/user/:id/unfollow', auth, userController.unFollow);

router.get('/suggestions', auth, userController.suggestUsers);

module.exports = router;