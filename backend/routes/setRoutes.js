const express = require('express');
const setController = require('../controllers/setController');
const noteRouter = require('./noteRoutes');
const authController = require('../controllers/authController');

const router = express.Router();

router.use('/:setId/notes', noteRouter);

router
  .route('/')
  .get(setController.getAllSets)
  .post(authController.protect, setController.createSet);
router.route('/:setId').get(setController.getSet);

// Optional usrId parameter
// router.route('/:setId/:usrId?').get(setController.getSet);

// Not optional usrId parameter
// router.route('/:setId/:usrId').get(setController.getSet);

module.exports = router;
