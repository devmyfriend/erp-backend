import { Router } from 'express';
import { methods } from '../controllers/sat.tipo.de.comprobante.controller.js';
import * as schemas from '../schemas/type.of.receipt.js';
import * as middleware from '../middlewares/express-validator.js';
import { param } from 'express-validator';
const router = Router();

/**
 * @swagger
 * /api/v1/comprobante/:
 *   get:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Obtener todos los tipos de comprobante
 *     responses:
 *       200:
 *         description: Tipos de comprobante obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveTipoDeComprobante:
 *                     type: string
 *                   Descripcion:
 *                     type: string
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta
 *                 value:
 *                   - ClaveTipoDeComprobante: "I"
 *                     Descripcion: "Egreso"
 *       404:
 *         description: No hay tipos de comprobante
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', methods.getTypeOfReceipt);

/**
 * @swagger
 * /api/v1/comprobante/:
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
 *           examples:
 *             example1:
 *               summary: Ejemplo de cuerpo de solicitud
 *               value:
 *                 ClaveTipoDeComprobante: "I"
 *                 Descripcion: "Egreso"
 *     responses:
 *       200:
 *         description: Tipo de comprobante creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ClaveTipoDeComprobante:
 *                   type: string
 *                 Descripcion:
 *                   type: string
 *             examples:
 *               example1:
 *                 summary: Ejemplo de respuesta
 *                 value:
 *                   ClaveTipoDeComprobante: "I"
 *                   Descripcion: "Egreso"
 */
router.post('/',
schemas.createTypeOfReceiptSchema,
middleware.validateSchema,
methods.createTypeOfReceipt);

/**
 * @swagger
 * /api/v1/comprobante/:
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
 *           examples:
 *             example1:
 *               summary: Ejemplo de cuerpo de solicitud
 *               value:
 *                 ClaveTipoDeComprobante: "I"
 *                 Descripcion: "Egreso"
 *     responses:
 *       200:
 *         description: Tipo de comprobante actualizado correctamente
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
 *                   message: "Tipo de comprobante actualizado correctamente"
 *                   ClaveTipoDeComprobante: "I"
 *       404:
 *         description: El tipo de comprobante no existe
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/',
schemas.updateTypeOfReceiptSchema,
middleware.validateSchema,
methods.updateTypeOfReceipt);


/**
 * @swagger
 * /api/v1/comprobante/{ClaveTipoDeComprobante}:
 *   delete:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Eliminar un tipo de comprobante existente
 *     parameters:
 *       - in: path
 *         name: ClaveTipoDeComprobante
 *         required: true
 *         schema:
 *           type: string
 *           example: 'X'
 *         description: La clave del tipo de comprobante a eliminar
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
router.delete('/:ClaveTipoDeComprobante', 
param('ClaveTipoDeComprobante', 'La clave del tipo de comprobante es requerida').notEmpty().isString().withMessage('La clave del tipo de comprobante debe ser una cadena de texto').isLength({ min: 1, max: 1 }).withMessage('La clave del tipo de comprobante debe tener una longitud de 1 caracter'),
methods.deleteTypeOfReceipt);

export default router;