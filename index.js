require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const clientsModel = require('./models/clients'); 
const app = express();

console.log("Starting the server...");

app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URL;
const PORT = process.env.PORT ;

console.log("MongoDB URI:", mongoUri);
console.log("Server will run on port:", PORT);

const connectToMongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Connected to MongoDB Atlas with success");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

connectToMongoDB();

app.post('/login', (req, res) => {
  console.log("/login endpoint hit");
  const { email, password } = req.body;
  clientsModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json({ name: user.name });
        } else {
          res.json("The password is incorrect, ops!");
        }
      } else {
        res.json("No record existed");
      }
    })
    .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
  console.log("/register endpoint hit");
  clientsModel.create(req.body)
    .then(client => res.json(client))
    .catch(err => res.json(err));
});

app.get('/', (req, res) => {
  console.log("/ endpoint hit");
  res.send('Hello backend from express');
});
app.get('/hy', (req, res) => {
     res.send('hy friends');
   });
app.listen(PORT, () => {
  console.log(`Server running good on port ${PORT}`);
  console.log('hey');
});
