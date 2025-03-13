/**
 * @swagger
 * components:
 *   schemas:
 *     Sales:
 *       type: object
 *       required:
 *         - IdCliente
 *         - FechaVenta
 *         - Total
 *       properties:
 *         IdVenta:
 *           type: integer
 *           description: ID único de la Venta.
 *         IdCliente:
 *           type: integer
 *           description: ID del Usuario Asociado al Cliente.
 *         FechaVenta:
 *           type: string
 *           format: date-time
 *           description: Fecha de la Venta.
 *         Total:
 *           type: number
 *           description: Total de la Venta.
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de Creación.
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última Actualización.
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de Eliminación.
 *       example:
 *         IdVenta: 1
 *         IdCliente: 2
 *         FechaVenta: "2024-10-22T10:20:30Z"
 *         Total: 75.00
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Obtiene la lista de todas las Ventas.
 *     tags: [SALES (Consult)]
 *     responses:
 *       200:
 *         description: Lista de Ventas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sales'
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Crea una Nueva Venta.
 *     tags: [SALES]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdCliente:
 *                 type: integer
 *                 description: ID del Cliente Asociado.
 *               FechaVenta:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de la Venta.
 *               Total:
 *                 type: number
 *                 description: Total de la Venta.
 *             example:
 *               IdCliente: 2
 *               FechaVenta: "2024-10-22T10:20:30Z"
 *               Total: 75.00
 *     responses:
 *       201:
 *         description: Venta creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sales'
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtiene una Venta por su ID.
 *     tags: [SALES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Venta.
 *     responses:
 *       200:
 *         description: Venta encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sales'
 *       404:
 *         description: Venta no encontrada.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   put:
 *     summary: Actualiza una Venta por su ID.
 *     tags: [SALES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Venta.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdCliente:
 *                 type: integer
 *                 description: ID del Cliente Asociado.
 *               FechaVenta:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de la Venta.
 *               Total:
 *                 type: number
 *                 description: Total de la Venta.
 *             example:
 *               IdCliente: 3
 *               FechaVenta: "2024-10-30T12:34:56Z"
 *               Total: 150.75
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sales'
 *       404:
 *         description: Venta no encontrada.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Elimina una Venta por su ID.
 *     tags: [SALES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Venta a eliminar.
 *     responses:
 *       200:
 *         description: Venta eliminada exitosamente.
 *       404:
 *         description: Venta no encontrada.
 *       500:
 *         description: Error en el Servidor.
 */

const express = require('express');
const SaleController = require('../controllers/saleController');

const router = express.Router();

router.get('/', SaleController.getAllVentas);
router.post('/', SaleController.createVentas);
router.get('/:id', SaleController.getVentasById);
router.put('/:id', SaleController.updateVentas);
router.delete('/:id', SaleController.deleteVentas);

module.exports = router;
