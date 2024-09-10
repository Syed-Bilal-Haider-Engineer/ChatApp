import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
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
 validator: function(v) {
 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
 },
 message: props => `${props.value} is not a valid email address`
 }
 },
 password: {
 type: String,
 required: [true, 'Password is required'],
 minlength: [8, 'Password must be at least 8 characters long'],
 },
 passwordChangedAt: {
 type: Date,
 },
 passResetToken: {
 type: String,
 },
 passwordResetExpiresAt: {
 type: Date,
 }
}, { timestamps: true });

userSchema.methods.correctPassword = async function (canditatePassword,userPassword){
 return await bcrypt.compare(canditatePassword,userPassword)
}


export default mongoose.model("User", userSchema);