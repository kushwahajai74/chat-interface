export const sendToken = (res, user, message, statusCode) => {
  const token = user.getJwtToken();

  // Set authorization token to header
  res
    .status(statusCode)
    // .cookie("token", token, {
    //   expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    //   httpOnly: true,
    // })
    .json({
      success: true,
      message,
      token,
    });
};
