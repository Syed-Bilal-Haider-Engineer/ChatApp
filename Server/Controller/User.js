import User from "../Models/User";
import filterObj from "../Utils/filterObj";
import { catchAsync } from "../Utils/catchAsync";  // Assuming catchAsync is imported from some utility

export const updateMe = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(req.body, "firstName", "lastName", "about", "avatar");

  const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);

  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "User Updated successfully",
  });
});
