import { body } from 'express-validator'

export const createUnitKeySchema = [
	body('ClaveUnidadSat')
		.notEmpty()
		.withMessage('La clave de la unidad no puede estar vacia')
		.isString()
		.withMessage('La clave de la unidad tiene que ser una cadena de texto')
		.isLength({ min: 1, max: 3 })
		.withMessage('La clave de la unidad tiene que tener un máximo 3 caracteres'),
	body('NombreUnidadSat')
		.notEmpty()
		.withMessage('El nombre de la unidad no puede estar vacio')
		.isString()
		.withMessage('El nombre de la unidad tiene que ser una cadena de texto'),
]

export const updateUnitKeySchema = [
	body('ClaveUnidadSat')
		.notEmpty()
		.withMessage('La clave de la unidad no puede estar vacia')
		.isString()
		.withMessage('La clave de la unidad tiene que ser una cadena de texto')
		.isLength({ min: 1, max: 3 })
		.withMessage('La clave de la unidad tiene que tener un máximo 3 caracteres'),
	body('NombreUnidadSat')
		.optional()
		.isString()
		.withMessage('El nombre de la unidad tiene que ser una cadena de texto'),
]

export const deleteUnitKeySchema = [
	body('ClaveUnidadSat')
	.notEmpty()
	.withMessage('La clave de la unidad no puede estar vacia')
	.isString()
	.withMessage('La clave de la unidad tiene que ser una cadena de texto'),
]