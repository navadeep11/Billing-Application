const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Models/AuthModel');

exports.IsUser = async (req, res, next) => {
  try {
    // Check if cookies exist and extract token
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: 'Your session has expired!' });
    }

    const { token } = req.cookies;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token or user not found.' });
    }

    // Attach user information to the request object
    req.user = user;
    next();
  } catch (error) {
    // Handle different JWT errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token. Unauthorized access.' });
    } else {
      return res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
  }
};
