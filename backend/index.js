const express = require('express');
const cors = require('cors');
const connectDB = require('./DBconnect/config');
require('./DBconnect/config')
const User = require('./DBconnect/User');
const app = express();
const PORT = 3003;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{

    res.send("<h1> Welcome to E-Commerce Dashboard (MERN Stack)</h1>")
});

app.post('/register', async (req, res) =>{
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name: name,
            email: email,
            password: password.toString(),
        });
    
        const userData = await newUser.save();
    
        res.status(200).send({
          message: "User created successfully!",
          data: {name:userData.name, email:userData.email},
        });

      } catch (error) {
        res.status(500).send({
          message: error.message,
        });
      }
});

app.listen(PORT,  async () =>{
    
    await connectDB();

    console.log(`Server is running at ${PORT}`);
})


