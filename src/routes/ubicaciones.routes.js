import { Router } from 'express';
import { methods } from '../controllers/ubicaciones.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/ubicaciones.js';
const router = Router();

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   get:
 *     tags:
 *       - Ubicaciones
 *     summary: Obtiene todas las ubicaciones
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Número de página (default 1)
 *     responses:
 *       200:
 *         description: Lista de ubicaciones paginadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 ubicaciones:
 *                   type: object
 *                   properties:
 *                     TotalRegistros:
 *                       type: integer
 *                     PaginaActual:
 *                       type: integer
 *                     TotalPaginas:
 *                       type: integer
 *                     Datos:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           UbicacionId:
 *                             type: integer
 *                           Nombre:
 *                             type: string
 *                           Borrado:
 *                             type: boolean
 *                           CreadoPor:
 *                             type: integer
 *                           ActualizadoPor:
 *                             type: integer
 *                           BorradoPor:
 *                             type: integer
 *                           BorradoEn:
 *                             type: string
 *                             format: date-time
 *                           CreadoEn:
 *                             type: string
 *                             format: date-time
 *                           ActualizadoEn:
 *                             type: string
 *                             format: date-time
 *             example:
 *               status: "OK"
 *               message: "Ubicaciones encontradas"
 *               ubicaciones:
 *                 TotalRegistros: 18
 *                 PaginaActual: 1
 *                 TotalPaginas: 9
 *                 Datos:
 *                   - UbicacionId: 101
 *                     Nombre: "Ubicación 1"
 *                     Borrado: false
 *                     CreadoPor: 1
 *                     ActualizadoPor: 0
 *                     BorradoPor: 1
 *                     BorradoEn: "2024-02-06T13:59:58.000Z"
 *                     CreadoEn: null
 *                     ActualizadoEn: null
 *                   - UbicacionId: 102
 *                     Nombre: "Colosio 32"
 *                     Borrado: false
 *                     CreadoPor: 1
 *                     ActualizadoPor: 1
 *                     BorradoPor: 1
 *                     BorradoEn: "2024-02-06T13:59:58.000Z"
 *                     CreadoEn: null
 *                     ActualizadoEn: null
 *       404:
 *         description: No se encontraron ubicaciones
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
 *                   example: "No se encontraron ubicaciones"
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
 *                 Error:
 *                   type: string
 *                   example: "Error al obtener las ubicaciones"
 */
router.get(
    '/',
    schemas.obtenerUbicacionesSchema,
    middleware.validateSchema,
    methods.obtenerUbicaciones,
);

/**
 * @swagger
 * /api/v1/ubicaciones/nombre/{Nombre}:
 *   get:
 *     tags:
 *       - Ubicaciones
 *     summary: Obtiene ubicaciones por nombre
 *     parameters:
 *       - in: path
 *         name: Nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la ubicación a buscar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Número de página para paginación (opcional, default 1)
 *     responses:
 *       200:
 *         description: Ubicaciones encontradas con el nombre especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 ubicaciones:
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
 *                               UbicacionId:
 *                                 type: integer
 *                               Nombre:
 *                                 type: string
 *                               Borrado:
 *                                 type: boolean
 *                               CreadoPor:
 *                                 type: integer
 *                               ActualizadoPor:
 *                                 type: integer
 *                               BorradoPor:
 *                                 type: integer
 *                               BorradoEn:
 *                                 type: string
 *                                 format: date-time
 *                               CreadoEn:
 *                                 type: string
 *                                 format: date-time
 *                               ActualizadoEn:
 *                                 type: string
 *                                 format: date-time
 *             example:
 *               status: "OK"
 *               message: "Ubicaciones encontradas con el nombre Colo"
 *               ubicaciones:
 *                 existe: true
 *                 data:
 *                   TotalRegistros: 6
 *                   PaginaActual: 2
 *                   TotalPaginas: 3
 *                   Datos:
 *                     - UbicacionId: 104
 *                       Nombre: "colosiotestin"
 *                       Borrado: false
 *                       CreadoPor: 1
 *                       ActualizadoPor: 4
 *                       BorradoPor: null
 *                       BorradoEn: null
 *                       CreadoEn: null
 *                       ActualizadoEn: null
 *                     - UbicacionId: 105
 *                       Nombre: "colosiotestin"
 *                       Borrado: false
 *                       CreadoPor: 2
 *                       ActualizadoPor: 1
 *                       BorradoPor: 8
 *                       BorradoEn: null
 *                       CreadoEn: null
 *                       ActualizadoEn: null
 *       404:
 *         description: No se encontraron ubicaciones
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
 *                   example: "No se encontraron ubicaciones"
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
 *                     "El nombre de la ubicación debe tener entre 3 y 255 caracteres",
 *                     "La página debe ser un número entero mayor o igual a 1"
 *                   ]
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
 *                   example: "Error al buscar la ubicación"
 */
