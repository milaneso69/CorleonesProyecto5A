const express = require('express');
const mongoose = require('mongoose');
const Record = require('../models/recordModel'); 

const router = express.Router();

// Obtener todos los registros activos (sin eliminados)
router.get('/records', async (req, res) => {
  try {
    const records = await Record.find({ deleted_at: null }); 
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un registro por ID
router.get('/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Record.findOne({ _id: Number(id), deleted_at: null }); 

    if (!record) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo registro con ID manual
router.post('/records', async (req, res) => {
  try {
    const lastRecord = await Record.findOne().sort({ _id: -1 }); 
    const newId = lastRecord ? lastRecord._id + 1 : 1;

    const newRecord = new Record({
      _id: newId,
      ...req.body
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un registro
router.put('/records/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRecord = await Record.findOneAndUpdate(
      { _id: Number(id), deleted_at: null },
      { ...req.body, updated_at: new Date() },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un registro (soft delete)
router.delete('/records/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await Record.findOneAndUpdate(
      { _id: Number(id), deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedRecord) {
      return res.status(404).json({ message: 'Registro no encontrado o ya eliminado' });
    }
    res.json({ message: 'Registro eliminado correctamente', deletedRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
