require('./models/config');
const Product = require('./models/schema');
const express = require('express');
const app = express();
const PORT = 8000;

const mongodb = require('mongodb')

const cors = require('cors');

app.use(cors());

const Use = require('./models/user')

app.use(express.json());
app.get('/hello', (req,res) => {
    res.send("hello");
})

app.post('/add', async (req, resp) => {
    let result = new Product(req.body);
    let ans = await result.save();

    resp.send(ans);
})

// Assuming you have the necessary imports and server setup in place

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if a user with the same email already exists
    const existingUser = await Use.findOne({ email });
  
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists. Please log in.' });
    }
  
    // If the user doesn't exist, create a new user
    const newUser = new Use({
      name,
      email,
      password,
    });
  
    try {
      await newUser.save();
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
  });
  

app.post('/login', async (req, resp) => {
    let result = await Use.find(req.body);
    resp.send(result);
})
app.post('/displaydata', async(req, res) => {
    const data = await Product.find();
    res.send(data);
})

app.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    let productId = req.params.id;

    const result = await Product.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
    res.status(201).json({ message: 'data deleted successfully' });
    
    
});



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

