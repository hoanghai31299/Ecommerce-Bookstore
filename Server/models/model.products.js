const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 40,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 2000,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "products");
