import { Router } from 'express';
import { methods } from '../controllers/impuesto.compuesto.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schema from '../schemas/impuesto.compuesto.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Impuestos compuestos
 *     description: Operaciones relacionadas con los impuestos compuestos
 */

/**
 * @swagger
 * /api/v1/impuestos/compuestos/{pagina}:
 *   get:
 *     summary: Obtener una lista de impuestos compuestos
 *     tags: [Impuestos compuestos]
 *     parameters:
 *       - in: path
 *         name: pagina
 *         required: true
 *         schema:
 *           type: integer
 *         description: pagina de la lista de impuestos propios
 *     responses:
 *       200:
 *         description: Lista de impuestos compuestos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ImpuestoCompuestoId:
 *                     type: integer
 *                     example: 1
 *                   Nombre:
 *                     type: string
 *                     example: "IVA 16%"
 *                   Predeterminado:
 *                     type: boolean
 *                     example: true
 *                   Borrado:
 *                     type: integer
 *                     example: 0
 */
router.get('/:pagina', methods.findAll);

/**
 * @swagger
 * /api/v1/impuestos/compuestos/crear:
 *   post:
 *     summary: Crear un impuesto compuesto
 *     tags: [Impuestos compuestos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del impuesto compuesto
 *                 example: "Impuesto compuesto 99"
 *               Predeterminado:
 *                 type: boolean
 *                 description: Establece si el impuesto es predeterminado o no
 *                 example: true
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea el impuesto
 *                 example: 2
 *     responses:
 *       200:
 *         description: Impuesto compuesto creado exitosamente
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
	'/crear',
	schema.createCompoundTaxSchema,
	middleware.validateSchema,
	methods.create,
);

/**
 * @swagger
 * /api/v1/impuestos/compuestos/editar:
 *   put:
 *     summary: Actualizar un impuesto compuesto existente
 *     tags: [Impuestos compuestos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ImpuestoCompuestoId:
 *                 type: number
 *                 example: 2
 *               Nombre:
 *                 type: string
 *                 example: "Nombre Impuesto Actualizado"
 *               Predeterminado:
 *                 type: boolean
 *                 example: false
 *               ActualizadoPor:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Impuesto compuesto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Impuesto compuesto actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     ImpuestoCompuestoId:
 *                       type: string
 *                       example: "02"
 *                     Nombre:
 *                       type: string
 *                       example: "Nombre Actualizado"
 *                     ActualizadoPor:
 *                       type: integer
 *                       example: 2
 */
router.put(
	'/editar',
	schema.updateCompoundTaxSchema,
	middleware.validateSchema,
	methods.updateById,
);

/**	
 * @swagger
 * /api/v1/impuestos/compuestos/desactivar:
 *   delete:
 *     summary: Eliminar un impuesto compuesto existente
 *     tags: [Impuestos compuestos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ImpuestoCompuestoId:
 *                 type: number
 *                 example: 4
 *               BorradoPor:
 *                 type: number
 *                 example: 456
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
	'/desactivar',
	schema.deleteCompoundTaxSchema,
	middleware.validateSchema,
	methods.deleteById,
);

export default router;