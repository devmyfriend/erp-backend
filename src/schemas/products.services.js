import { body } from 'express-validator';

export const buscarProductosServiciosPorClaveSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isString({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio tiene que ser una cadena de texto'),
]

export const buscarProductosServiciosPorDescripcionSchema = [
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripción del producto o servicio no puede estar vacia')
		.isString({min: 3, max: 255})
		.withMessage('La descripción del producto o servicio tiene que ser una cadena de texto'),
	]

export const buscarProductosServiciosPorPalabraSchema = [
	body('Palabra')
		.notEmpty()
		.withMessage('La palabra no puede estar vacia')
		.isString({min: 3, max: 255})
		.withMessage('La palabra tiene que ser una cadena de texto'),
]

export const crearProductosServiciosSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isInt({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio tiene que ser un numero entero'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripcion no puede estar vacia')
		.isString({ min: 3, max: 255 })
		.withMessage('La descripcion tiene que ser una cadena de texto'),
	body('PalabrasSimilares')
		.optional()
		.isString({ min: 3, max: 255 })
		.withMessage('Las palabras similares tienen que ser una cadena de texto'),
]

export const actualizarProductosServiciosSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isInt({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio tiene que ser un numero entero'),
	body('Descripcion')
		.optional()
		.isString({ min: 1, max: 255 })
		.withMessage('La descripcion tiene que ser una cadena de texto'),
	body('PalabrasSimilares')
		.optional()
		.isString({ min: 3, max: 255 })
		.withMessage('Las palabras similares tienen que ser una cadena de texto'),
]

export const borrarProductosServiciosSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacia')
		.isInt({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio tiene que ser un numero entero'),
]