import { Router } from 'express';
import { methods } from '../controllers/linea.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/linea.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Lineas
 *     description: Operaciones relacionadas con las lineas de productos
 */

/**
 * @swagger
 * /api/v1/lineas:
 *   get:
 *     tags:
 *       - Lineas
 *     summary: Obtiene todas las lineas
 *     responses:
 *       200:
 *         description: Lista de lineas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Lineas encontradas"
 *                 lineas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       LineaId:
 *                         type: integer
 *                       SubFamiliaId:
 *                         type: integer
 *                       NombreLinea:
 *                         type: string
 *                       Borrado:
 *                         type: boolean
 *                       BorradoPor:
 *                         type: integer
 *                         nullable: true
 *                       BorradoEn:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       CreadoPor:
 *                         type: integer
 *                       CreadoEn:
 *                         type: string
 *                         format: date-time
 *                       ActualizadoPor:
 *                         type: integer
 *                         nullable: true
 *                       ActualizadoEn:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *             example:
 *               status: "OK"
 *               message: "Lineas encontradas"
 *               lineas:
 *                 - LineaId: 1
 *                   SubFamiliaId: 1
 *                   NombreLinea: "Linea 365"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 2
 *                   SubFamiliaId: 1
 *                   NombreLinea: "Otra linea"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 3
 *                   SubFamiliaId: 1
 *                   NombreLinea: "Otra linea más"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 4
 *                   SubFamiliaId: 2
 *                   NombreLinea: "Linea blanca"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 5
 *                   SubFamiliaId: 2
 *                   NombreLinea: "Linea azul"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 6
 *                   SubFamiliaId: 3
 *                   NombreLinea: "Linea roja"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 7
 *                   SubFamiliaId: 4
 *                   NombreLinea: "Linea verde"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                 - LineaId: 8
 *                   SubFamiliaId: 5
 *                   NombreLinea: "Linea purpura"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *       404:
 *         description: No se encontraron lineas
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
 *                   example: "No se encontraron lineas"
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
 *                   example: "Error al obtener las lineas"
 */
router.get(
    '/',
    methods.obtenerLineas,
);

/**
 * @swagger
 * /api/v1/lineas/nombre/{Nombre}:
 *   get:
 *     tags:
 *       - Lineas
 *     summary: Obtiene líneas por nombre
 *     parameters:
 *       - in: path
 *         name: Nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la línea a buscar
 *     responses:
 *       200:
 *         description: Líneas encontradas con el nombre especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Líneas encontradas con el nombre {Nombre}"
 *                 lineas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       LineaId:
 *                         type: integer
 *                       SubFamiliaId:
 *                         type: integer
 *                       NombreLinea:
 *                         type: string
 *                       Borrado:
 *                         type: boolean
 *                       BorradoPor:
 *                         type: integer
 *                         nullable: true
 *                       BorradoEn:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       CreadoPor:
 *                         type: integer
 *                       CreadoEn:
 *                         type: string
 *                         format: date-time
 *                       ActualizadoPor:
 *                         type: integer
 *                         nullable: true
 *                       ActualizadoEn:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *             example:
 *               status: "OK"
 *               message: "Líneas encontradas con el nombre Linea 365"
 *               lineas:
 *                 - LineaId: 1
 *                   SubFamiliaId: 1
 *                   NombreLinea: "Linea 365"
 *                   Borrado: false
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                   CreadoPor: 1
 *                   CreadoEn: "2024-03-21T20:11:33.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *       404:
 *         description: No se encontraron líneas
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
 *                   example: "No se encontraron líneas"
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
 *                     "El nombre de la línea debe tener entre 3 y 255 caracteres"
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
 *                   example: "Error al buscar la línea"
 */
router.get(
    '/nombre/:NombreLinea',
    schemas.buscarLineasPorNombreSchema,
    middleware.validateSchema,
    methods.buscarLineasPorNombre,
);

/**
 * @swagger
 * /api/v1/lineas/subfamilia/{SubFamiliaId}:
 *   get:
 *     tags:
 *       - Lineas
 *     summary: Obtiene líneas por ID de subfamilia
 *     parameters:
 *       - in: path
 *         name: SubFamiliaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la subfamilia a la que pertenecen las líneas
 *     responses:
 *       200:
 *         description: Líneas encontradas con el ID de subfamilia especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Líneas encontradas con el ID de subfamilia {SubFamiliaId}"
 *                 lineas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       LineaId:
 *                         type: integer
 *                       NombreLinea:
 *                         type: string
 *                       Activo:
 *                         type: boolean
 *                       SubFamiliaId:
 *                         type: integer
 *                       CreadoPor:
 *                         type: integer
 *                       CreadoEn:
 *                         type: string
 *                         format: date-time
 *                       ActualizadoPor:
 *                         type: integer
 *                       ActualizadoEn:
 *                         type: string
 *                         format: date-time
 *                       BorradoPor:
 *                         type: integer
 *                         nullable: true
 *                       BorradoEn:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *             example:
 *               status: "OK"
 *               message: "Líneas encontradas con el ID de subfamilia 456"
 *               lineas:
 *                 - LineaId: 21
 *                   NombreLinea: "Línea 1"
 *                   Activo: true
 *                   SubFamiliaId: 456
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-09-04T00:13:57.000Z"
 *                   ActualizadoPor: 2
 *                   ActualizadoEn: "2024-09-04T00:18:16.000Z"
 *                   BorradoPor: null
 *                   BorradoEn: null
 *       404:
 *         description: No se encontraron líneas
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
 *                   example: "No se encontraron líneas"
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
 *                     "El ID de la subfamilia debe ser un número entero"
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
 *                   example: "Error al buscar las líneas por ID de subfamilia"
 */
