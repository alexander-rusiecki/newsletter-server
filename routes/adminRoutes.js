const express = require('express');
const router = express.Router();
const { login, getUsers } = require('../controllers/adminController');

router.route('/login').post(login);
router.route('/').get(getUsers);

module.exports = router;
