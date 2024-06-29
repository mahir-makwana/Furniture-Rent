const userModel = require("../../models/userModel");
const allUsers = async (req, res) => {
  try {
    console.log("user id all users", req.userId);
    const allUsers = await userModel.find();
    res.json({
      message: "All users",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = allUsers;
