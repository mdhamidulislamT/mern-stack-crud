const mongoose = require("mongoose");

// create product schema
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "too short"],
      maxlength: [6, "too long"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        min: [3, "too short"],
        maxlength: [30, "too long"],
      },
    userId: {
        type: String,
        required: [true, "UserId is required"],
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // create User model
  module.exports = mongoose.model("products", productSchema);




