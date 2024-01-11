import { Router } from 'express';
import { methods } from '../controllers/pais.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import { body, param } from 'express-validator';
const router = Router();

router.get('/', methods.obtenerPaises);

router.get(
	'/estados/:id',
	param('id', 'El parametro debe ser un string')
		.isString()
		.notEmpty()
		.withMessage('El parametro no puede estar vacío'),
	middleware.validateSchema,
	methods.obtenerEstadoPorPais,
);

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
