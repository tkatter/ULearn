const express = require('express');
const noteController = require('../controllers/noteController');

const router = express.Router();

router
  .route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createNote);

router.route('/:noteId').get(noteController.getNote);

module.exports = router;
