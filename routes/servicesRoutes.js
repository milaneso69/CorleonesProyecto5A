const express = require('express');
const mongoose = require('mongoose');
const Services = require('../models/servicesModel');

const router = express.Router();

// Obtener todos los servicios activos (sin eliminados)
router.get('/services', async (req, res) => {
    try {
        const services = await Services.find({ deleted_at: null });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un servicio por ID
router.get('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Services.findOne({ _id: Number(id), deleted_at: null });

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo servicio con ID autoincremental
router.post('/services', async (req, res) => {
    try {
        const lastService = await Services.findOne().sort({ _id: -1 });
        const newId = lastService ? lastService._id + 1 : 1;

        const newService = new Services({
            _id: newId,
            ...req.body
        });

        const savedService = await newService.save();
        res.status(201).json(savedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un servicio
router.put('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const updatedService = await Services.findOneAndUpdate(
            { _id: Number(id), deleted_at: null },
            { ...req.body, updated_at: new Date() },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un servicio (soft delete)
router.delete('/services/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Services.findOneAndUpdate(
            { _id: Number(id), deleted_at: null },
            { deleted_at: new Date() },
            { new: true }
        );

        if (!deletedService) {
            return res.status(404).json({ message: 'Servicio no encontrado o ya eliminado' });
        }
        res.json({ message: 'Servicio eliminado correctamente', deletedService });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Restaurar un servicio eliminado
router.patch('/services/:id/restore', async (req, res) => {
    try {
        const { id } = req.params;

        const restoredService = await Services.findOneAndUpdate(
            { _id: Number(id), deleted_at: { $ne: null } },
            { deleted_at: null, updated_at: new Date() },
            { new: true }
        );

        if (!restoredService) {
            return res.status(404).json({ message: 'Servicio no encontrado o no eliminado' });
        }
        res.json({ message: 'Servicio restaurado correctamente', restoredService });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
