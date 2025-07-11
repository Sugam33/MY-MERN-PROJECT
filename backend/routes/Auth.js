const express = require('express');
const dotenv = require("dotenv");
const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/FetchUser');
const OtpToken = require('../model/OtpToken'); //  OTP model
const sendEmail = require('../utils/sendEmail'); //  Email sender

dotenv.config();
const router = express.Router();
const secret = process.env.JWT_SECRET;

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create User
router.post("/createuser", upload.single("profileImage"), [
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("mobile").isLength({ min: 10, max: 10 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, mobile } = req.body;
  const profileImagePath = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = bcrypt.genSaltSync(10);
    const secPassword = bcrypt.hashSync(password, salt);

    user = await User.create({ name, email, password: secPassword, mobile, profileImage: profileImagePath });
    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, secret);
    res.status(201).json({ message: "User created successfully", user, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Login
router.post("/login", [
  body("email").isEmail(),
  body("password").isLength({ min: 3 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) return res.status(400).json({ message: "Invalid password" });

    const data = { user: { id: user._id } };
    const authToken = jwt.sign(data, secret);
    res.status(201).json({ message: "Login success", user, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Get User
router.get('/getuser', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User
router.put('/updateuser', fetchUser, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const updateFields = { name, email, mobile };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, { $set: updateFields }, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Request OTP
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 min expiry

    await OtpToken.findOneAndUpdate({ email }, { otp, expiresAt }, { upsert: true, new: true });
    await sendEmail(email, 'Password Reset OTP', `Your OTP is: ${otp}`);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const record = await OtpToken.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
router.put('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const record = await OtpToken.findOne({ email });
    if (!record || record.otp !== otp || record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    await OtpToken.deleteOne({ email });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
