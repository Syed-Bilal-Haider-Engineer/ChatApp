import User from '../Models/User.js';
import sendEmail from '../Services/mailer.js';
import filterObj from '../Utils/filterObj.js';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken'; // Assuming you use JWT for token generation

// Register user
export const Register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: firstName, lastName, email, or password.',
    });
  }

  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'password');

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.verified) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already in use, please login.',
      });
    }

    let user;
    if (existingUser) {
      user = await User.findOneAndUpdate({ email }, filteredBody, {
        new: true,
        validateModifiedOnly: true,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      user = await User.create({
        ...filteredBody,
        password: hashedPassword,
      });
    }

    req.userId = user._id;
    next(); 
  } catch (error) {
    next(error);
  }
};

// Send OTP
export const sendOtp = async (req, res, next) => {
  const { userId } = req;

  const newOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otpExpiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

  try {
    await User.findByIdAndUpdate(userId, {
      otp: newOtp,
      otp_expiry_time: otpExpiryTime,
    });

    const message = {
      from: 'bilaldev151214@gmail.com',
      to: 'example@gmail.com', // Replace with the user's email
      subject: 'OTP for Twak',
      text: `Your OTP is ${newOtp}. This is valid for 10 minutes.`,
    };

    await sendEmail(message);

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully!',
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
export const verifiedOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
      otp_expiry_time: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is invalid or OTP expired!',
      });
    }

    if (otp !== user.otp) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP is not valid!',
      });
    }

    user.otp = undefined;
    user.verified = true;

    await user.save({ validateModifiedOnly: true });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully!',
      token,
    });
  } catch (error) {
    next(error);
  }
};
