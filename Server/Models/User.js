import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpiresAt: {
      type: Date,
    },
    verified: {
      type: Boolean,
    },
    otp: {
      type: Number,
    },
    otp_expiry_time: {
      type: Date,
    },
    socket_id : {
      type: String,
    },
    friends: {
      type: mongoose.Schema.ObjectId,
      ref:'User'
    },
    status: {
      type:String,
      enum: ["Online","Ofline"]
    }
  },
  {timestamps: true}
);

userSchema.methods.correctPassword = async function (
  canditatePassword,
  userPassword
) {
  return await bcrypt.compare(canditatePassword, userPassword);
};

userSchema.methods.correctOtp = async function (canditateOtp, userOtp) {
  return await bcrypt.compare(canditateOtp, userOtp);
};

userSchema.pre('validate', async function (next) {
  if (!this.isModified('otp') || !this.otp) {
    return next();
  }
  this.otp = await bcrypt.hash(this.otp.toString(), 12);
  next();
});


userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpiresAt = Date.now()*10*60*1000;
  return passwordResetToken;
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password") || !this.password) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //! Shift it to next hook // this.passwordChangedAt = Date.now() - 1000;
  next();
});

export default mongoose.model('User', userSchema);
