const Set = require('../models/setModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const SendResponse = require('../utils/sendResponse');

exports.getAllSets = catchAsync(async (req, res, next) => {
  const sets = await Set.find()
    .populate({
      path: 'user',
      select: 'name email',
    })
    .populate({
      path: 'notes',
    });

  let resOptions;
  if (sets.length === 0) {
    resOptions = {
      results: sets.length,
      message: 'There are currently no existing sets',
    };
  } else {
    resOptions = {
      results: sets.length,
      data: { sets },
    };
  }

  const response = new SendResponse(res, 200, resOptions);
  response.send();
});

exports.getSet = catchAsync(async (req, res, next) => {
  const id = req.params.setId;
  const set = await Set.findById(id)
    .populate({
      path: 'notes',
      select: 'term definition -set',
    })
    .populate({
      path: 'user',
      select: 'name email',
    });

  if (!set) {
    return next(new AppError('No document found with that ID', 404));
  }

  const response = new SendResponse(res, 200, { data: { set } });
  response.send();
});

exports.createSet = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.description)
    return next(new AppError('Please include the name and description', 400));

  const { name, description } = req.body;
  const user = req.user._id;

  const newSet = await Set.create({ name, description, user });

  if (!newSet)
    return next(new AppError('There was an error creating the set', 500));

  const response = new SendResponse(res, 201, {
    message: 'Set successfully created!',
    data: { set: newSet },
  });
  response.send();
});
