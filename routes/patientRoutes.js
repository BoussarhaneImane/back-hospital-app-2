const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Route to check if a patient with a given CIM exists
router.get('/checkCIM/:cim', async (req, res) => {
  try {
    const patientCIM = req.params.cim;
    const patient = await Patient.findOne({ cim: patientCIM });

    if (patient) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking CIM:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new patient
router.post('/addpatient', async (req, res) => {
  try {
    console.log('Request received:', req.body);
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get all patients
router.get('/listpatient', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a patient by ID
router.get('/searchpatient/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a patient
router.put('/editpatient/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a patient
router.delete('/deletepatient/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
