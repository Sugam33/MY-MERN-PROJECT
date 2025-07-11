const User = require('../model/User');
const OtpToken = require('../model/OtpToken');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcryptjs');

// Request OTP via Email
exports.requestOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

    await OtpToken.findOneAndUpdate(
      { email },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    await sendEmail(email, 'Password Reset OTP', `Your OTP is: ${otp}`);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error while sending OTP' });
  }
};

// Verify OTP from User
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await OtpToken.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};

// Reset Password using OTP
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = await OtpToken.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    await OtpToken.deleteOne({ email }); // Cleanup used OTP

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};
