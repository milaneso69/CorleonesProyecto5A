const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  imagen: { type: String, required: true },
  ruta_imagen: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  deteccion: { type: Boolean, default: false },
  confirmacion: { type: Boolean, default: false },
  movimiento: { type: Boolean, default: false },
  almacenamiento: { type: Boolean, default: true },
  deleted_at: { type: Date, default: null }
}, { versionKey: false });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
