const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  purpose: { type: String, required: true },
  cim: { type: String, required: true }  // Added CIM field
});

module.exports = mongoose.model('Appointment', appointmentSchema);
