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
 *                 data:
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
 *                           ID:
 *                             type: integer
 *                           Nombre:
 *                             type: string
 *                           Borrado:
 *                             type: integer
 *                             description: Estado de borrado de la ubicación (0 no borrado, 1 borrado)
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta
 *                 value:
 *                   status: "OK"
 *                   message: "Ubicaciones encontradas"
 *                   data:
 *                     TotalRegistros: 100
 *                     PaginaActual: 1
 *                     TotalPaginas: 10
 *                     Datos:
 *                       - ID: 1
 *                         Nombre: "Ubicación Central"
 *                         Borrado: 0
 *       404:
 *         description: No se encontraron ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
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
 *                 Error:
 *                   type: string
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ID:
 *                             type: integer
 *                           Nombre:
 *                             type: string
 *             example:
 *               status: "OK"
 *               message: "Ubicaciones encontradas con el nombre NombreEjemplo"
 *               data:
 *                 totalItems: 5
 *                 totalPages: 1
 *                 currentPage: 1
 *                 items:
 *                   - ID: 1
 *                     Nombre: "NombreEjemplo"
 *       404:
 *         description: No se encontraron ubicaciones
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
 *               message: "No se encontraron ubicaciones"
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     Nombre:
 *                       type: string
 *                     CreadoPor:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Ubicación creada correctamente"
 *               data:
 *                 id: 10
 *                 Nombre: "Colosio 1"
 *                 CreadoPor: "1"
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
 *               error: "La ubicación ya existe"
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
 *                 data:
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
 *               data:
 *                 UbicacionId: 1
 *                 Nombre: "Ubicación Actualizada"
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
 *                 error:
 *                   type: string
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
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   type: object
 *                   properties:
 *                     UbicacionId:
 *                       type: integer
 *             example:
 *               message: "Ubicación eliminada"
 *               ubicacion:
 *                 UbicacionId: 1
 */
router.delete(
	'/',
	schemas.borrarUbicacionesSchema,
	middleware.validateSchema,
	methods.borrarUbicaciones,
);

export default router;
