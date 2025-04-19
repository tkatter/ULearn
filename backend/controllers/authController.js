const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendResponse = require('../utils/sendResponse');

dotenv.config({ path: 'backend/config.env' });

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Protected routes auth middleware
exports.protect = catchAsync(async (req, res, next) => {
  // Get jwt token and check if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Return with error if token doesn't exist
  if (!token)
    return next(new AppError('You are not logged in, login for access', 401));

  // Token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user exists
  const currentUser = await User.findById(decoded.id).select('+role');
  if (!currentUser)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );

  // Check if user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password, login again', 401)
    );
  }

  // Grant access to protected route
  req.user = currentUser;
  next();
});

// Restricted routes auth middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Permission denied', 403));
    }
    next();
  };
};

exports.oathRequest = async (req, res, next) => {
  try {
    const redirectUrl = 'http://127.0.0.1:3000/api/v1/oauth';
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile openid email',
      prompt: 'consent',
    });

    res
      .header('Referrer-Policy', 'no-referrer-when-downgrade')
      .status(200)
      .json({
        status: 'success',
        data: {
          url: authorizeUrl,
        },
      });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.oathResponse = async (req, res, next) => {
  if (!req.query.code) return next();
  const code = req.query.code;
  try {
    const redirectUrl = 'http://127.0.0.1:3000/api/v1/oauth';
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const r = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(r.tokens);
    console.info('Tokens acquired');
    const user = oAuth2Client.credentials;

    /*
    // V1 - Uses getUserData function to get simple user data from googleapis
    const accessToken = user.access_token;
    await getUserData(accessToken);
    */

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: user.id_token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Create User object to send as document to DB
    const userDoc = {
      userId: payload.sub,
      name: payload.name,
      email: payload.email,
    };

    // Check if user already exists in DB, if not, create one
    const userExists = await User.findOne({ userId: payload.sub });
    if (!userExists) await User.create(userDoc);

    // Redirect to main application
    return res.redirect(303, 'http://localhost:5173/');
  } catch (err) {
    if (err.errorResponse.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: `A user with ${JSON.stringify(
          err.errorResponse.keyValue
        )} already exists.`,
      });
    }
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  // Create user in DB from sanitized req.body
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  // Create JWT
  const token = signToken(newUser._id);

  // Remove password from response
  newUser.password = undefined;
  sendResponse(res, 201, { token, user: newUser });
});

exports.login = catchAsync(async (req, res, next) => {
  // Get user email and password from req.body
  const { email, password } = req.body;

  // Check is email and password exist
  if (!email || !password)
    return next(new AppError('Please provide an email and password', 400));

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // If everything is valid, send jwt to client
  const token = signToken(user._id);

  sendResponse(res, 200, { token });
});
