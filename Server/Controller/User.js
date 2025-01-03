import User from "../Models/User.js";
import filterObj from "../Utils/filterObj.js";

export const updateMe = async (req, res, next) => {
  const filteredBody = filterObj(req.body, "firstName", "lastName", "about", "avatar");

  const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);

  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "User Updated successfully",
  });
};

export const getUser = async (req,res,next) => {

  const all_users = User.find().select("firstName lastName _id");

  const this_user = req.user;

  const remaining_user = all_users.filter((user) => !this_user.friends.includes(user._id) && 
  user._id.toString() !== req.user._id.toString());

  res.status(200).json({
    status:'success',
    data: remaining_user,
    message: "Users found successfully!"
  })
}

export const getRequest = async(req,res,next) => {
  const request = User.find({
    FriendRequest: req.user.id
  }).populate("sender","_id firstName lastName")
}

export const getFriends = async(req,res,next) => {
  const friends = User.findById(req.user._id).populate("friends","_id firstName lastName")
  res.status(200).json({
    status:"success",
    data: friends
  })
}