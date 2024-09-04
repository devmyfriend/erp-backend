import { Router } from 'express';
import { methods } from '../controllers/subfamilia.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/subfamilia.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Subfamilias
 *     description: Operaciones relacionadas con las subfamilias de productos
 */

/**
 * @swagger
 * /api/v1/subfamilias:
 *   get:
 *     tags:
 *       - Subfamilias
 *     summary: Obtiene todas las subfamilias
 *     responses:
 *       200:
 *         description: Lista de subfamilias
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
 *                   example: "Subfamilias encontradas"
 *                 subfamilias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       SubFamiliaId:
 *                         type: integer
 *                       NombreSubFamilia:
 *                         type: string
 *                       Activo:
 *                         type: boolean
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
 *                       BorradoPor:
 *                         type: integer
 *                         nullable: true
 *                       BorradoEn:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *             example:
 *               status: "OK"
 *               message: "Subfamilias encontradas"
 *               subfamilias:
 *                 - SubFamiliaId: 1
 *                   NombreSubFamilia: "subfamilia 1"
 *                   Activo: true
 *                   FamiliaId: 11
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-03-19T03:00:03.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                 - SubFamiliaId: 2
 *                   NombreSubFamilia: "subfamilia 2 modificado 2"
 *                   Activo: true
 *                   FamiliaId: 11
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-03-19T03:00:16.000Z"
 *                   ActualizadoPor: 1
 *                   ActualizadoEn: "2024-03-19T03:23:13.000Z"
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                 # Agrega más ejemplos según sea necesario...
 *       404:
 *         description: No se encontraron subfamilias
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
 *                   example: "No se encontraron subfamilias"
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
 *                   example: "Error al obtener las subfamilias"
 */
router.get(
    '/',
    methods.obtenerSubfamilias,
);

/**
 * @swagger
 * /api/v1/subfamilias/nombre/{Nombre}:
 *   get:
 *     tags:
 *       - Subfamilias
 *     summary: Obtiene subfamilias por nombre
 *     parameters:
 *       - in: path
 *         name: Nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la subfamilia a buscar
 *     responses:
 *       200:
 *         description: Subfamilias encontradas con el nombre especificado
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
 *                   example: "Subfamilias encontradas con el nombre {Nombre}"
 *                 subfamilias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       SubFamiliaId:
 *                         type: integer
 *                       NombreSubFamilia:
 *                         type: string
 *                       Activo:
 *                         type: boolean
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
 *               message: "Subfamilias encontradas con el nombre chan"
 *               subfamilias:
 *                 - SubFamiliaId: 11
 *                   NombreSubFamilia: "Subfamilia Chan"
 *                   Activo: false
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-09-04T00:13:57.000Z"
 *                   ActualizadoPor: 2
 *                   ActualizadoEn: "2024-09-04T00:18:16.000Z"
 *                   BorradoPor: null
 *                   BorradoEn: null
 *       404:
 *         description: No se encontraron subfamilias
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
 *                   example: "No se encontraron subfamilias"
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
 *                     "El nombre de la subfamilia debe tener entre 3 y 255 caracteres"
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
 *                   example: "Error al buscar la subfamilia"
 */
router.get(
    '/nombre/:NombreSubFamilia',
    schemas.buscarSubfamiliasPorNombreSchema,
    middleware.validateSchema,
    methods.buscarSubfamiliasPorNombre,
);

/**
 * @swagger
 * /api/v1/subfamilias/familia/{FamiliaId}:
 *   get:
 *     tags:
 *       - Subfamilias
 *     summary: Obtiene subfamilias por ID de familia
 *     parameters:
 *       - in: path
 *         name: FamiliaId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la familia a la que pertenecen las subfamilias
 *     responses:
 *       200:
 *         description: Subfamilias encontradas con el ID de familia especificado
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
 *                   example: "Subfamilias encontradas con el ID de familia {FamiliaId}"
 *                 subfamilias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       SubFamiliaId:
 *                         type: integer
 *                       NombreSubFamilia:
 *                         type: string
 *                       Activo:
 *                         type: boolean
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
 *               message: "Subfamilias encontradas con el ID de familia 123"
 *               subfamilias:
 *                 - SubFamiliaId: 11
 *                   NombreSubFamilia: "Subfamilia 1"
 *                   Activo: true
 *                   FamiliaId: 11
 *                   CreadoPor: 2
 *                   CreadoEn: "2022-01-01T00:00:00.000Z"
 *                   ActualizadoPor: 2
 *                   ActualizadoEn: "2022-01-01T00:00:00.000Z"
 *                   BorradoPor: null
 *                   BorradoEn: null
 *       404:
 *         description: No se encontraron subfamilias
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
 *                   example: "No se encontraron subfamilias"
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
 *                     "El ID de la familia debe ser un número entero"
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
 *                   example: "Error al buscar las subfamilias por ID de familia"
 */
