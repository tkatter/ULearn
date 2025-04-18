const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
dotenv.config({ path: 'backend/config.env' });

async function getUserData(accessToken) {
  // TODO use authorization bearer token header in fetch
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  // console.log(response);
  const data = await response.json();
  console.log('data', data);
  return data;
}

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
      scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
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
  const code = req.query.code;
  // console.log(code);
  try {
    const redirectUrl = 'http://127.0.0.1:3000/api/v1/oauth';

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const response = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(response.tokens);
    console.info('Tokens acquired');
    const user = oAuth2Client.credentials;
    const accessToken = user.access_token;
    const userData = await getUserData(accessToken);
    // console.log(oAuth2Client);
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     userData,
    //   },
    // });
  } catch (err) {
    console.error(err);
    // res.status(500).json({
    //   status: 'fail',
    //   message: err,
    // });
  }
  res.redirect(303, 'http://localhost:5173/');
};
