const express = require('express');

const authController = require('../controllers/authController');
const noteController = require('../controllers/noteController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, noteController.getAllNotes)
  .post(noteController.createNote);

router.route('/:noteId').get(noteController.getNote);

module.exports = router;
