const express = require('express');
const router = express.Router();
const {
  getDashboardUser,
  updateSubscription,
} = require('../controllers/dashboardControllers');

router.route('/').get(getDashboardUser).patch(updateSubscription);

module.exports = router;
