const Note = require('../models/noteModel');
const SendResponse = require('../utils/sendResponse');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllNotes = catchAsync(async (req, res, next) => {
  let filter = {};
  let resOptions;
  if (req.params.setId) filter = { set: req.params.setId };
  const notes = await Note.find(filter);

  if (notes.length === 0) {
    resOptions = {
      results: notes.length,
      message: 'There are currently no existing notes',
    };
  } else {
    resOptions = {
      results: notes.length,
      data: { notes },
    };
  }

  const response = new SendResponse(res, 200, resOptions);
  response.send();
});

exports.getNote = catchAsync(async (req, res, next) => {
  const id = req.params.noteId;
  const note = await Note.findById(id)
    .populate({
      path: 'set',
      select: 'name',
    })
    .populate({ path: 'user', select: 'email name _id' });

  // Send error if note doesn't exist
  if (!note) return next(new AppError('No note exists with that Id', 404));

  const response = new SendResponse(res, 200, { data: { note } });
  response.send();
});

exports.createNote = catchAsync(async (req, res, next) => {
  // Check if req.body contains required data
  if (!req.body.term || !req.body.definition)
    return next(new AppError('Please include the term and definition', 400));

  const { term, definition } = req.body;
  const set = req.params.setId;
  const user = req.user._id;

  const newNote = await Note.create({ term, definition, set, user });

  if (!newNote)
    return next(new AppError('There was an error creating the note'), 500);

  const response = new SendResponse(res, 201, {
    message: 'Note successfully created!',
    data: { note: newNote },
  });
  response.send();
});
