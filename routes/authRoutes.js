const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authControllers');

router.route('/login').post(login);
router.route('/signup').post(signup);

module.exports = router;
