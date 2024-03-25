import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login first to access this route",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session Expired! Login Again to access this route",
    });
  }
};
export default isAuthenticated;
