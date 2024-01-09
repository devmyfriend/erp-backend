import { body } from 'express-validator';

export const crearSucursal = [
	body('sucursal.*.Nombre')
		.isString()
		.not()
		.isEmpty()
		.trim()
		.escape()
		.withMessage(
			'El nombre de la empresa es obligatorio y debe ser un string.',
		),

	body('sucursal.*.EntidadNegocioId')
		.isInt()
		.exists()
		.withMessage(
			'El ID de la entidad de negocio es obligatorio y debe ser un número entero.',
		),

	body('sucursal.*.CreadoPor')
		.isInt()
		.exists()
		.withMessage(
			'El campo CreadoPor es obligatorio y debe ser un número entero.',
		),

	body('datos.*.Calle')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La calle es un campo obligatorio y debe ser un string.'),

	body('datos.*.NumeroExt')
		.isString()
		.not()
		.isEmpty()
		.withMessage('El número exterior es obligatorio y debe ser un string.'),

	body('datos.*.NumeroInt')
		.isString()
		.not()
		.isEmpty()
		.withMessage('El número interior es obligatorio y debe ser un string.'),

	body('datos.*.CodigoPostal')
		.isString()
		.not()
		.isEmpty()
		.withMessage('El código postal es obligatorio y debe ser un string.'),

	body('datos.*.ClaveEstado')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del estado es obligatoria y debe ser un string.'),

	body('datos.*.ClaveMunicipio')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del municipio es obligatoria y debe ser un string.'),

	body('datos.*.ClaveLocalidad')
		.isString()
		.not()
		.isEmpty()
		.withMessage(
			'La clave de la localidad es obligatoria y debe ser un string.',
		),

	body('datos.*.ClaveColonia')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave de la colonia es obligatoria y debe ser un string.'),

	body('datos.*.ClavePais')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del país es obligatoria y debe ser un string.'),
];
