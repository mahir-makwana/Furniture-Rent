const uploadProductPermissions = require("../../helper/permission");
const productModel = require("../../models/productModel");

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermissions(req.userId)) {
      throw new Error("You don't have permission to upload product");
    }20000

    const { _id, ...resBody } = req.body;

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.json({
      message: "Product updated successfully",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = updateProductController;
