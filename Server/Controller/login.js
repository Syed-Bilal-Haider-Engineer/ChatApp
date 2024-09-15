import JWT from 'jsonwebtoken';
import User from '../Models/User';

export const signToken = (userId) => {
 return JWT.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const login = async(req, res, next) => {
 const { email, password } = req.body;
 if (!email || !password) {
 return res.status(400).json({
 status: "error",
 message: "Please provide email and password"
 });
 }

 await User.findOne({ email }).select("+password")
 .then(user => {
 if (!user || !(User.correctPassword(password, user.password))) {
 return res.status(401).json({
 status: "error",
 message: "Email or password is incorrect"
 });
 }

 const token = signToken(user._id);
 res.status(200).json({
 status: "success",
 token
 });
 })
 .catch(err => {
 next(err); 
 });
};