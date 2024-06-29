const uploadProductPermissions = require("../../helper/permission");
const productModel = require("../../models/productModel");

const uploadProductController = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermissions(sessionUserId)) {
      throw new Error("You don't have permission to upload product");
    }
    const uploadProduct = new productModel(req.body);
    const saveProduct = uploadProduct.save();

    res.status(200).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = uploadProductController;
