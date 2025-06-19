//digital-library-backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    //include the userid, email, and role in the JWT token
    // Generate JWT token with user details
    const token = jwt.sign(
      { userId: user._id, email: user.email,role: user.role },
    
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { username: user.username, email: user.email,role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


