const express = require('express');
const mongoose = require('mongoose');
const Products = require('../models/productsModel');  

const router = express.Router();

// Obtener todos los productos activos (sin eliminados)
router.get('/products', async (req, res) => {
    try {
        const products = await Products.find({ deleted_at: null });  
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un producto por ID
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findOne({ _id: Number(id), deleted_at: null });  

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo producto con ID autoincremental
router.post('/products', async (req, res) => {
    try {
        const lastProduct = await Products.findOne().sort({ _id: -1 });
        const newId = lastProduct ? lastProduct._id + 1 : 1;

        const newProduct = new Products({
            _id: newId,
            ...req.body
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un producto
router.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Products.findOneAndUpdate(
            { _id: Number(id), deleted_at: null },
            { ...req.body, updated_at: new Date() },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un producto (soft delete)
router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Products.findOneAndUpdate(
            { _id: Number(id), deleted_at: null },
            { deleted_at: new Date() },
            { new: true }
        );

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado o ya eliminado' });
        }
        res.json({ message: 'Producto eliminado correctamente', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Restaurar un producto eliminado
router.patch('/products/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;

        const restoredProduct = await Products.findOneAndUpdate(
            { _id: Number(id), deleted_at: { $ne: null } },
            { deleted_at: null, updated_at: new Date() },
            { new: true }
        );

        if (!restoredProduct) {
            return res.status(404).json({ message: 'Producto no encontrado o no eliminado' });
        }
        res.json({ message: 'Producto restaurado correctamente', restoredProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
