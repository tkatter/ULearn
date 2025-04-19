// const mongoose = require('mongoose');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.usrId;
  const user = await User.findById(id);

  // Return error if no user is found
  if (!user) return next(new AppError('No user found with that Id', 400));

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

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

  sendResponse(res, 200, { user: updatedUser });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // Find user by Id and set active property to false
  await User.findByIdAndUpdate(req.user.id, { active: false });

  sendResponse(res, 204, null);
});
