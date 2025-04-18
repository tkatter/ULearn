const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Oauth Routes
router.route('/').get(authController.oathResponse);
router.route('/request').post(authController.oathRequest);

module.exports = router;
