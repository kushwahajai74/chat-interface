const catchAsyncError = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
export default catchAsyncError;
