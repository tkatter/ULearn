const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { promisify } = require('util');
const crypto = require('crypto');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sendEmail } = require('../utils/email');
const SendResponse = require('../utils/sendResponse');
const generateVerificationCode = require('../utils/generateVerificationCode');
// const verificationEmailTemplate = require('../email/verifyTemplate');

dotenv.config({ path: 'backend/config.env' });

const signToken = (id, isVerified) => {
  return jwt.sign({ id, isVerified }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (res, statusCode, user, message) => {
  const token = signToken(user._id, user.isVerified);
  const cookieOptions = {
    // maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000,
    maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from response
  user.password = undefined;

  const response = new SendResponse(res, statusCode, {
    session: {
      token,
      issuedAt: new Date(Date.now()),
      expiresAt: new Date(
        Date.now() +
          Number([...process.env.JWT_EXPIRES_IN].at(0)) * 60 * 60 * 1000
      ),
    },
    message,
    data: { user },
  });
  response.send();
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
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // Return with error if token doesn't exist
  if (!token)
    return next(new AppError('You are not logged in, login for access', 401));

  // Token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user exists
  let currentUser = await User.findById(decoded.id).select('+role');
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

  // Grant access to protected route and populate isAuthenticated field
  const authenticatedUser = await User.findByIdAndUpdate(currentUser._id, {
    isAuthenticated: true,
  });

  req.user = authenticatedUser;
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

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const id = req.params.usrId;
  const authenticatedUser = await User.findById(id);

  // Return error if no user is found
  if (!authenticatedUser)
    return next(new AppError('No user found with that Id', 400));

  const response = new SendResponse(res, 200, {
    message: 'User is authenticated!',
    data: { authenticatedUser },
  });
  response.send();

  // createSendToken(res, 200, authenticatedUser, 'User is authenticated!');
});

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

  // Check if user already exists
  const doesExist = await User.findOne({ email });
  if (doesExist)
    return next(new AppError('A user already exists with that email', 400));

  // If doesn't exist, generate verification code and create user
  const verificationCode = generateVerificationCode();

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    verificationCode,
  });

  // Create and send JWT
  const resMessage = 'User successfully signed up';
  createSendToken(res, 200, newUser, resMessage);
});

exports.verifyCode = catchAsync(async (req, res, next) => {
  const { user } = req;
  // TODO: add expiration to code and sending of emails/route redirection
  if (!req.body || !req.body.verificationCode)
    return next(new AppError('Please provide a verification code', 400));

  const recievedCode = req.body.verificationCode;

  // Send error if recievedCode doesn't match
  if (user.verificationCode !== recievedCode)
    return next(new AppError('Verification codes do not match', 400));

  user.isVerified = true;
  user.verificationCode = undefined;
  const verifiedUser = await user.save({ validateBeforeSave: false });

  createSendToken(res, 200, verifiedUser, 'Account successfully verified!');
});

exports.login = catchAsync(async (req, res, next) => {
  // Check if email and password exist
  if (!req.body)
    return next(new AppError('Please provide an email and password', 400));

  // Get user email and password from req.body
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide an email and password', 400));

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // If everything is valid, send jwt to client
  await User.findByIdAndUpdate(user._id, {
    isAuthenticated: true,
  });

  const authenticatedUser = await User.findById(user._id);

  const resMessage = 'User successfully logged in';
  createSendToken(res, 200, authenticatedUser, resMessage);
});

exports.logout = catchAsync(async (req, res, next) => {
  const id = req.params.usrId;
  await User.findByIdAndUpdate(id, { isAuthenticated: false });

  res.cookie('jwt', 'loggedout', {
    maxAge: 10 * 1000,
  });

  const response = new SendResponse(res, 200);
  response.send();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Check if req.body exists
  if (!req.body)
    return next(new AppError('Please provide your email address', 400));

  // Check if email exists in req.body
  const { email } = req.body;
  if (!email)
    return next(new AppError('Please provide your email address', 400));

  // Get user based on POSTed email and check if exists
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError('No user associated with that email', 404));

  // Generate random reset token
  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  // Send token to user's email
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetUrl}.\nIf you didn't forget your password, please ignore this message`;

  try {
    await sendEmail({
      email,
      subject: `Your password reset token (valid for 10 minutes)`,
      message,
    });

    const response = new SendResponse(res, 200, {
      message: 'Token send to email!',
    });
    response.send();
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email, try again later', 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired, and user exists, set the new password
  if (!user) return next(new AppError('Token is invalid or expired', 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // Update changedPasswordAt property for the user

  // Log the user in, send jwt
  createSendToken(res, 200, user, 'Password successfully reset!');
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Check if req.body contains password && newPassword && newPasswordConfirm
  if (!req.body)
    return next(
      new AppError('Please provide a newPassword and newPasswordConfirm'),
      400
    );

  const { currentPassword, password, passwordConfirm } = req.body;

  if (!currentPassword || !password || !passwordConfirm)
    return next(
      new AppError(
        'Please provide your currentPassword, a new password, and a new passwordConfirm'
      ),
      400
    );

  // Get user from collection
  const user = await User.findById(req.user._id).select('+password');

  // Check if POSTed current password is correct
  if (!(await user.correctPassword(currentPassword, user.password)))
    return next(new AppError('Incorrect password'), 400);

  // If so, update password
  user.password = password;
  user.passwordConfirm = passwordConfirm;

  await user.save();

  // Log user in, send jwt
  createSendToken(res, 200, user, 'Password successfully updated!');
});
