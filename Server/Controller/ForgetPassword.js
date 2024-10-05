import User from '../Models/User.js';
export const ForgetPassword = async (req, res, next) => {
  try {
    // Find user by email
    const newUser = await User.findOne({ email: req.body.email });
    if (!newUser) {
      return res.status(400).json({
        status: 'Error',
        message: 'No user found with the provided email.',
      });
    }

    // Create reset token
    const resetToken = newUser.createPasswordResetToken();
    await newUser.save({ validateBeforeSave: false });

    const resetLink = `https://rawk.com/auth/reset-password/?code=${resetToken}`;
    try {
      // Logic to send email here
      res.status(200).json({
        status: 'success',
        message: 'Password reset link has been sent to your email.',
        resetLink
      });
    } catch (error) {
      newUser.passwordResetToken = undefined;
      newUser.passwordResetExpiresAt = undefined;
      await newUser.save({ validateBeforeSave: false });
      
      return res.status(500).json({
        status: 'Error',
        message: 'Error sending the reset email. Please try again later.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
};

