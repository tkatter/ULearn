const express = require('express');

// const authController = require('../controllers/authController');
const noteController = require('../controllers/noteController');

const router = express.Router({ mergeParams: true });

// use GET /sets/53289hf90vey7h4f8b3/notes to get notes for set 53289hf90vey7h4f8b3
// use POST /sets/53289hf90vey7h4f8b3/notes to create notes on set 53289hf90vey7h4f8b3

router
  .route('/')
  .get(noteController.getAllNotes)
  .post(noteController.createNote);

router.route('/:noteId').get(noteController.getNote);
module.exports = router;
