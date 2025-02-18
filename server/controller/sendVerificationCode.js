const nodemailer = require('nodemailer');
const users = require('../utils/users');
const { createMailOptions } = require('../utils/mailOptions'); // Import mailOptions function
require('dotenv').config(); // Load environment variables

const lastRequestTimeByEmail = {}; // Rate limit by email

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email user
    pass: process.env.EMAIL_PASS // Use environment variable for email password
  }
});

const sendVerificationCode = async (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!users[username]) {
    return res.status(404).json({ message: 'User not found' });
  }

  const email = users[username].email;
  if (!email) {
    return res.status(400).json({ message: 'User email not found' });
  }

  const verificationCode = generateVerificationCode();

  const mailOptions = createMailOptions(email, username, verificationCode); // Get mailOptions from imported function

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset code sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send password reset code' });
  }
};


const rateLimitMiddleware = (req, res, next) => {
  const username = req.body.username;
  const now = Date.now();
  const cooldownPeriod = 30000; // 30 seconds

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const user = users[username];
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const email = user.email; // Get email from user data
  if (!email) {
    return res.status(400).json({ message: 'User email not found' }); // Check if email exists
  }


  if (lastRequestTimeByEmail[email]) { // Use email as key for rate limiting
    const timeDiff = now - lastRequestTimeByEmail[email];
    if (timeDiff < cooldownPeriod) {
      const timeLeft = Math.ceil((cooldownPeriod - timeDiff) / 1000);
      return res.status(429).json({
        message: `Too many requests for this email. Please wait ${timeLeft} seconds before trying again.`,
      });
    }
  }

  lastRequestTimeByEmail[email] = now; // Store last request time by email
  next();
};


module.exports = {
  sendVerificationCode,
  rateLimitMiddleware,
};