import { Router } from 'express';
import { methods } from '../controllers/pais.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import { body, param } from 'express-validator';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: País
 *     description: Operaciones relacionadas con las colonias segun el país, estado, municipio y cp
 *
 *
 */

/**
 * @swagger
 * /api/v1/pais/:
 *   get:
 *     summary: Obtener una lista de países
 *     tags: [País]
 *     responses:
 *       200:
 *         description: Lista de países
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClavePais:
 *                     type: string
 *                     example: "ABW"
 *                   Descripcion:
 *                     type: string
 *                     example: "Aruba"
 */

router.get('/', methods.obtenerPaises);

/**
 * @swagger
 * /api/v1/pais/estados/{clave_pais}:
 *   get:
 *     tags:
 *       - País
 *     summary: Obtener estados por clave de país
 *     parameters:
 *       - in: path
 *         name: clave_pais
 *         schema:
 *           type: string
 *         required: true
 *         description: clave del país
 *     responses:
 *       200:
 *         description: Lista de estados del país especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClavePais:
 *                     type: string
 *                     example: "MEX"
 *                   ClaveEstado:
 *                     type: string
 *                     example: "AGU"
 *                   Nombre:
 *                     type: string
 *                     example: "Aguascalientes"
 */
router.get(
	'/estados/:id',
	param('id', 'El parametro debe ser un string')
		.isString()
		.notEmpty()
		.withMessage('El parametro no puede estar vacío'),
	middleware.validateSchema,
	methods.obtenerEstadoPorPais,
);

/**
 * @swagger
 * /api/v1/pais/estados/colonias:
 *   post:
 *     tags:
 *       - País
 *     summary: Obtener colonias por código postal y clave de país
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *                 type: object
 *                 properties:
 *                   cp:
 *                     type: number
 *                     example: 77518
 *                   clave_pais:
 *                     type: string
 *                     example: "ROO"
 *     responses:
 *       200:
 *         description: Lista de colonias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                   ClaveColonia:
 *                     type: number
 *                     example: "7"
 *                   nombre_colonia:
 *                     type: string
 *                     example: "AGU"
 *                   Nombre:
 *                     type: string
 *                     example: "Paseos Chac Mool"
 */
router.post(
	'/estados/colonias',
	body('cp', 'El parametro cp debe ser un entero')
		.isInt()
		.notEmpty()
		.withMessage('El campo cp no puede estar vacío'),
	body('clave_pais', 'El parametro clave_pais debe ser un string')
		.isString()
		.notEmpty()
		.withMessage('El campo clave_pais no puede estar vacío'),
	middleware.validateSchema,
	methods.obtenerColonias,
);

export default router;
