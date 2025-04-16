const express = require('express');
const setController = require('../controllers/setController');

const router = express.Router();

router.route('/').get(setController.getAllSets).post(setController.createSet);
router.route('/:setId').get(setController.getSet);

// Optional usrId parameter
// router.route('/:setId/:usrId?').get(setController.getSet);

// Not optional usrId parameter
// router.route('/:setId/:usrId').get(setController.getSet);

module.exports = router;
