import catchAsyncError from "../utils/catchAsyncError.js";

export const chat = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "All Set Sending Messages!",
  });
});
