const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  correo: { type: String, required: true },
  contrasenia: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  clientes: [{ type: Object }],
  empleados: [{ type: Object }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
