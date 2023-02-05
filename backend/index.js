const express = require("express");
const cors = require("cors");
const connectDB = require("./DBconnect/config");
require("./DBconnect/config");
const User = require("./DBconnect/User");
const Product = require("./DBconnect/Product");
const app = express();
const PORT = 3003;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1> Welcome to E-Commerce Dashboard (MERN Stack)</h1>");
});

// Create User
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name: name,
      email: email,
      password: password.toString(),
    });

    let userData = await newUser.save();
    userData = userData.toObject();
    delete userData.password;

    res.status(200).send({
      message: "User created successfully!",
      data: { userData },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const user = await User.findOne(req.body).select("-password");

      if (user) {
        res.status(200).send({
          message: "User created successfully!",
          data: user,
        });
      } else {
        res.status(200).send({
          message: "No User Found!.",
          data: "",
        });
      }
    } else {
      res.status(200).send({
        message: "No User Found.No!.",
        data: "",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Create A Product
app.post("/products", async (req, res) => {
  try {
    const { name, price, category, userId } = req.body;
    const newProduct = new Product({
      name: name,
      price: price,
      category: category,
      userId: userId,
    });

    let productData = await newProduct.save();

    res.status(200).send({
      message: "Product Data created successfully!",
      data: { productData },
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running at ${PORT}`);
});
