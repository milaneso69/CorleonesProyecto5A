/**
 * @swagger
 * components:
 *   schemas:
 *     Clients:
 *       type: object
 *       required:
 *         - IdUsuario
 *         - Nombre
 *         - ApPaterno
 *         - ApMaterno
 *         - Telefono
 *       properties:
 *         IdCliente:
 *           type: integer
 *           description: ID único del Cliente.
 *         IdUsuario:
 *           type: integer
 *           description: ID del Usuario Asociado al Cliente.
 *         Nombre:
 *           type: string
 *           description: Nombre del Cliente.
 *         ApPaterno:
 *           type: string
 *           description: Apellido Paterno del Cliente.
 *         ApMaterno:
 *           type: string
 *           description: Apellido Materno del Cliente.
 *         Telefono:
 *           type: integer
 *           description: Telefono del Cliente.
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
 *         IdCliente: 1
 *         IdUsuario: 10
 *         Nombre: Zahid
 *         ApPaterno: Monraga
 *         ApMaterno: Contreras
 *         Telefono: 2711201240
 *         created_at: "2024-10-22T10:20:30Z"
 *         updated_at: "2024-10-22T10:20:30Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Obtiene la lista de Todos los Clientes.
 *     tags: [CLIENTS (Consult)]
 *     responses:
 *       200:
 *         description: Lista de Clientes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Crea un Nuevo Cliente.
 *     tags: [CLIENTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 description: ID del Usuario Asociado al Cliente.
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Cliente.
 *               ApPaterno:
 *                 type: string
 *                 description: Apellido Paterno del Cliente.
 *               ApMaterno:
 *                 type: string
 *                 description: Apellido Materno del Cliente.
 *               Telefono:
 *                 type: integer
 *                 description: Telefono del Cliente.
 *             example:
 *               IdUsuario: 10
 *               Nombre: Zahid
 *               ApPaterno: Monraga
 *               ApMaterno: Contreras
 *               Telefono: 2711201240
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Obtiene un Cliente por su ID.
 *     tags: [CLIENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Cliente.
 *     responses:
 *       200:
 *         description: Cliente encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Actualiza un Cliente por su ID.
 *     tags: [CLIENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Cliente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 description: ID del Usuario Asociado al Cliente.
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Cliente.
 *               ApPaterno:
 *                 type: string
 *                 description: Apellido Paterno del Cliente.
 *               ApMaterno:
 *                 type: string
 *                 description: Apellido Materno del Cliente.
 *               Telefono:
 *                 type: integer
 *                 description: Telefono del Cliente.
 *             example:
 *               IdUsuario: 20
 *               Nombre: Zahid
 *               ApPaterno: Monraga
 *               ApMaterno: Contreras
 *               Telefono: 2711201240
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clients'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Elimina un Cliente por su ID.
 *     tags: [CLIENTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Cliente.
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

router.get('/', ClienteController.getAllClientes);
router.get('/:id', ClienteController.getClienteById);
router.post('/', ClienteController.createCliente);
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

module.exports = router;
