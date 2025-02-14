const express = require('express');
const Sensor = require('../models/sensorModel');
const router = express.Router();

// Guardar datos enviados por Arduino
router.post('/datos', async (req, res) => {
  try {
    const { elemento, valor, unidad } = req.body;
    const nuevoDato = new Sensor({ elemento, valor, unidad });
    await nuevoDato.save();
    res.status(201).json({ mensaje: 'Dato guardado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar' });
  }
});

// Obtener datos almacenados
router.get('/datos', async (req, res) => {
  try {
    const datos = await Sensor.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

module.exports = router;
