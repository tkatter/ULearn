const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/:usrId')
  .get(authController.protect, authController.isAuthenticated);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout/:usrId', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/verifyAccount',
  authController.protect,
  authController.verifyCode
);
module.exports = router;
