const mongoose = require("mongoose");

// create product schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      min: [8, "too short"],
      maxlength: [30, "too long"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        min: [3, "too short"],
        maxlength: [10, "too long"],
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  // create User model
  module.exports = mongoose.model("users", userSchema);




