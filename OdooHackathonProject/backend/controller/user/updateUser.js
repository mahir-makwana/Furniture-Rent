const userModel = require("../../models/userModel");

const updateUser = async (req, res) => {
  try {
    const sessionUser = req.userId;

    const { userId, email, name, role } = req.body;
    const paylode = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };
    const user = await userModel.findById(sessionUser);

    console.log("user Role :", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, paylode);

    res.json({
      data: updateUser,
      message: "Updated user successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateUser;
