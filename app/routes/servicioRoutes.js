/**
 * @swagger
 * components:
 *   schemas:
 *     Services:
 *       type: object
 *       required:
 *         - Nombre
 *         - Descripcion
 *         - Precio
 *       properties:
 *         Id:
 *           type: integer
 *           description: ID del Servicio.
 *         Nombre:
 *           type: string
 *           description: Nombre del Servicio.
 *         Descripcion:
 *           type: string
 *           description: Descripción del Servicio.
 *         Precio:
 *           type: number
 *           format: double
 *           description: Precio del Servicio.
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
 *         Id: 1
 *         Nombre: Corte Casquete Corto
 *         Descripcion: Corte Sencillo Casquete
 *         Precio: 50
 *         created_at: "2024-10-22T10:20:30Z"
 *         updated_at: "2024-10-22T10:20:30Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Obtiene Todos los Servicios.
 *     tags: [SERVICES (Consult)]
 *     responses:
 *       200:
 *         description: Lista de Todos los Servicios.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Services'
 */

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Obtiene un Servicio por su ID.
 *     tags: [SERVICES]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Servicio.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: El Servicio Solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Services'
 *       404:
 *         description: Servicio no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crea un Nuevo Servicio.
 *     tags: [SERVICES]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *               - Descripcion
 *               - Precio
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Servicio.
 *                 example: "Corte Casquete Corto"
 *               Descripcion:
 *                 type: string
 *                 description: Descripción del Servicio.
 *                 example: "Corte Sencillo Casquete"
 *               Precio:
 *                 type: number
 *                 format: double
 *                 description: Precio del Servicio.
 *                 example: 50
 *     responses:
 *       201:
 *         description: Servicio Creado Exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Services'
 *       400:
 *         description: Solicitud Inválida.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualiza un Servicio por su ID.
 *     tags: [SERVICES]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Servicio.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *               - Descripcion
 *               - Precio
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Servicio.
 *                 example: "Corte Casquete Corto"
 *               Descripcion:
 *                 type: string
 *                 description: Descripción del Servicio.
 *                 example: "Corte Sencillo Casquete"
 *               Precio:
 *                 type: number
 *                 format: double
 *                 description: Precio del Servicio.
 *                 example: 50
 *     responses:
 *       200:
 *         description: Servicio Actualizado Exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Services'
 *       404:
 *         description: Servicio no Encontrado.
 *       400:
 *         description: Solicitud Inválida.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Elimina un Servicio por su ID.
 *     tags: [SERVICES]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Servicio a Eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio Eliminado Exitosamente.
 *       404:
 *         description: Servicio no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

const express = require('express');
const ServicioController = require('../controllers/servicioController');

const router = express.Router();

router.get('/', ServicioController.getAllServicios);
router.get('/:id', ServicioController.getServiciosById);
router.post('/', ServicioController.createServicio);
router.put('/:id', ServicioController.updateServicio);
router.delete('/:id', ServicioController.deleteServicio);

// Rutas adicionales para `update` y `delete`

module.exports = router;
