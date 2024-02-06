import { Router }  from 'express'
import { methods } from '../controllers/sat.products.services.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/products.services.js';
const router = Router()

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/{code}:
 *   get:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por su código
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: El código del producto o servicio
 *     responses:
 *       200:
 *         description: Datos del producto o servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ClaveProductoServicio:
 *                   type: string
 *                 Descripcion:
 *                   type: string
 *                 PalabrasSimilares:
 *                   type: string
 *             example:
 *               ClaveProductoServicio: "101"
 *               Descripcion: "Producto Servicio"
 *               PalabrasSimilares: "Palabra 1"
 */
router.get(
	'/servicio/buscar/:code',
	methods.findProductServicesByCode,
);

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/{descripcion}:
 *   get:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por su descripción
 *     parameters:
 *       - in: path
 *         name: descripcion
 *         required: true
 *         schema:
 *           type: string
 *         description: La descripción del producto o servicio
 *     responses:
 *       200:
 *         description: Datos del producto o servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ClaveProductoServicio:
 *                   type: string
 *                 Descripcion:
 *                   type: string
 *                 PalabrasSimilares:
 *                   type: string
 *             example:
 *               ClaveProductoServicio: "101"
 *               Descripcion: "Producto Servicio"
 *               PalabrasSimilares: "Palabra 1"
 */
router.get(
	'/servicio/buscar/:descripcion',
	methods.findProductServicesByDescription,
);

/**
 * @swagger
 * /ap1/v1/productos/servicio/palabra/{palabra}:
 *   get:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por palabra similar
 *     parameters:
 *       - in: path
 *         name: palabra
 *         required: true
 *         schema:
 *           type: string
 *         description: La palabra similar al producto o servicio
 *     responses:
 *       200:
 *         description: Datos del producto o servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ClaveProductoServicio:
 *                   type: string
 *                 Descripcion:
 *                   type: string
 *                 PalabrasSimilares:
 *                   type: string
 *             example:
 *               ClaveProductoServicio: "101"
 *               Descripcion: "Producto Servicio"
 *               PalabrasSimilares: "Palabra 1"
 */
router.get(
	'/servicio/palabra/:palabra',
	methods.findProductServicesByMatchWord,
);

/**
 * @swagger
 * /api/v1/productos/servicio:
 *   post:
 *     tags:
 *       - Productos Servicios
 *     summary: Crea un nuevo producto o servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveProductoServicio:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               PalabrasSimilares:
 *                 type: string
 *           example:
 *             ClaveProductoServicio: "101"
 *             Descripcion: "Producto Servicio"
 *             PalabrasSimilares: "Palabra 1"
 *     responses:
 *       200:
 *         description: Producto/Servicio creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Producto/Servicio creado"
 */
router.post(
	'/servicio',
	schemas.createProductServicesSchema,
	middleware.validateSchema,
	methods.createProductServices,
);

/**
 * @swagger
 * /api/v1/productos/servicio:
 *   patch:
 *     tags:
 *       - Productos Servicios
 *     summary: Crea un nuevo producto o servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveProductoServicio:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *               PalabrasSimilares:
 *                 type: string
 *           example:
 *             ClaveProductoServicio: "101"
 *             Descripcion: "Producto Servicio"
 *             PalabrasSimilares: "Palabra 1"
 *     responses:
 *       200:
 *         description: Producto/Servicio creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Producto/Servicio creado"
 */
router.patch(
	'/servicio',
	schemas.updateProductServicesSchema,
	middleware.validateSchema,
	methods.updateProductServices,
);

/**
 * @swagger
 * /api/v1/productos/servicio:
 *   delete:
 *     tags:
 *       - Productos Servicios
 *     summary: Borra un producto o servicio existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveProductoServicio:
 *                 type: string
 *           example:
 *             ClaveProductoServicio: "101"
 *     responses:
 *       200:
 *         description: Producto/Servicio borrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Producto/Servicio borrado"
 */
router.delete(
	'/servicio',
	schemas.deleteProductServicesSchema,
	middleware.validateSchema,
	methods.deleteProductServices,
);

export default router;