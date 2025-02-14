const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    _id: { type: Number, required: true }, 
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    stock: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
}, { versionKey: false });

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;
