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

    let user = await newUser.save();
    user = user.toObject();
    delete user.password;

    res.status(200).send({
      message: "User created successfully!",
      data: { user },
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

// Get All Products
app.get("/products", async (req, res) => {
  try {
    let products = await Product.find({});

    res.status(200).send({
      message: "All Products Data fetched successfully!",
      data: { products },
    });
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
      user: userId,
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

// Get A Product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (product) {
      res.status(200).send({
        success: true,
        message: "Product Found",
        data: product,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Product not Found",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Update Product
app.put("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          category: req.body.category,
        },
      },
      { new: true }
    );

    res.send({ message: "Product Data created successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

// Get A Product
app.delete("/products/:id", async (req, res) => {
  try {
    //const result = await Product.deleteOne({_id:req.params.id});
    const result = await Product.findByIdAndDelete({ _id: req.params.id }); // return deleted product
    if (result) {
      res.status(200).send({
        success: true,
        message: "A product deleted!",
        data: result,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "A product was not found with!",
      });
    }
  } catch (error) {}
});

// Search Product(s)
app.get("/search/:key", async (req, res) => {
  try {

    const searchKey = req.params.key;
    const product = await Product.find().or([
      {
        name: { $regex: searchKey },
      },
      {
        category: { $regex: searchKey },
      },
    ]);

    if (product) {
      res.status(200).send({
        success: true,
        message: "Product Found",
        data: product,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Product not Found",
      });
    }
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
