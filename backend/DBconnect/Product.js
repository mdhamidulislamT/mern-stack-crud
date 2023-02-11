const mongoose = require("mongoose");
const { Schema } = mongoose;


// create product schema
const productSchema = new Schema({
    name: {
      type: String,
      required: true,
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  });

  // create User model
  module.exports = mongoose.model("products", productSchema);




