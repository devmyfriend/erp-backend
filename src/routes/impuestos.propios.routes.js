import { Router } from 'express';
import { methods } from '../controllers/impuesto.propio.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/impuesto.propio.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Impuestos propios
 *     description: Operaciones relacionadas con los impuestos propios
 */

/**
 * @swagger
 * /api/v1/impuestospropios:
 *   get:
 *     summary: Obtener una lista de impuestos propios
 *     tags: [Impuestos propios]
 *     responses:
 *       200:
 *         description: Lista de impuestos propios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cfgImpuestoId:
 *                     type: integer
 *                     example: "1"
 *                   NombreImpuesto:
 *                     type: string
 *                     example: "IVA 16%"
 *                   ClaveImpuesto:
 *                     type: string
 *                     example: "007"
 *                   Activo:
 *                     type: boolean
 *                     example: "true"
 */
router.get('/', methods.findOwnTax);

/**
 * @swagger
 * /api/v1/impuestospropios:
 *   post:
 *     summary: Crear un impuesto propio
 *     tags: [Impuestos propios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NombreImpuesto:
 *                 type: string
 *                 description: Nombre del impuesto
 *                 example: "IVA 16%"
 *               ClaveImpuesto:
 *                 type: string
 *                 description: Clave del impuesto SAT
 *                 example: "007"
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea el impuesto
 *                 example: 1
 *     responses:
 *       200:
 *         description: Impuesto creado exitosamente
 *       400:
 *         description: Error en la solicitud, revisa los mensajes de error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error detallado
 */
router.post(
	'/',
	schemas.createCompoundTaxSchema,
	middleware.validateSchema,
	methods.createOwnTax,
);

/**
 * @swagger
 * /api/v1/impuestospropios:
 *   put:
 *     summary: Actualizar un impuesto propio existente
 *     tags: [Impuestos propios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cfgImpuestoId:
 *                 type: number
 *                 example: 2
 *               NombreImpuesto:
 *                 type: string
 *                 example: "Nombre Impuesto Actualizado"
 *               ClaveImpuesto:
 *                 type: string
 *                 example: "007"
 *               ActualizadoPor:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Impuesto propio actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Impuesto propio actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     cfgImpuestoId:
 *                       type: string
 *                       example: "02"
 *                     NombreImpuesto:
 *                       type: string
 *                       example: "Nombre Actualizado"
 *                     ActualizadoPor:
 *                       type: integer
 *                       example: 2
 */
router.put(
	'/',
	schemas.updateCompoundTaxSchema,
	middleware.validateSchema,
	methods.updateOwnTax,
);

/**
 * @swagger
 * /api/v1/impuestospropios:
 *   delete:
 *     summary: Eliminar un impuesto propio existente
 *     tags: [Impuestos propios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cfgImpuestoId:
 *                 type: number
 *                 example: 9
 *               BorradoPor:
 *                 type: number
 *                 example: 123
 *     responses:
 *       404:
 *         description: El impuesto no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Impuesto no encontrado"
 *       202:
 *         description: El impuesto no fue encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Impuesto eliminado"
 */
router.delete(
	'/',
	middleware.validateSchema,
	methods.deleteOwnTax,
);

export default router;