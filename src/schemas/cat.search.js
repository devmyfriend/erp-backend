import { body } from 'express-validator';

export const findPostalCodeSchema = [
	body('cp')
		.isInt()
		.withMessage('El código postal debe ser un numero entero')
		.notEmpty()
		.withMessage('El código postal es obligatorio y debe ser un numero entero'),
];


export const findColSchema = [
	body('cp')
		.isInt()
		.withMessage('El código postal debe ser un numero entero')
		.notEmpty()
		.withMessage('El código postal es obligatorio y debe ser un numero entero'),
	body('colonia')
		.isString()
		.withMessage('La colonia debe ser una cadena de texto')
		.notEmpty()
		.withMessage('La colonia obligatoria y debe ser una cadena de texto'),
];
