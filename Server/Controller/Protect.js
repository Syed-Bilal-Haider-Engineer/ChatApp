import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../Models/User.js';

export const protect = async (req, res, next) => {
  try {
    // 1) Get token from headers or cookies
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];  // Extract token from Bearer
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;  // Fallback to token from cookies
    }

    // 2) If no token, reject access
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 3) Token verification
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 4) Check if user still exists
    const this_user = await User.findById(decoded.userId);
    if (!this_user) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // 5) Check if user changed password after the token was issued
    if (this_user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'error',
        message: 'User recently changed password! Please log in again.',
      });
    }

    // 6) Grant access to the protected route
    req.user = this_user;
    next();
  } catch (error) {
    // Catch any errors during the process (e.g., invalid token, user not found)
    return res.status(500).json({
      status: 'error',
      message: 'Authentication failed. Please try again later.',
    });
  }
};
