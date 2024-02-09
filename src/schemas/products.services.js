import { body } from 'express-validator';

export const createProductServicesSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isInt()
		.withMessage('La clave del producto o servicio tiene que ser un numero entero'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripcion no puede estar vacia')
		.isString()
		.withMessage('La descripcion tiene que ser una cadena de texto'),
	body('PalabrasSimilares')
		.optional()
		.isString()
		.withMessage('Las palabras similares tienen que ser una cadena de texto'),
]

export const updateProductServicesSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isInt()
		.withMessage('La clave del producto o servicio tiene que ser un numero entero'),
	body('Descripcion')
		.optional()
		.isString()
		.withMessage('La descripcion tiene que ser una cadena de texto'),
	body('PalabrasSimilares')
		.optional()
		.isString()
		.withMessage('Las palabras similares tienen que ser una cadena de texto'),
]

export const deleteProductServicesSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isInt()
		.withMessage('La clave del producto o servicio tiene que ser un numero entero'),
]