const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const router = express.Router();

// Obtener todos los usuarios activos (sin soft delete)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ deleted_at: null });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: Number(id), deleted_at: null });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un usuario con ID numérico autoincremental
router.post('/users', async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ _id: -1 });
    const newId = lastUser ? lastUser._id + 1 : 1;

    const newUser = new User({
      _id: newId,
      ...req.body
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar un usuario
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findOneAndUpdate(
      { _id: Number(id), deleted_at: null },
      { ...req.body, updated_at: new Date() },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar un usuario (soft delete)
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndUpdate(
      { _id: Number(id), deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado o ya eliminado' });
    }
    res.json({ message: 'Usuario eliminado correctamente', deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
