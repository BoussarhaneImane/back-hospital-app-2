const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  diagnosis: { type: String, required: true },
  illnessType: { type: String, required: true },
  arrivalTime: { 
    type: String,
    default: () => new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  cim: { type: String, required: true }  // Added CIM field
});

module.exports = mongoose.model('Patient', patientSchema);
