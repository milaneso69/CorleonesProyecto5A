/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - Nombre
 *         - Precio
 *         - Descripcion
 *         - STOCK
 *       properties:
 *         IdProduct:
 *           type: integer
 *           description: ID del Producto.
 *         Nombre:
 *           type: string
 *           description: Nombre del Producto.
 *         Precio:
 *           type: number
 *           format: double
 *           description: Precio del Producto.
 *         Descripcion:
 *           type: string
 *           description: Descripcion del Producto.
 *         STOCK:
 *           type: integer
 *           description: Cantidad de Productos.
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
 *         IdProduct: 1
 *         Nombre: "Cera para el Cabello"
 *         Precio: 120.00
 *         Descripcion: "120mg"
 *         STOCK: 4
 *         created_at: "2024-10-22T10:20:30Z"
 *         updated_at: "2024-10-22T10:20:30Z"
 *         deleted_at: null
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los Productos.
 *     tags: [PRODUCTS (Consult)]
 *     responses:
 *       200:
 *         description: Lista de Todos los Productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un Producto por ID.
 *     tags: [PRODUCTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Producto.
 *     responses:
 *       200:
 *         description: Datos del Producto Solicitado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crea un Nuevo Producto.
 *     tags: [PRODUCTS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *               - Precio
 *               - Descripcion
 *               - STOCK
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del Producto.
 *                 example: "Cera"
 *               Precio:
 *                 type: number
 *                 format: double
 *                 description: Precio del Producto.
 *                 example: 120.00
 *               Descripcion:
 *                 type: string
 *                 description: Descripcion del Producto.
 *                 example: "120mg"
 *               STOCK:
 *                 type: integer
 *                 description: Cantidad de Producto.
 *                 example: 4
 *     responses:
 *       201:
 *         description: Producto Creado Exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Solicitud Inválida.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualiza un Producto.
 *     tags: [PRODUCTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Producto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Nombre
 *               - Precio
 *               - Descripcion
 *               - STOCK
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: "Cera"
 *               Precio:
 *                 type: number
 *                 format: double
 *                 description: Precio del Producto.
 *                 example: 120.00
 *               Descripcion:
 *                 type: string
 *                 description: Descripcion del Producto.
 *                 example: "Cera de 120mg"
 *               STOCK:
 *                 type: integer
 *                 description: Cantidad de Productos.
 *                 example: 4
 *     responses:
 *       200:
 *         description: Producto Actualizado Exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Solicitud Inválida.
 *       404:
 *         description: Producto no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Elimina un Producto.
 *     tags: [PRODUCTS]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del Producto a Eliminar.
 *     responses:
 *       200:
 *         description: Producto Eliminado Exitosamente.
 *       404:
 *         description: Producto no Encontrado.
 *       500:
 *         description: Error en el Servidor.
 */

const express = require('express');
//const productControler = require('../controllers/productControler');
const ProductController = require('../controllers/productController');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;