router.get(
    '/nombre/:Nombre',
    schemas.buscarUbicacionesPorNombreSchema,
    middleware.validateSchema,
    methods.buscarUbicacionesPorNombre,
);

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   post:
 *     tags:
 *       - Ubicaciones
 *     summary: Crea una nueva ubicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               CreadoPor:
 *                 type: string
 *           example:
 *             Nombre: "Colosio 1"
 *             CreadoPor: "1"
 *     responses:
 *       200:
 *         description: Ubicación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   type: object
 *                   properties:
 *                     UbicacionId:
 *                       type: integer
 *                     Nombre:
 *                       type: string
 *                     CreadoPor:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Ubicación creada correctamente"
 *               ubicacion:
 *                 UbicacionId: 119
 *                 Nombre: "Colosio 2"
 *                 CreadoPor: "2"
 *       409:
 *         description: La ubicación ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 error:
 *                   type: string
 *             example:
 *               status: 409
 *               error: "El nombre de la ubicación ya existe"
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
 *                     "El nombre de la ubicación es requerido"
 *                   ]
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
 *                   example: "Error al crear la ubicación"
 */
router.post(
    '/',
    schemas.crearUbicacionSchema,
    middleware.validateSchema,
    methods.crearUbicacion,
);

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   patch:
 *     tags:
 *       - Ubicaciones
 *     summary: Actualiza una ubicación existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UbicacionId:
 *                 type: integer
 *                 description: Identificador único de la ubicación
 *               Nombre:
 *                 type: string
 *                 description: Nombre nuevo o actualizado de la ubicación
 *               ActualizadoPor:
 *                 type: string
 *                 description: Identificador del usuario que actualiza la ubicación
 *           example:
 *             UbicacionId: 1
 *             Nombre: "Ubicación Actualizada"
 *             ActualizadoPor: "2"
 *     responses:
 *       200:
 *         description: Ubicación actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   type: object
 *                   properties:
 *                     UbicacionId:
 *                       type: integer
 *                     Nombre:
 *                       type: string
 *                     ActualizadoPor:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Ubicación actualizada correctamente"
 *               ubicacion:
 *                 UbicacionId: 119
 *                 Nombre: "Colosio reconstruido"
 *                 ActualizadoPor: "2"
 *       404:
 *         description: La ubicación no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 error:
 *                   type: string
 *             example:
 *               status: 404
 *               error: "La ubicación no existe"
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
 *                     "El nombre de la ubicación es requerido"
 *                   ]
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
 *                   example: "Error al actualizar la ubicación"
 */
router.patch(
    '/',
    schemas.actualizarUbicacionesSchema,
    middleware.validateSchema,
    methods.actualizarUbicaciones,
);

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   delete:
 *     tags:
 *       - Ubicaciones
 *     summary: Elimina una ubicación existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UbicacionId:
 *                 type: integer
 *               BorradoPor:
 *                 type: string
 *           example:
 *             UbicacionId: 1
 *             BorradoPor: "1"
 *     responses:
 *       200:
 *         description: Ubicación eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   type: integer
 *             example:
 *               status: "OK"
 *               message: "Ubicación borrada correctamente"
 *               ubicacion: 119
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
 *                     "El usuario que borra es requerido",
 *                     "El usuario que borra debe ser un número entero"
 *                   ]
 *       404:
 *         description: La ubicación no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 error:
 *                   type: string
 *             example:
 *               status: 404
 *               error: "La ubicación no existe"
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
 *                   example: "Error al borrar la ubicación"
 */
router.delete(
    '/',
    schemas.borrarUbicacionesSchema,
    middleware.validateSchema,
    methods.borrarUbicaciones,
);

export default router;
