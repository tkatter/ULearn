const express = require('express');
const setController = require('../controllers/setController');

const router = express.Router();

router.route('/').get(setController.getAllSets);

module.exports = router;
