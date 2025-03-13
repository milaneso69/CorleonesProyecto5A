/**
 * @swagger
 * components:
 *   schemas:
 *     Employees:
 *       type: object
 *       required:
 *         - IdUsuario
 *       properties:
 *         IdEmpleado:
 *           type: integer
 *           description: ID único del Empleado.
 *         IdUsuario:
 *           type: integer
 *           description: ID del Usuario Asociado al Empleado.
 *         Nombre:
 *           type: string
 *           description: Nombre del Empleado.
 *         ApPaterno:
 *           type: string
 *           description: Apellido Paterno del Empleado.
 *         ApMaterno:
 *           type: string
 *           description: Apellido Materno del Empleado.
 *         Telefono:
 *           type: integer
 *           description: Telefono del Empleado.
 *         NSS:
 *           type: string
 *           description: Número de Seguridad Social del Empleado.
 *         RFC:
 *           type: string
 *           description: Registro Federal de Contribuyentes del Empleado.
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
 *         IdEmpleado: 1
 *         IdUsuario: 5
 *         Nombre: Zahid
 *         ApPaterno: Monraga
 *         ApMaterno: Contreras
 *         Telefono: 2719901240
 *         NSS: "123996789"
 *         RFC: "ABC123499789"
 *         created_at: "2024-10-22T10:20:30Z"
 *         updated_at: "2024-10-22T10:20:30Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Obtiene la lista de Todos los Empleados.
 *     tags: [EMPLOYEES (Consult)]
 *     responses:
 *       200:
 *         description: Lista de Empleados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtiene un Empleado por su ID.
 *     tags: [EMPLOYEES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Empleado.
 *     responses:
 *       200:
 *         description: Empleado Encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       404:
 *         description: Empleado no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Crea un Nuevo Empleado.
 *     tags: [EMPLOYEES]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 description: ID del Usuario Asociado al Empleado.
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Empleado.
 *               ApPaterno:
 *                 type: string
 *                 description: Apellido Paterno del Empleado.
 *               ApMaterno:
 *                 type: string
 *                 description: Apellido Materno del Empleado.
 *               Telefono:
 *                 type: integer
 *                 description: Telefono del Empleado.
 *               NSS:
 *                 type: string
 *                 description: Número de Seguridad Social del Empleado.
 *               RFC:
 *                 type: string
 *                 description: Registro Federal de Contribuyentes del Empleado.
 *           example:
 *             IdUsuario: 10
 *             Nombre: Zahid
 *             ApPaterno: Monraga
 *             ApMaterno: Contreras
 *             Telefono: 2711201240
 *             NSS: "123456789"
 *             RFC: "ABC123456789"
 *     responses:
 *       201:
 *         description: El Empleado ha sido Creado con Éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Actualiza un Empleado por su ID.
 *     tags: [EMPLOYEES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Empleado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IdUsuario:
 *                 type: integer
 *                 description: ID del Usuario Asociado al Empleado.
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Empleado.
 *               ApPaterno:
 *                 type: string
 *                 description: Apellido Paterno del Empleado.
 *               ApMaterno:
 *                 type: string
 *                 description: Apellido Materno del Empleado.
 *               Telefono:
 *                 type: integer
 *                 description: Telefono del Empleado.
 *               NSS:
 *                 type: string
 *                 description: Número de Seguridad Social del Empleado.
 *               RFC:
 *                 type: string
 *                 description: Registro Federal de Contribuyentes del Empleado.
 *           example:
 *             IdUsuario: 10
 *             Nombre: Zahid
 *             ApPaterno: Monraga
 *             ApMaterno: Contreras
 *             Telefono: 2711201240
 *             NSS: "987654321"
 *             RFC: "DEF987654321"
 *     responses:
 *       200:
 *         description: El Empleado ha sido Actualizado con Éxito.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employees'
 *       404:
 *         description: Empleado no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Elimina un Empleado por su ID.
 *     tags: [EMPLOYEES]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Empleado.
 *     responses:
 *       204:
 *         description: Empleado Eliminado con Éxito.
 *       404:
 *         description: Empleado no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

const express = require('express');
const EmpleadoController = require('../controllers/empleadoController');

const router = express.Router();

router.get('/', EmpleadoController.getAllEmpleados);
router.get('/:id', EmpleadoController.getEmpleadoById);  
router.post('/', EmpleadoController.createEmpleado);
router.put('/:id', EmpleadoController.updateEmpleado);  
router.delete('/:id', EmpleadoController.deleteEmpleado);  

module.exports = router;
