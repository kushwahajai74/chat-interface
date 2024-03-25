import User from "../models/userModel.js";
import ErrorHandler from "../utils/Errorhandler.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  const user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  const newUser = await User.create({ name, email, password });
  return sendToken(res, newUser, `Welcome! ${newUser.name}`, 200);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  return sendToken(res, user, `Welcome Back! ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
