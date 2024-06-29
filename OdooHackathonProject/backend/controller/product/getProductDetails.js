const productModel = require("../../models/productModel");
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({
      message: "Product details",
      data: product,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductDetails;