router.get(
    '/familia/:FamiliaId',
    schemas.buscarSubfamiliasPorFamiliaIdSchema,
    middleware.validateSchema,
    methods.buscarSubfamiliasPorFamiliaId,
);

/**
 * @swagger
 * /api/v1/subfamilias:
 *   post:
 *     tags:
 *       - Subfamilias
 *     summary: Crea una nueva subfamilia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreSubFamilia:
 *                 type: string
 *               FamiliaId:
 *                 type: integer
 *               CreadoPor:
 *                 type: string
 *           example:
 *             NombreSubFamilia: "SubfamiliaTest 1"
 *             FamiliaId: 123
 *             CreadoPor: "1"
 *     responses:
 *       200:
 *         description: Subfamilia creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 subfamilia:
 *                   type: object
 *                   properties:
 *                     SubFamiliaId:
 *                       type: integer
 *                     NombreSubFamilia:
 *                       type: string
 *                     FamiliaId:
 *                       type: integer
 *                     CreadoPor:
 *                       type: integer
 *                     CreadoEn:
 *                       type: string
 *                       format: date-time
 *             example:
 *               status: "OK"
 *               message: "Subfamilia creada"
 *               subfamilia:
 *                 SubFamiliaId: 205
 *                 NombreSubFamilia: "SubamiliaTest 1"
 *                 FamiliaId: 7
 *                 CreadoPor: 1
 *                 CreadoEn: "2024-02-06T13:59:58.000Z"
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
 *                     "El campo 'NombreSubFamilia' es obligatorio"
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
 *                   example: "Error al crear la subfamilia"
 */
router.post(
    '/',
    schemas.crearSubfamiliaSchema,
    middleware.validateSchema,
    methods.crearSubfamilia,
);

/**
 * @swagger
 * /api/v1/subfamilias:
 *   patch:
 *     summary: Actualizar una subfamilia existente
 *     description: Permite actualizar los detalles de una subfamilia específica mediante su SubFamiliaId.
 *     tags:
 *       - Subfamilias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SubFamiliaId:
 *                 type: integer
 *               NombreSubFamilia:
 *                 type: string
 *               FamiliaId:
 *                 type: integer
 *               ActualizadoPor:
 *                 type: integer
 *             example:
 *               SubFamiliaId: 205
 *               NombreSubFamilia: "Nuevo Nombre de Subfamilia"
 *               FamiliaId: 7
 *               ActualizadoPor: 2
 *     responses:
 *       200:
 *         description: Subfamilia actualizada exitosamente
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
 *                   example: "Subfamilia actualizada"
 *                 subfamilia:
 *                   type: object
 *                   properties:
 *                     SubFamiliaId:
 *                       type: integer
 *                     NombreSubFamilia:
 *                       type: string
 *                     FamiliaId:
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
 *               message: "Subfamilia actualizada"
 *               subfamilia:
 *                 SubFamiliaId: 205
 *                 NombreSubFamilia: "Nuevo Nombre de Subfamilia"
 *                 FamiliaId: 7
 *                 Borrado: false
 *                 CreadoPor: 1
 *                 ActualizadoPor: 2
 *                 CreadoEn: "2024-02-06T13:59:58.000Z"
 *                 ActualizadoEn: "2024-02-07T15:30:22.000Z"
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
 *                     "El campo 'Nombre' es obligatorio"
 *                   ]
 *       404:
 *         description: Subfamilia no encontrada
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
 *                   example: "Subfamilia no encontrada"
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
 *                   example: "Error al actualizar la subfamilia"
 */
router.patch(
    '/',
    schemas.actualizarSubfamiliaSchema,
    middleware.validateSchema,
    methods.actualizarSubfamilia,
);

/**
 * @swagger
 * /api/v1/subfamilias:
 *   delete:
 *     summary: Eliminar una subfamilia existente
 *     description: Permite realizar un soft delete de una subfamilia específica mediante su SubFamiliaId.
 *     tags:
 *       - Subfamilias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SubFamiliaId:
 *                 type: integer
 *               BorradoPor:
 *                 type: integer
 *             example:
 *               SubFamiliaId: 205
 *               BorradoPor: 1
 *     responses:
 *       200:
 *         description: Subfamilia eliminada exitosamente
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
 *                   example: "Subfamilia eliminada"
 *       404:
 *         description: Subfamilia no encontrada
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
 *                   example: "Subfamilia no encontrada"
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
 *                   example: "Error al eliminar la subfamilia"
 */
router.delete(
    '/',
    schemas.borrarSubfamiliaSchema,
    middleware.validateSchema,
    methods.borrarSubfamilia,
);

export default router;