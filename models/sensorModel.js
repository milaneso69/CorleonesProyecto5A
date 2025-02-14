const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  elemento: String,
  valor: Number,
  unidad: String,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sensor', sensorSchema);
