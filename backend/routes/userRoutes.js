const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.restrictTo('admin'), userController.getAllUsers)
  .post(authController.restrictTo('admin'), userController.createUser);

router
  .route('/:usrId')
  .get(authController.restrictTo('admin'), userController.getUser);

router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;
