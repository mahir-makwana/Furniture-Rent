const addToCartModel = require("../../models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUsersId = req.userId;

    if (!currentUsersId) {
      throw new Error("User ID not found in request");
    }

    const allProduct = await addToCartModel
      .find({ userId: currentUsersId })
      .populate("productId");

    console.log("allProduct:", allProduct);

    res.json({
      data: allProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartViewProduct;
