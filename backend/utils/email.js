const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config.env' });

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendEmail = async options => {
  // Define the email options
  const mailOptions = {
    from: 'Thomas Katter <thomas@ulearn.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};
