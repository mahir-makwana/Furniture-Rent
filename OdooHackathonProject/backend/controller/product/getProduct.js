const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
  try {
    const allProducts = await productModel.find().sort({ createdAt: -1 });
    res.json({
      message: "All products",
      data: allProducts,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getProductController;
