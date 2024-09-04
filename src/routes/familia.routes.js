import { Router } from 'express';
import { methods } from '../controllers/familia.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/familia.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Familias
 *     description: Operaciones relacionadas con las familias de productos
 */

/**
 * @swagger
 * /api/v1/familias:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtiene todas las familias
 *     responses:
 *       200:
 *         description: Lista de familias
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
 *                   example: "Familias encontradas"
 *                 familias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FamiliaId:
 *                         type: integer
 *                       NombreFamilia:
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
 *               message: "Familias encontradas"
 *               familias:
 *                 - FamiliaId: 1
 *                   NombreFamilia: "familia 1"
 *                   Activo: true
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-03-19T03:00:03.000Z"
 *                   ActualizadoPor: null
 *                   ActualizadoEn: null
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                 - FamiliaId: 2
 *                   NombreFamilia: "familia 2 modificado 2"
 *                   Activo: true
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-03-19T03:00:16.000Z"
 *                   ActualizadoPor: 1
 *                   ActualizadoEn: "2024-03-19T03:23:13.000Z"
 *                   BorradoPor: null
 *                   BorradoEn: null
 *                 # Agrega más ejemplos según sea necesario...
 *       404:
 *         description: No se encontraron familias
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
 *                   example: "No se encontraron familias"
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
 *                   example: "Error al obtener las familias"
 */
router.get(
    '/',
    methods.obtenerFamilias,
);

/**
 * @swagger
 * /api/v1/familias/nombre/{Nombre}:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtiene familias por nombre
 *     parameters:
 *       - in: path
 *         name: Nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la familia a buscar
 *     responses:
 *       200:
 *         description: Familias encontradas con el nombre especificado
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
 *                   example: "Familias encontradas con el nombre {Nombre}"
 *                 familias:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       FamiliaId:
 *                         type: integer
 *                       NombreFamilia:
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
 *               message: "Familias encontradas con el nombre chan"
 *               familias:
 *                 - FamiliaId: 11
 *                   NombreFamilia: "Familia Chan"
 *                   Activo: false
 *                   CreadoPor: 2
 *                   CreadoEn: "2024-09-04T00:13:57.000Z"
 *                   ActualizadoPor: 2
 *                   ActualizadoEn: "2024-09-04T00:18:16.000Z"
 *                   BorradoPor: null
 *                   BorradoEn: null
 *       404:
 *         description: No se encontraron familias
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
 *                   example: "No se encontraron familias"
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
 *                     "El nombre de la familia debe tener entre 3 y 255 caracteres"
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
 *                   example: "Error al buscar la familia"
 */
router.get(
    '/nombre/:NombreFamilia',
    schemas.buscarFamiliasPorNombreSchema,
    middleware.validateSchema,
    methods.buscarFamiliasPorNombre,
);

/**
 * @swagger
 * /api/v1/familias:
 *   post:
 *     tags:
 *       - Familias
 *     summary: Crea una nueva familia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreFamilia:
 *                 type: string
 *               CreadoPor:
 *                 type: string
 *           example:
 *             NombreFamilia: "FamiliaTest 1"
 *             CreadoPor: "1"
 *     responses:
 *       200:
 *         description: Familia creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 familia:
 *                   type: object
 *                   properties:
 *                     FamiliaId:
 *                       type: integer
 *                     NombreFamilia:
 *                     CreadoPor:
 *                       type: integer
 *                     CreadoEn:
 *                       type: string
 *                       format: date-time
 *             example:
 *               status: "OK"
 *               message: "Familia creada"
 *               familia:
 *                 FamiliaId: 205
 *                 NombreFamilia: "FamiliaTest 1"
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
 *                     "El campo 'Nombre' es obligatorio"
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
 *                   example: "Error al crear la familia"
 */
router.post(
    '/',
    schemas.crearFamiliaSchema,
    middleware.validateSchema,
    methods.crearFamilia,
);

/**
 * @swagger
 * /api/v1/familias:
 *   patch:
 *     summary: Actualizar una familia existente
 *     description: Permite actualizar los detalles de una familia específica mediante su FamiliaId.
 *     tags:
 *       - Familias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FamiliaId:
 *                 type: integer
 *               NombreFamilia:
 *                 type: string
 *               ActualizadoPor:
 *                 type: integer
 *             example:
 *               FamiliaId: 205
 *               NombreFamilia: "Nuevo Nombre de Familia"
 *               ActualizadoPor: 2
 *     responses:
 *       200:
 *         description: Familia actualizada exitosamente
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
 *                   example: "Familia actualizada"
 *                 familia:
 *                   type: object
 *                   properties:
 *                     FamiliaId:
 *                       type: integer
 *                     NombreFamilia:
 *                       type: string
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
 *               message: "Familia actualizada"
 *               familia:
 *                 FamiliaId: 205
 *                 NombreFamilia: "Nuevo Nombre de Familia"
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
 *         description: Familia no encontrada
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
 *                   example: "Familia no encontrada"
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
 *                   example: "Error al actualizar la familia"
 */
router.patch(
    '/',
    schemas.actualizarFamiliaSchema,
    middleware.validateSchema,
    methods.actualizarFamilia,
);

/**
 * @swagger
 * /api/v1/familias:
 *   delete:
 *     summary: Eliminar una familia existente
 *     description: Permite realizar un soft delete de una familia específica mediante su FamiliaId.
 *     tags:
 *       - Familias
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FamiliaId:
 *                 type: integer
 *               BorradoPor:
 *                 type: integer
 *             example:
 *               FamiliaId: 205
 *               BorradoPor: 1
 *     responses:
 *       200:
 *         description: Familia eliminada exitosamente
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
 *                   example: "Familia eliminada"
 *       404:
 *         description: Familia no encontrada
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
 *                   example: "Familia no encontrada"
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
 *                   example: "Error al eliminar la familia"
 */
router.delete(
    '/',
    schemas.borrarFamiliaSchema,
    middleware.validateSchema,
    methods.borrarFamilia,
);

export default router;
