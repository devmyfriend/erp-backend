import { Router }  from 'express'
import { methods } from '../controllers/sat.productos.servicios.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/products.services.js';
const router = Router()

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/clave:
 *   post:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por su clave
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveProductoServicio:
 *                 type: integer
 *               Pagina:
 *                 type: integer
 *           example:
 *             ClaveProductoServicio: 101
 *             Pagina: 1
 *     responses:
 *       200:
 *         description: Datos del producto o servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ClaveProductoServicio:
 *                   type: integer
 *                 Pagina:
 *                   type: integer
 *             example:
 *               ClaveProductoServicio: 101
 *               Pagina: 1
 */
router.post(
	'/servicio/buscar/clave',
	/* schemas.buscarProductosServiciosPorClaveSchema, */
	middleware.validateSchema,
	methods.buscarProductosServiciosPorClave,
);

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/descripcion:
 *   post:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por su descripción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Descripcion:
 *                 type: string
 *               Pagina:
 *                 type: integer
 *           example:
 *             Descripcion: "Producto Servicio"
 *             Pagina: 1
 *     responses:
 *       200:
 *         description: Datos del producto o servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Descripcion:
 *                   type: string
 *                 Pagina:
 *                   type: integer
 *             example:
 *               Descripcion: "Producto Servicio"
 *               Pagina: 1
 */
router.post(
	'/servicio/buscar/descripcion',
	/* schemas.buscarProductosServiciosPorDescripcionSchema, */
	middleware.validateSchema,
	methods.buscarProductosServiciosPorDescripcion,
);

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/palabra:
 *   post:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por palabra similar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Palabra:
 *                 type: string
 *               Pagina:
 *                 type: integer
 *           example:
 *             Palabra: "Producto Servicio"
 *             Pagina: 1
 *     responses:
 *       200:
 *         description: Datos del producto o servicio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 PalabrasSimilares:
 *                   type: string
 *                   example: "Palabra 1"
 *                 Pagina:
 *                   type: integer
 *                   example: 1
 *             example:
 *               PalabrasSimilares: "Palabra 1"
 *               Pagina: 1
 */
router.post(
	'/servicio/buscar/palabra',
	schemas.buscarProductosServiciosPorPalabraSchema,
	middleware.validateSchema,
	methods.buscarProductosServiciosPorPalabra,
);

router.get(
	'/servicio/palabra/:palabra/:pagina?',
	schemas.buscarProductosServiciosPorPalabraSchema,
	middleware.validateSchema,
	methods.buscarProductosServiciosPorPalabra,
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
 *                 type: integer
 *               Descripcion:
 *                 type: string
 *               PalabrasSimilares:
 *                 type: string
 *           example:
 *             ClaveProductoServicio: 101
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
	schemas.crearProductosServiciosSchema,
	middleware.validateSchema,
	methods.crearProductosServicios,
);

/**
 * @swagger
 * /api/v1/productos/servicio:
 *   patch:
 *     tags:
 *       - Productos Servicios
 *     summary: Editar un producto o servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveProductoServicio:
 *                 type: integer
 *               Descripcion:
 *                 type: string
 *               PalabrasSimilares:
 *                 type: string
 *           example:
 *             ClaveProductoServicio: 101
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
	schemas.actualizarProductosServiciosSchema,
	middleware.validateSchema,
	methods.actualizarProductosServicios,
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
 *                 type: integer
 *           example:
 *             ClaveProductoServicio: 101
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
	schemas.borrarProductosServiciosSchema,
	middleware.validateSchema,
	methods.borrarProductosServicios,
);

export default router;