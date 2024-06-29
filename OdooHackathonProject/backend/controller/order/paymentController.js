const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;

    const user = await userModel.findOne({ _id: request.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1PO3giIAdr0g0fRlulUJ8PRW",
        },
      ],
      customer_email: user.email,
      metadata: {
        userTd: request.userId,
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.sellingPrice * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URI}/success`,
      cancel_url: `${process.env.FRONTEND_URI}/cancel`,
    };
    const session = await stripe.checkout.sessions.create(params);

    response.status(303).json(session);
  } catch (error) {
    response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
