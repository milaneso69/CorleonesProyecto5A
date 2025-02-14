const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    _id: { type: Number, required: true }, 
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
}, { versionKey: false });

const Services = mongoose.model('Services', servicesSchema);

module.exports = Services;
