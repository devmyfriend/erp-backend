import { Router }  from 'express'
import { methods } from '../controllers/satProductosServicios.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/productosServicios.js';
import { param } from 'express-validator'; /* Borrar cuando se mueva al schema */
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
	param('code')
	.notEmpty()
	.withMessage('El código del producto o servicio no puede estar vacio')
    .isInt()
    .withMessage('El código del producto o servicio tiene que ser un numero entero')
    .matches(/^\S*$/)
    .withMessage('El código del producto o servicio no puede contener espacios'),	
	middleware.validateSchema,
	methods.buscarProductosServiciosPorClave,
);

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/descripcion/{descripcion}:
 *   get:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por su descripción con paginación
 *     parameters:
 *       - in: path
 *         name: descripcion
 *         required: true
 *         schema:
 *           type: string
 *         description: Descripción del producto o servicio a buscar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación (opcional)
 *     responses:
 *       200:
 *         description: Datos del producto o servicio encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *             example:
 *               status: "OK"
 *               message: "Productos/Servicios encontrados con la descripción Producto Servicio"
 *               data:
 *                 totalItems: 2
 *                 items:
 *                   - id: 1
 *                     name: Producto 1
 *                     description: "Descripción del producto 1"
 *                   - id: 2
 *                     name: Producto 2
 *                     description: "Descripción del producto 2"
 *       404:
 *         description: No se encontraron productos/servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "Error"
 *               message: "No se encontraron productos/servicios con esa descripción"
 */
router.get(
	'/servicio/buscar/descripcion/:descripcion',
	schemas.buscarProductosServiciosPorDescripcionSchema,
	middleware.validateSchema,
	methods.buscarProductosServiciosPorDescripcion,
);

/**
 * @swagger
 * /api/v1/productos/servicio/buscar/palabra/{palabra}:
 *   get:
 *     tags:
 *       - Productos Servicios
 *     summary: Busca un producto o servicio por palabra similar con paginación
 *     parameters:
 *       - in: path
 *         name: palabra
 *         required: true
 *         schema:
 *           type: string
 *         description: Palabra similar del producto o servicio a buscar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación (opcional)
 *     responses:
 *       200:
 *         description: Datos del producto o servicio encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *             example:
 *               status: "OK"
 *               message: "Productos/Servicios encontrados con la palabra Producto Servicio"
 *               data:
 *                 totalItems: 2
 *                 items:
 *                   - id: 1
 *                     name: Producto 1
 *                     description: "Descripción del producto 1"
 *                   - id: 2
 *                     name: Producto 2
 *                     description: "Descripción del producto 2"
 *       404:
 *         description: No se encontraron productos/servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "Error"
 *               message: "No se encontraron productos/servicios con esa palabra"
 */
router.get(
	'/servicio/buscar/palabra/:palabra',
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
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     ClaveProductoServicio:
 *                       type: integer
 *                     Descripcion:
 *                       type: string
 *                     PalabrasSimilares:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Producto/Servicio creado"
 *               data:
 *                 ClaveProductoServicio: 101
 *                 Descripcion: "Producto Servicio"
 *                 PalabrasSimilares: "Palabra 1"
 *       409:
 *         description: La clave del producto/servicio ya está en uso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "OK"
 *               message: "La clave del producto/servicio ya está en uso"
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
 *         description: Producto/Servicio actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     ClaveProductoServicio:
 *                       type: integer
 *                     Descripcion:
 *                       type: string
 *                     PalabrasSimilares:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Producto/Servicio actualizado"
 *               data:
 *                 ClaveProductoServicio: 101
 *                 Descripcion: "Producto Servicio"
 *                 PalabrasSimilares: "Palabra 1"
 *       404:
 *         description: Producto/Servicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "Error"
 *               message: "Producto/Servicio no encontrado"
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
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "OK"
 *               message: "Producto/Servicio borrado"
 *       404:
 *         description: Producto/Servicio no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "Error"
 *               message: "Producto/Servicio no encontrado"
 */
router.delete(
	'/servicio',
	schemas.borrarProductosServiciosSchema,
	middleware.validateSchema,
	methods.borrarProductosServicios,
);

export default router;