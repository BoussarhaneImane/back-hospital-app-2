const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');

// Add an appointment
router.post('/addAppointment', async (req, res) => {
  try {
    const { patientCIM, doctor, date, purpose } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ cim: patientCIM });

    if (!patient) {
      return res.status(400).json({ message: 'Patient does not exist' });
    }

    const appointment = new Appointment({
      patientId: patient._id,
      doctor,
      date,
      purpose,
      cim: patientCIM
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error adding appointment:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments
router.get('/listAppointment', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get an appointment by ID
router.get('/searchAppointment/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate('patientId');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an appointment
router.put('/editAppointment/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an appointment
router.delete('/deleteAppointment/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
