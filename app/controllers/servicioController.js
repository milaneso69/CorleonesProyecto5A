const Servicio = require('../models/servicioModel');

class ServicioController {
  static async getAllServicios(req, res) {
    try {
      const servicios = await Servicio.findAll();
      res.json(servicios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getServiciosById(req, res) {
    try {
      const servicio = await Servicio.findById(req.params.id);
      if (!servicio) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createServicio(req, res) {
    try {
      const servicio = await Servicio.create(req.body);
      res.status(201).json(servicio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Métodos adicionales como `updateServicio`, `deleteServicio`, etc.

  static async updateServicio(req, res) {
    try {
      const servicio = await Servicio.update(req.params.id, req.body);
      if (!servicio) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteServicio(req, res) {
    try {
      const result = await Servicio.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ServicioController;
