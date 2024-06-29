const productModel = require("../../models/productModel");
const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    // Array to store one product from each category
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({ category: category });
      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(200).json({
      data: productByCategory,
      success: true,
      error: false,
      message: "Product fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = getCategoryProduct;
