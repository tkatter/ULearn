const Note = require('../models/noteModel');

exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().populate({
      path: 'set',
      select: 'name',
    });

    res.status(200).json({
      status: 'success',
      data: {
        notes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getNote = async (req, res, next) => {
  try {
    const id = req.params.noteId;
    const note = await Note.find({ _id: id }).populate({
      path: 'set',
      select: 'name',
    });

    res.status(200).json({
      status: 'success',
      data: {
        note,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createNote = async (req, res, next) => {
  try {
    const newNote = await Note.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        note: newNote,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
