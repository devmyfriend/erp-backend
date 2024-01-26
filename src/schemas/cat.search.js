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

export const createTypeCoinSchema = [
	body('Moneda')
	.notEmpty()
	.withMessage('El codigo de moneda no puede estar vacia')
	.isString()
	.withMessage('El codigo moneda tiene que ser un valor de texto o numero'),
	body('Descripcion')
	.notEmpty()
	.withMessage('No puedes dejar la descripcion vacia, llena el campo')
	.isString()
	.withMessage('El campo descripcion tiene que ser una cadena de texto'),
]

export const updateTypeCoinSchema = [
	body('Moneda')
	.notEmpty()
	.isString()
	.withMessage('El codigo de la moneda no puede estar vacia'),
	body('Descripcion')
	.optional()
	.isString()
	.withMessage('La descripcion no puede estar vacia'),
]

export const createSatFKSchema = [
	body('ClaveRegimenFiscal')
	.notEmpty()
	.withMessage('La clave del regimen fiscal no puede estar vacia')
	.isString()
	.withMessage('La clave del regimen fiscal tiene que ser una cadena de texto'),
	body('Descripcion')
	.notEmpty()
	.withMessage('La descripcion no puede estar vacia')
	.isString()
	.withMessage('La descripcion tiene que ser una cadena de texto'),
	body('Fisica')
	.notEmpty()
	.withMessage('El estatus de la persona fisica no puede estar vacio')
	.isBoolean()
	.withMessage('El estatus de la persona fisica tiene que ser un valor booleano'),
	body('Moral')
	.notEmpty()
	.withMessage('El estatus de la persona moral no puede estar vacio')
	.isBoolean()
	.withMessage('El estatus de la persona moral tiene que ser un valor booleano'),
]

export const editSatFKSchema = [
	body('ClaveRegimenFiscal')
	.notEmpty()
	.withMessage('La clave del regimen fiscal no puede estar vacia')
	.isString()
	.withMessage('La clave del regimen fiscal tiene que ser una cadena de texto'),
	body('Descripcion')
	.optional()
	.isString()
	.withMessage('La descripcion tiene que ser una cadena de texto'),
	body('Fisica')
	.optional()
	.isBoolean()
	.withMessage('El estatus de la persona fisica tiene que ser un valor booleano'),
	body('Moral')
	.optional()
	.isBoolean()
	.withMessage('El estatus de la persona moral tiene que ser un valor booleano'),
]
