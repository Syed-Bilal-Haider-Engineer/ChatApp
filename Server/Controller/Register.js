import User from '../Models/User';
import filterObj from '../Utils/filterObj';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';

export const Register = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: firstName, lastName, email, or password.',
    });
  }

  const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'password');

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser && existingUser.verified) {
        return res.status(400).json({
          status: 'error',
          message: 'Email already in use, please login.',
        });
      } else if (existingUser) {
        return User.findOneAndUpdate(
          { email },
          filteredBody,
          { new: true, validateModifiedOnly: true }
        ).then((updatedUser) => {
          req.userId = updatedUser._id;
          next();
        });
      } else {
        return bcrypt.hash(password, 12).then((hashedPassword) => {
          const newUser = {
            ...filteredBody,
            password: hashedPassword,
          };

          return User.create(newUser).then((createdUser) => {
            req.userId = createdUser._id;
            next();
          });
        });
      }
    })
    .catch((error) => {
      next(error); 
    });
};

// Send OTP
export const sendOtp = async (req, res, next) => {
  const { userId } = req;

  const newOtp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otpExpiryTime = Date.now() + 10 * 60 * 1000; 

  try {
    await User.findByIdAndUpdate(userId, {
      otp: newOtp,
      otp_expiry_time: otpExpiryTime,
    });

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

    const isOtpCorrect = await User.correctOtp(otp, user.otp); 
    if (!isOtpCorrect) {
      return res.status(400).json({
        status: 'error',
        message: 'OTP is not valid!',
      });
    }

    user.otp = undefined; 
    user.verified = true;

    await user.save({ new: true, validateModifiedOnly: true });

    const token = signToken(user._id); 

    res.status(200).json({
      status: 'success',
      message: 'OTP verified successfully!',
      token,
    });
  } catch (error) {
    next(error); 
  }
};
