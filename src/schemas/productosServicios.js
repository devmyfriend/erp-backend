import { body, param, query } from 'express-validator';

const pageSchema = query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero mayor o igual a 1');

export const buscarProductosServiciosPorClaveSchema = [
	param('code')
		.notEmpty()
		.withMessage('El código del producto o servicio no puede estar vacío')
		.isInt()
		.withMessage('El código del producto o servicio tiene que ser un número entero')
		.matches(/^\S*$/)
		.withMessage('El código del producto o servicio no puede contener espacios')
		.isLength({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio debe tener entre 1 y 8 caracteres'),
];

export const buscarProductosServiciosPorDescripcionSchema = [
	param('descripcion')
		.notEmpty()
		.withMessage('La descripción no puede estar vacía')
		.isString()
		.withMessage('La descripción tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 255 })
		.withMessage('La descripción debe tener entre 3 y 255 caracteres'),
	pageSchema
];

export const buscarProductosServiciosPorPalabraSchema = [
	param('palabra')
		.notEmpty()
		.withMessage('La palabra no puede estar vacía')
		.isString()
		.withMessage('La palabra tiene que ser un número entero')
		.isLength({ min: 3, max: 255 })
		.withMessage('La palabra debe tener entre 3 y 255 caracteres'),
	pageSchema
];

export const crearProductosServiciosSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacía')
		.isInt()
		.withMessage('La clave del producto o servicio tiene que ser una cadena de texto')
		.isLength({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio debe tener entre 1 y 8 caracteres'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripción no puede estar vacía')
		.isString({ min: 3, max: 255 })
		.withMessage('La descripción tiene que ser una cadena de texto'),
	body('PalabrasSimilares')
		.optional()
		.isString({ min: 3, max: 255 })
		.withMessage('Las palabras similares tienen que ser una cadena de texto'),
];

export const actualizarProductosServiciosSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacía')
		.isInt()
		.withMessage('La clave del producto o servicio tiene que ser una cadena de texto')
		.isLength({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio debe tener entre 1 y 8 caracteres'),
	body('Descripcion')
		.optional()
		.isString({ min: 1, max: 255 })
		.withMessage('La descripción tiene que ser una cadena de texto'),
	body('PalabrasSimilares')
		.optional()
		.isString({ min: 3, max: 255 })
		.withMessage('Las palabras similares tienen que ser una cadena de texto'),
];

export const borrarProductosServiciosSchema = [
	body('ClaveProductoServicio')
		.notEmpty()
		.withMessage('La clave del producto o servicio no puede estar vacía')
		.isInt()
		.withMessage('La clave del producto o servicio tiene que ser una cadena de texto')
		.isLength({ min: 1, max: 8 })
		.withMessage('La clave del producto o servicio debe tener entre 1 y 8 caracteres'),
];