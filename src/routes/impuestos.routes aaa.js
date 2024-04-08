import { Router } from 'express';
import { methods } from '../controllers/sat.impuesto.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import { body } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Impuestos SAT
 *     description: Operaciones relacionadas con los impuestos SAT
 *   - name: Impuestos propios
 *     description: Operaciones relacionadas con los impuestos propios
 *   - name: Impuestos compuestos
 *     description: Operaciones relacionadas con los impuestos compuestos
 *   - name: Impuestos
 *     description: Operaciones relacionadas con los impuestos crudos
 */

/**
 * @swagger
 * /api/v1/impuestos:
 *   get:
 *     summary: Obtener una lista de impuestos SAT
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
 *     summary: Crear un impuesto SAT
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
router.post(
	'/',
	body('ClaveImpuesto')
		.isString()
		.withMessage('El campo ClaveImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo ClaveImpuesto es requerido')
		.isLength({ min: 3, max: 3 })
		.withMessage('El campo ClaveImpuesto debe tener 3 caracteres'),
	body('Nombre')
		.isString()
		.withMessage('El campo Nombre debe ser un string')
		.notEmpty()
		.withMessage('El campo Nombre es requerido'),
	middleware.validateSchema,
	methods.createTax,
);

/**
 * @swagger
 * /api/v1/impuestos/:
 *   put:
 *     summary: Actualizar un impuesto SAT existente
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
router.put(
	'/',
	body('ClaveImpuesto')
		.isString()
		.withMessage('El campo ClaveImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo ClaveImpuesto es requerido')
		.isLength({ min: 3, max: 3 })
		.withMessage('El campo ClaveImpuesto debe tener 3 caracteres'),
	body('Nombre')
		.isString()
		.withMessage('El campo Nombre debe ser un string')
		.notEmpty()
		.withMessage('El campo Nombre es requerido'),
	middleware.validateSchema,
	methods.updateTax,
);

/**
 * @swagger
 * /api/v1/impuestos/{ClaveImpuesto}:
 *   delete:
 *     summary: Eliminar un impuesto SAT existente
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

/**
 * @swagger
 * /api/v1/impuestos/custom:
 *   get:
 *     summary: Obtener una lista de impuestos propios
 *     tags: [Impuestos]
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
router.get('/custom', methods.findCustomTax);

/**
 * @swagger
 * /api/v1/impuestos/custom:
 *   post:
 *     summary: Crear un impuesto propio
 *     tags: [Impuestos]
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
	'/custom',
	body('NombreImpuesto')
		.isString()
		.withMessage('El campo NombreImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo NombreImpuesto es requerido'),
	body('ClaveImpuesto')
		.isInt()
		.withMessage('El campo ClaveImpuesto debe ser un número')
		.notEmpty()
		.withMessage('El campo ClaveImpuesto es requerido')
		.isLength({ min: 1, max: 3 })
		.withMessage('El campo ClaveImpuesto debe tener entre 1 y 3 carácteres'),
	body('CreadoPor')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número')
		.notEmpty()
		.withMessage('El campo CreadoPor es requerido')
		.isLength({ min: 1, max: 11 })
		.withMessage('El campo CreadoPor debe tener entre 1 y 11 carácteres'),
	middleware.validateSchema,
	methods.createCustomTax,
);

/**
 * @swagger
 * /api/v1/impuestos/custom:
 *   put:
 *     summary: Actualizar un impuesto propio existente
 *     tags: [Impuestos]
 *
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
 *                       example: 02
 */
router.put(
	'/custom',
	body('cfgImpuestoId')
		.isInt()
		.withMessage('El campo cfgImpuestoId debe ser de tipo int')
		.notEmpty()
		.withMessage('El campo cfgImpuestoId es requerido')
		.isLength({ min: 1, max: 11 })
		.withMessage('El campo cfgImpuestoId debe tener entre 1 y 11 carácateres'),
	body('NombreImpuesto')
		.isString()
		.withMessage('El campo NombreImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo NombreImpuesto es requerido'),
	body('ClaveImpuesto')
		.isString()
		.withMessage('El campo ClaveImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo ClaveImpuesto es requerido')
		.isLength({ min: 1, max: 3 })
		.withMessage('El campo ClaveImpuesto debe tener entre 1 y 3 carácteres'),
	body('ActualizadoPor')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número')
		.notEmpty()
		.withMessage('El campo ActualizadoPor es requerido')
		.isLength({ min: 1, max: 11 })
		.withMessage('El campo ActualizadoPor debe tener entre 1 y 11 carácteres'),
	middleware.validateSchema,
	methods.updateCustomTax,
);

