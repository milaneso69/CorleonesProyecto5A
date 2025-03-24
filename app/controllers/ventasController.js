const Ventas = require('../models/ventasModel'); 

class ventasController {
    
    static async getAllVentas(req, res) {
        try {
            const venta = await Ventas.findAll();
            res.json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getVentasById(req, res) {
        try {
            const venta = await Ventas.findById(req.params.id);
            if (!venta) {
                return res.status(404).json({ message: 'Sales not found' });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createVentas(req, res) {
        try {
            const venta = await Ventas.create(req.body);
            res.status(201).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateVentas(req, res) {
        try {
            const venta = await Ventas.update(req.params.id, req.body);
            if (!venta) {
                return res.status(404).json({ message: 'Sales not found or already deleted' });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteVentas(req, res) {
        try {
            const result = await Ventas.delete(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ventasController;
