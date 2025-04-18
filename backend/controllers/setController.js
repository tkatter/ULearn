const Set = require('../models/setModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllSets = catchAsync(async (req, res, next) => {
  const sets = await Set.find();

  if (sets.length === 0) {
    return next(new AppError('There are no sets to display', 404));
  }
  res.status(200).json({
    status: 'success',
    results: sets.length,
    data: {
      sets,
    },
  });
});

exports.getSet = async (req, res, next) => {
  try {
    const id = req.params.setId;
    const set = await Set.find({ _id: id }).populate('notes');

    res.status(200).json({
      status: 'success',
      data: {
        set,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createSet = async (req, res, next) => {
  try {
    const newSet = await Set.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        set: newSet,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
