import { body } from 'express-validator';

export const findPostalCodeSchema = [
	body('cp')
		.isInt()
		.withMessage('El código postal debe ser un numero entero')
		.notEmpty()
		.withMessage('El código postal es obligatorio y debe ser un numero entero'),
	body('municipio')
		.isString()
		.withMessage('El municipio debe ser una cadena de texto')
		.notEmpty()
		.withMessage('El municipio es obligatorio y debe ser una cadena de texto'),
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
