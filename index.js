const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URL;
// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
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

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes); // Add the authentication routes

// Base route to check if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to Hospital Management System');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
