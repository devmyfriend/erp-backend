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
 *                 productosServicios:
 *                   type: object
 *                   properties:
 *                     existe:
 *                       type: boolean
 *                     data:
 *                       type: object
 *                       properties:
 *                         TotalRegistros:
 *                           type: integer
 *                         PaginaActual:
 *                           type: integer
 *                         TotalPaginas:
 *                           type: integer
 *                         Datos:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               ClaveProductoServicio:
 *                                 type: string
 *                               Descripcion:
 *                                 type: string
 *                               PalabrasSimilares:
 *                                 type: string
 *                               Activo:
 *                                 type: boolean
 *             example:
 *               status: "OK"
 *               message: "Productos/Servicios encontrados con la descripción prod"
 *               productosServicios:
 *                 existe: true
 *                 data:
 *                   TotalRegistros: 3
 *                   PaginaActual: 1
 *                   TotalPaginas: 2
 *                   Datos:
 *                     - ClaveProductoServicio: "102"
 *                       Descripcion: "Producto Servicio"
 *                       PalabrasSimilares: "Palabra 1"
 *                       Activo: true
 *                     - ClaveProductoServicio: "101"
 *                       Descripcion: "Producto Servicio"
 *                       PalabrasSimilares: "Palabra 1"
 *                       Activo: true
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error de validación"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "La página debe ser un número entero mayor o igual a 1"
 *                   ]
 *       404:
 *         description: No se encontraron productos/servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "No se encontraron productos/servicios"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
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
 *                 productosServicios:
 *                   type: object
 *                   properties:
 *                     existe:
 *                       type: boolean
 *                     data:
 *                       type: object
 *                       properties:
 *                         TotalRegistros:
 *                           type: integer
 *                         PaginaActual:
 *                           type: integer
 *                         TotalPaginas:
 *                           type: integer
 *                         Datos:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               ClaveProductoServicio:
 *                                 type: string
 *                               Descripcion:
 *                                 type: string
 *                               PalabrasSimilares:
 *                                 type: string
 *                               Activo:
 *                                 type: boolean
 *             example:
 *               status: "OK"
 *               message: "'Productos/Servicios encontrados con la palabra pala"
 *               productosServicios:
 *                 existe: true
 *                 data:
 *                   TotalRegistros: 3
 *                   PaginaActual: 1
 *                   TotalPaginas: 2
 *                   Datos:
 *                     - ClaveProductoServicio: "1013"
 *                       Descripcion: "SERVICIO 1"
 *                       PalabrasSimilares: "Palabra 1"
 *                       Activo: true
 *                     - ClaveProductoServicio: "102"
 *                       Descripcion: "Producto Servicio"
 *                       PalabrasSimilares: "Palabra 1"
 *                       Activo: true
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error de validación"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "La página debe ser un número entero mayor o igual a 1"
 *                   ]
 *       404:
 *         description: No se encontraron productos/servicios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "No se encontraron productos/servicios"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
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
 *                 productoServicio:
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
 *               productoServicio:
 *                 ClaveProductoServicio: 922
 *                 Descripcion: "Producto Servicio ZAZAZA"
 *                 PalabrasSimilares: "ZAZAZA"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error de validación"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "La descripción no puede estar vacía"
 *                   ]
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
 *               status: "Error"
 *               message: "La clave del producto/servicio ya está en uso"
 *       500:
 *         description: Error interno del servidor
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
 *               message: "Error interno del servidor"
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
 *                 productoServicio:
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
 *               productoServicio:
 *                 ClaveProductoServicio: 922
 *                 Descripcion: "Producto Servicio ZAZAZA"
 *                 PalabrasSimilares: "ZAZA FLACO"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error de validación"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "La clave del producto o servicio debe tener entre 1 y 8 caracteres"
 *                   ]
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
 *       500:
 *         description: Error interno del servidor
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
 *               message: "Error interno del servidor"
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
 *                 productoServicio:
 *                   type: array
 *                   items:
 *                     type: integer
 *             example:
 *               status: "OK"
 *               message: "Producto/Servicio borrado"
 *               productoServicio: [1]
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
 *       500:
 *         description: Error interno del servidor
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
 *               message: "Error interno del servidor"
 */
router.delete(
    '/servicio',
    schemas.borrarProductosServiciosSchema,
    middleware.validateSchema,
    methods.borrarProductosServicios,
);

export default router;