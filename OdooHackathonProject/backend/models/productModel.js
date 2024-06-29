const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number,
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("furniture", furnitureSchema);

module.exports = productModel;
