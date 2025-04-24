// const mongoose = require('mongoose');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const SendResponse = require('../utils/sendResponse');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  const response = new SendResponse(res, 200, {
    results: users.length,
    data: { users },
  });
  response.send();
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.usrId;
  const user = await User.findById(id).populate({
    path: 'sets',
    select: 'name -user',
  });

  // Return error if no user is found
  if (!user) return next(new AppError('No user found with that Id', 400));

  const response = new SendResponse(res, 200, {
    data: { user },
  });
  response.send();
});

exports.createUser = catchAsync(async (req, res, next) => {
  // Check if a user already exists
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    return next(
      new AppError('A user already exists with that email address', 400)
    );

  // If not, create new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  // Omit password from response
  newUser.password = undefined;

  const response = new SendResponse(res, 201, {
    message: 'User successfully created!',
    data: { user: newUser },
  });
  response.send();
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /api/v1/updatePassword',
        400
      )
    );

  // Update user document
  const sanitizedBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    sanitizedBody,
    {
      new: true,
      runValidators: true,
    }
  );

  const response = new SendResponse(res, 200, {
    message: 'User successfully updated!',
    data: { user: updatedUser },
  });
  response.send();
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // Find user by Id and set active property to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  const response = new SendResponse(res, 204);
  response.send();
});
