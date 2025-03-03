/**
 * @swagger
 * components:
 *   schemas:
 *     Appointments:
 *       type: object
 *       required:
 *         - IdCliente
 *         - IdServicio
 *         - FechaAgendada
 *       properties:
 *         IdCita:
 *           type: integer
 *           description: ID de la Cita.
 *         IdCliente:
 *           type: integer
 *           description: ID del Cliente.
 *         IdServicio:
 *           type: integer
 *           description: ID del Servicio.
 *         FechaAgendada:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora Agendada para la Cita.
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
 *         IdCita: 1
 *         IdCliente: 2
 *         IdServicio: 3
 *         FechaAgendada: "2024-10-22T14:30:00Z"
 *         created_at: "2024-10-22T10:20:30Z"
 *         updated_at: "2024-10-22T10:20:30Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Obtiene Todas las Citas.
 *     tags: [APPOINTMENTS (Consult)]
 *     responses:
 *       200:
 *         description: Lista de todas las Citas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointments'
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Obtiene una Cita por ID.
 *     tags: [APPOINTMENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Cita.
 *     responses:
 *       200:
 *         description: Datos de la Cita Solicitada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointments'
 *       404:
 *         description: Cita no Encontrada.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Crea una Nueva Cita.
 *     tags: [APPOINTMENTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdCliente:
 *                 type: integer
 *                 description: ID del Cliente.
 *                 example: 2
 *               IdServicio:
 *                 type: integer
 *                 description: ID del Servicio.
 *                 example: 3
 *               FechaAgendada:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora Agendada para la Cita.
 *                 example: "2024-10-22T14:30:00Z"
 *     responses:
 *       201:
 *         description: Cita Creada Exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointments'
 *       400:
 *         description: Solicitud Inválida.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Actualiza una Cita.
 *     tags: [APPOINTMENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Cita.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdCliente:
 *                 type: integer
 *                 description: ID del Cliente.
 *                 example: 2
 *               IdServicio:
 *                 type: integer
 *                 description: ID del Servicio.
 *                 example: 3
 *               FechaAgendada:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora Agendada para la Cita.
 *                 example: "2024-10-23T14:30:00Z"
 *     responses:
 *       200:
 *         description: Cita Actualizada Exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointments'
 *       400:
 *         description: Solicitud Inválida.
 *       404:
 *         description: Cita no Encontrada.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Elimina una Cita.
 *     tags: [APPOINTMENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la Cita a Eliminar.
 *     responses:
 *       200:
 *         description: Cita Eliminada Exitosamente.
 *       404:
 *         description: Cita no Encontrada.
 *       500:
 *         description: Error en el Servidor.
 */

const express = require('express');
const citasController = require('../controllers/citasController');

const router = express.Router();

router.get('/', citasController.getAllCitas);
router.get('/:id', citasController.getCitasById);
router.post('/', citasController.createCitas);
router.put('/:id', citasController.updateCitas);
router.delete('/:id', citasController.deleteCitas);

module.exports = router;