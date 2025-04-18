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

exports.getSet = catchAsync(async (req, res, next) => {
  const id = req.params.setId;
  const set = await Set.findById(id).populate('notes');
  if (!set) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      set,
    },
  });
});

exports.createSet = catchAsync(async (req, res, next) => {
  const newSet = await Set.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      set: newSet,
    },
  });
});
