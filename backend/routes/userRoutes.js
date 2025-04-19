const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:usrId').get(userController.getUser);

router.patch('/updateMe', userController.updateMe);

module.exports = router;
