const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controllers/authControllers');

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/logout').get(logout);

module.exports = router;
