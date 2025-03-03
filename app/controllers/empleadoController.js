const Empleado = require('../models/empleadoModel');

class EmpleadoController {
  static async getAllEmpleados(req, res) {
    try {
      const empleados = await Empleado.findAll();
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getEmpleadoById(req, res) {
    try {
      const empleado = await Empleado.findById(req.params.id);
      if (!empleado) {
        return res.status(404).json({ message: 'Employees not found' });
      }
      res.json(empleado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createEmpleado(req, res) {
    try {
      const empleado = await Empleado.create(req.body);
      res.status(201).json(empleado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateEmpleado(req, res) {
    try {
      const empleado = await Empleado.update(req.params.id, req.body);
      if (!empleado) {
        return res.status(404).json({ message: 'Employees not found or already deleted' });
      }
      res.json(empleado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async deleteEmpleado(req, res) {
    try {
      const result = await Empleado.delete(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EmpleadoController;
