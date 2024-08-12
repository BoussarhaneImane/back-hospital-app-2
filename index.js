const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/hospital_management')
  .then(() => {
    console.log('MongoDB connected');
  }).catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes); // Add the authentication routes

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Base route to check if the server is running
app.get('/', (req, res) => {
  res.send('Welcome to Hospital Management System');
});
