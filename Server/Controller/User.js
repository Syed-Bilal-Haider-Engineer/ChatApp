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
