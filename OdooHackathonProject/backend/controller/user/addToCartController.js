const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;

    const isProductAvailable = await addToCartModel.findOne({
      productId: productId,
      userId: currentUser,
    });
    console.log(isProductAvailable);
    if (isProductAvailable) {
      return res.json({
        message: "Product is already added to cart",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new addToCartModel(payload);

    const saveProduct = await newAddToCart.save();

    res.json({
      message: "Product added successfully",
      data: saveProduct,
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

module.exports = addToCartController;
