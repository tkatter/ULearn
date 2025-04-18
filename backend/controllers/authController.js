// const mongoose = require('mongoose');
const User = require('../models/userModel');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
dotenv.config({ path: 'backend/config.env' });

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