/**
 * @swagger
 * /api/v1/impuestos/custom/{cfgImpuestoId}:
 *   delete:
 *     summary: Eliminar un impuesto propio existente
 *     tags: [Impuestos]
 *     parameters:
 *       - in: path
 *         name: cfgImpuestoId
 *         required: true
 *         description: Clave del impuesto propio a eliminar
 *         schema:
 *           type: number
 *           example: 9
 *     responses:
 *       404:
 *         description: El impuesto propio no fue encontrado
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
 *                   example: "Impuesto propio no encontrado"
 */
router.delete(
	'/custom/:id',
	middleware.validateSchema,
	methods.deleteCustomTax,
);

/**
 * @swagger
 * /api/v1/impuestos/compuesto:
 *   get:
 *     summary: Obtener una lista de impuestos compuestos
 *     tags: [Impuestos]
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
router.get('/compuesto', methods.findCompoundTax);

/**
 * @swagger
 * /api/v1/impuestos/compuesto:
 *   post:
 *     summary: Crear un impuesto compuesto
 *     tags: [Impuestos]
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
	'/compuesto',
	body('Nombre')
		.isString()
		.withMessage('El campo NombreImpuesto debe ser un string')
		.notEmpty()
		.withMessage('El campo NombreImpuesto es requerido'),
	body('Predeterminado')
		.isBoolean()
		.withMessage('El campo `Predeterminado` debe ser verdadero o falso')
		.notEmpty()
		.withMessage('El campo `Predeterminado` es requerido'),
	body('CreadoPor')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número')
		.notEmpty()
		.withMessage('El campo CreadoPor es requerido')
		.isLength({ min: 1, max: 11 })
		.withMessage('El campo CreadoPor debe tener entre 1 y 11 carácteres'),
	middleware.validateSchema,
	methods.createCompoundTax,
);

/**
 * @swagger
 * /api/v1/impuestos/compuesto:
 *   put:
 *     summary: Actualizar un impuesto compuesto existente
 *     tags: [Impuestos]
 *
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
 *                 example: 02
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
	'/compuesto',
	body('ImpuestoCompuestoId')
		.isInt()
		.withMessage('El campo ImpuestoCompuestoId debe ser de tipo int')
		.notEmpty()
		.withMessage('El campo ImpuestoCompuestoId es requerido')
		.isLength({ min: 1, max: 11 })
		.withMessage(
			'El campo ImpuestoCompuestoId debe tener entre 1 y 11 carácateres',
		),
	body('Nombre')
		.isString()
		.withMessage('El campo Nombre debe ser un string')
		.notEmpty()
		.withMessage('El campo Nombre es requerido'),
	body('Predeterminado')
		.isBoolean()
		.withMessage('El campo Predeterminado debe ser un booleano')
		.notEmpty()
		.withMessage('El campo Predeterminado es requerido'),
	body('ActualizadoPor')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número')
		.notEmpty()
		.withMessage('El campo ActualizadoPor es requerido')
		.isLength({ min: 1, max: 11 })
		.withMessage('El campo ActualizadoPor debe tener entre 1 y 11 carácteres'),
	middleware.validateSchema,
	methods.updateCompoundTax,
);

/**
 * @swagger
 * /api/v1/impuestos/compuesto/{ImpuestoCompuestoId}:
 *   delete:
 *     summary: Eliminar un impuesto compuesto existente
 *     tags: [Impuestos]
 *     parameters:
 *       - in: path
 *         name: ImpuestoCompuestoId
 *         required: true
 *         description: Clave del impuesto compuesto a eliminar
 *         schema:
 *           type: number
 *           example: 4
 *     responses:
 *       404:
 *         description: El impuesto compuesto no fue encontrado
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
 *                   example: "Impuesto compuesto no encontrado"
 */
router.delete(
	'/compuesto/:id',
	middleware.validateSchema,
	methods.deleteCompoundTax,
);

export default router;
