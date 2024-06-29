const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema(
  {
    productDetails: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    paymentDetails: {
      paymentId: {
        type: String,
        default: "",
      },
      payment_method_type: [],
      payment_status: {
        type: String,
        default: "",
      },
    },
    shipping_options: [],
    totalAmount: {
      type: Number,
      default: 0,
    },
    // deposit: {
    //   type: Number,
    //   default: 0,
    // },
    // returnDate: {
    //   type: Date,
    //   default: 0,
    // },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("rent", rentSchema);

module.exports = orderModel;
