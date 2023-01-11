const mongoose = require("mongoose");


// DATABASE -> collections -> document
const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/mern-stack-product");
      console.log("mongoose db is connected");
    } catch (error) {
      console.log("mongoose db is connected");
      console.log(error);
      process.exit(1);
    }
  };

  module.exports = connectDB;
