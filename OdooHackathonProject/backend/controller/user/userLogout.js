const userLogOut = (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "User log out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = userLogOut;