router.get(
    '/subfamilia/:SubFamiliaId',
    schemas.buscarLineasPorSubFamiliaIdSchema,
    middleware.validateSchema,
    methods.buscarLineasPorSubFamiliaId,
);

/**
 * @swagger
 * /api/v1/lineas:
 *   post:
 *     tags:
 *       - Lineas
 *     summary: Crea una nueva línea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreLinea:
 *                 type: string
 *               SubFamiliaId:
 *                 type: integer
 *               CreadoPor:
 *                 type: integer
 *           example:
 *             NombreLinea: "LineaTest 1"
 *             SubFamiliaId: 456
 *             CreadoPor: 1
 *     responses:
 *       200:
 *         description: Línea creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 linea:
 *                   type: object
 *                   properties:
 *                     LineaId:
 *                       type: integer
 *                     NombreLinea:
 *                       type: string
 *                     SubFamiliaId:
 *                       type: integer
 *                     CreadoPor:
 *                       type: integer
 *                     CreadoEn:
 *                       type: string
 *                       format: date-time
 *             example:
 *               status: "OK"
 *               message: "Línea creada"
 *               linea:
 *                 LineaId: 301
 *                 NombreLinea: "LineaTest 1"
 *                 SubFamiliaId: 456
 *                 CreadoPor: 1
 *                 CreadoEn: "2024-09-04T14:23:00.000Z"
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
 *                     "El campo 'NombreLinea' es obligatorio"
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
 *                   example: "Error al crear la línea"
 */
router.post(
    '/',
    schemas.crearLineaSchema,
    middleware.validateSchema,
    methods.crearLinea,
);

/**
 * @swagger
 * /api/v1/lineas:
 *   patch:
 *     summary: Actualizar una línea existente
 *     description: Permite actualizar los detalles de una línea específica mediante su LineaId.
 *     tags:
 *       - Lineas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LineaId:
 *                 type: integer
 *               NombreLinea:
 *                 type: string
 *               SubFamiliaId:
 *                 type: integer
 *               ActualizadoPor:
 *                 type: integer
 *             example:
 *               LineaId: 301
 *               NombreLinea: "Nuevo Nombre de Línea"
 *               SubFamiliaId: 456
 *               ActualizadoPor: 2
 *     responses:
 *       200:
 *         description: Línea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Línea actualizada"
 *                 linea:
 *                   type: object
 *                   properties:
 *                     LineaId:
 *                       type: integer
 *                     NombreLinea:
 *                       type: string
 *                     SubFamiliaId:
 *                       type: integer
 *                     Borrado:
 *                       type: boolean
 *                     CreadoPor:
 *                       type: integer
 *                     ActualizadoPor:
 *                       type: integer
 *                     CreadoEn:
 *                       type: string
 *                       format: date-time
 *                     ActualizadoEn:
 *                       type: string
 *                       format: date-time
 *             example:
 *               status: "OK"
 *               message: "Línea actualizada"
 *               linea:
 *                 LineaId: 301
 *                 NombreLinea: "Nuevo Nombre de Línea"
 *                 SubFamiliaId: 456
 *                 Borrado: false
 *                 CreadoPor: 1
 *                 ActualizadoPor: 2
 *                 CreadoEn: "2024-09-04T14:23:00.000Z"
 *                 ActualizadoEn: "2024-09-05T10:15:30.000Z"
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
 *                     "El campo 'NombreLinea' es obligatorio"
 *                   ]
 *       404:
 *         description: Línea no encontrada
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
 *                   example: "Línea no encontrada"
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
 *                   example: "Error al actualizar la línea"
 */
router.patch(
    '/',
    schemas.actualizarLineaSchema,
    middleware.validateSchema,
    methods.actualizarLinea,
);

/**
 * @swagger
 * /api/v1/lineas:
 *   delete:
 *     summary: Eliminar una línea existente
 *     description: Permite realizar un soft delete de una línea específica mediante su LineaId.
 *     tags:
 *       - Lineas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LineaId:
 *                 type: integer
 *               BorradoPor:
 *                 type: integer
 *             example:
 *               LineaId: 301
 *               BorradoPor: 1
 *     responses:
 *       200:
 *         description: Línea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Línea eliminada"
 *       404:
 *         description: Línea no encontrada
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
 *                   example: "Línea no encontrada"
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
 *                   example: "Error al eliminar la línea"
 */
router.delete(
    '/',
    schemas.borrarLineaSchema,
    middleware.validateSchema,
    methods.borrarLinea,
);

export default router;