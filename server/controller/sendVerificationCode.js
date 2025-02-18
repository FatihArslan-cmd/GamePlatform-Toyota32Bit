const nodemailer = require('nodemailer');
const users = require('../utils/users');
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

  const mailOptions = {
    from: `"🎮 Game Center Security" <${process.env.EMAIL_USER}>`, // Use env var for from email
    to: email,
    subject: '🔐 Password Reset Request - Game Center',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f6f9fc;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%); padding: 40px 20px; text-align: center; border-radius: 0 0 30px 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">
              Password Reset
            </h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">
              Game Center Account Security
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="color: #2D3748; font-size: 16px; line-height: 1.6;">
              Hello <strong style="color: #FF6B6B;">${username}</strong>,
            </p>
            <p style="color: #2D3748; font-size: 16px; line-height: 1.6;">
              We received a request to reset the password for your Game Center account. To proceed with the password reset, please use the verification code below:
            </p>

            <!-- Verification Code Box -->
            <div style="margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #FFF5F5 0%, #FED7D7 100%); border-radius: 15px; text-align: center;">
              <div style="font-family: 'Courier New', monospace; font-size: 32px; letter-spacing: 8px; color: #E53E3E; font-weight: bold; text-shadow: 1px 1px 1px rgba(0,0,0,0.1);">
                ${verificationCode}
              </div>
              <p style="margin: 15px 0 0; color: #718096; font-size: 14px;">
                ⚠️ This code will expire in 5 minutes for security
              </p>
            </div>

            <!-- Steps -->
            <div style="background-color: #F7FAFC; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #2D3748; margin: 0 0 15px; font-size: 18px;">Next Steps:</h3>
              <ol style="color: #4A5568; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Enter this code on the password reset page</li>
                <li style="margin-bottom: 10px;">Create your new password</li>
                <li style="margin-bottom: 0;">Sign in with your new password</li>
              </ol>
            </div>

            <!-- Security Notice -->
            <div style="background-color: #FFF5F5; border-left: 4px solid #FC8181; padding: 15px; margin: 20px 0; border-radius: 5px;">
              <p style="color: #822727; margin: 0; font-size: 14px;">
                🔒 If you didn't request this password reset, please secure your account immediately by:
              </p>
              <ul style="color: #822727; margin: 10px 0 0; font-size: 14px; padding-left: 20px;">
                <li>Changing your password</li>
                <li>Enabling two-factor authentication</li>
                <li>Contacting our support team</li>
              </ul>
            </div>

            <!-- Contact Support -->
            <div style="margin-top: 30px; text-align: center;">
              <p style="color: #4A5568; font-size: 14px;">
                Need help? Contact our support team
              </p>
              <a href="mailto:support@gamecenter.com" style="display: inline-block; padding: 10px 20px; background-color: #FF6B6B; color: white; text-decoration: none; border-radius: 5px; font-size: 14px;">
                Contact Support
              </a>
            </div>

            <!-- Footer -->
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 14px; line-height: 1.6; margin: 0;">
                For your security, this link will expire in 5 minutes. If you need a new password reset code, you can request one on the login page.
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <div style="color: #A0AEC0; font-size: 13px;">Stay Connected</div>
                <div style="margin-top: 10px;">
                  <a href="#" style="text-decoration: none; margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/A0AEC0/twitter.png" alt="Twitter" width="24">
                  </a>
                  <a href="#" style="text-decoration: none; margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/A0AEC0/instagram-new.png" alt="Instagram" width="24">
                  </a>
                  <a href="#" style="text-decoration: none; margin: 0 10px;">
                    <img src="https://img.icons8.com/ios-filled/50/A0AEC0/discord-logo.png" alt="Discord" width="24">
                  </a>
                </div>
              </div>
            </div>

            <!-- Copyright -->
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #A0AEC0; font-size: 12px; margin: 0;">
                © 2025 Game Center. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

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