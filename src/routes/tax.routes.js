import { Router } from 'express';
import { methods } from '../controllers/tax.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import { body } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Impuestos
 *     description: Operaciones relacionadas con los impuestos
 *
 *
 */

/**
 * @swagger
 * /api/v1/impuestos:
 *   get:
 *     summary: Obtener una lista de impuestos
 *     tags: [Impuestos]
 *     responses:
 *       200:
 *         description: Lista de impuestos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveImpuesto:
 *                     type: string
 *                     example: "ABW"
 *                   Nombre:
 *                     type: string
 *                     example: "ISR"
 *                   Activo:
 *                     type: boolean
 *                     example: "true"
 */


router.get('/', methods.findTax);

/**
 * @swagger
 * /api/v1/impuestos:
 *   post:
 *     summary: Crear un impuesto
 *     tags: [Impuestos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveImpuesto:
 *                 type: string
 *                 example: "000"
 *               Nombre:
 *                 type: string
 *                 example: "NEW NAME"
 *     responses:
 *       200:
 *         description: Agregar un nuevo impuesto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveImpuesto:
 *                     type: string
 *                     example: "004"
 *                   Nombre:
 *                     type: string
 *                     example: "NEW NAME"
 *                   Activo:
 *                     type: boolean
 *                     example: true
 */
router.post('/',
	body('ClaveImpuesto')
		.isString()
		.withMessage('El campo ClaveImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo ClaveImpuesto es requerido')
		.isLength({ min: 3, max: 3 })
		.withMessage(
			'El campo ClaveImpuesto debe tener 3 caracteres',
		),
	body('Nombre')
		.isString()
		.withMessage('El campo Nombre debe ser un string')
		.notEmpty()
		.withMessage('El campo Nombre es requerido'),
	middleware.validateSchema, methods.createTax)



/**
 * @swagger
 * /api/v1/impuestos/:
 *   put:
 *     summary: Actualizar un impuesto existente
 *     tags: [Impuestos]
 *  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveImpuesto:
 *                 type: number
 *                 example: 0
 *               Nombre:
 *                 type: string
 *                 example: "UPDATED NAME"
 *     responses:
 *       200:
 *         description: Impuesto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Impuesto actualizado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     ClaveImpuesto:
 *                       type: string
 *                       example: "UPDATED"
 *                     Nombre:
 *                       type: string
 *                       example: "UPDATED NAME"
 */
router.put('/',
	body('ClaveImpuesto')
		.isString()
		.withMessage('El campo ClaveImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo ClaveImpuesto es requerido')
		.isLength({ min: 3, max: 3 })
		.withMessage(
			'El campo ClaveImpuesto debe tener 3 caracteres',
		),
	body('Nombre')
		.isString()
		.withMessage('El campo Nombre debe ser un string')
		.notEmpty()
		.withMessage('El campo Nombre es requerido'), middleware.validateSchema, methods.updateTax)




/**
 * @swagger
 * /api/v1/impuestos/{ClaveImpuesto}:
 *   delete:
 *     summary: Eliminar un impuesto existente
 *     tags: [Impuestos]
 *     parameters:
 *       - in: path
 *         name: ClaveImpuesto
 *         required: true
 *         description: Clave del impuesto a eliminar
 *         schema:
 *           type: number
 *           example: 0
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
 */

router.delete('/:id', middleware.validateSchema, methods.deleteTax);


export default router;
