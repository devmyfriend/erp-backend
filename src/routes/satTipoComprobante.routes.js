import { Router } from 'express';
import { methods } from '../controllers/satTipoComprobante.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/tipoComprobante.js';
const router = Router();

/**
 * @swagger
 * /api/v1/comprobante:
 *   get:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Obtener todos los tipos de comprobante
 *     responses:
 *       200:
 *         description: Tipos de comprobante encontrados
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
 *                   example: "Tipos de comprobante encontrados"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ClaveTipoDeComprobante:
 *                         type: string
 *                         example: "I"
 *                       Descripcion:
 *                         type: string
 *                         example: "Egreso"
 *                       Borrado:
 *                         type: boolean
 *                         example: false
 *       404:
 *         description: No se encontraron tipos de comprobante
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
 *                   example: "No se encontraron tipos de comprobante"
 *       500:
 *         description: Error al obtener los tipos de comprobante
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
 *                   example: "Error al obtener los tipos de comprobante"
 *                 Error:
 *                   type: string
 *                   example: "Detalles del error"
 */
router.get('/', methods.obtenerTiposComprobantes);

/**
 * @swagger
 * /api/v1/comprobante:
 *   post:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Crear un nuevo tipo de comprobante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveTipoDeComprobante:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *           example:
 *             ClaveTipoDeComprobante: "I"
 *             Descripcion: "Egreso"
 *     responses:
 *       200:
 *         description: Tipo de comprobante creado correctamente
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
 *                     ClaveTipoDeComprobante:
 *                       type: string
 *                     Descripcion:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Tipo de comprobante creado correctamente"
 *               data:
 *                 ClaveTipoDeComprobante: "I"
 *                 Descripcion: "Egreso"
 *       409:
 *         description: El tipo de comprobante ya existe
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
 *               error: "El tipo de comprobante ya existe"
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
 *             example:
 *               status: "Error"
 *               message: "Error al crear el tipo de comprobante"
 *               error: "Detalles del error"
 */
router.post(
	'/',
	schemas.crearTiposComprobantesSchema,
	middleware.validateSchema,
	methods.crearTiposComprobantes,
);

/**
 * @swagger
 * /api/v1/comprobante:
 *   patch:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Actualizar un tipo de comprobante existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveTipoDeComprobante:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *           example:
 *             ClaveTipoDeComprobante: "I"
 *             Descripcion: "Egreso"
 *     responses:
 *       200:
 *         description: Tipo de comprobante actualizado correctamente
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
 *                     ClaveTipoDeComprobante:
 *                       type: string
 *                     Descripcion:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Tipo de comprobante actualizado correctamente"
 *               data:
 *                 ClaveTipoDeComprobante: "I"
 *                 Descripcion: "Egreso"
 *       404:
 *         description: El tipo de comprobante no existe
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
 *               error: "El tipo de comprobante no existe"
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
 *             example:
 *               status: "Error"
 *               message: "Error al actualizar el tipo de comprobante"
 *               error: "Detalles del error"
 */
router.patch(
	'/',
	schemas.actualizarTiposComprobantesSchema,
	middleware.validateSchema,
	methods.actualizarTiposComprobantes,
);

/**
 * @swagger
 * /api/v1/comprobante:
 *   delete:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Eliminar un tipo de comprobante existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveTipoDeComprobante:
 *                 type: string
 *           example:
 *             ClaveTipoDeComprobante: "X"
 *     responses:
 *       200:
 *         description: Tipo de comprobante eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ClaveTipoDeComprobante:
 *                   type: string
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta
 *                 value:
 *                   message: "Tipo de comprobante eliminado correctamente"
 *                   ClaveTipoDeComprobante: "I"
 */
router.delete(
    '/',
    middleware.validateSchema,
    schemas.borrarTiposComprobantesSchema,
    methods.borrarTiposComprobantes,
);

export default router;
