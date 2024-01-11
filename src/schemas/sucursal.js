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
		.withMessage('La clave del estado es obligatoria y debe ser un string.')
		.not()
		.isEmpty()
		.withMessage('La clave del estado no puede estar vacía.')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del estado debe ser un string de 3 dígitos.'),

	body('datos.*.ClaveMunicipio')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del municipio es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del municipio debe ser un string de 3 dígitos.'),

	body('datos.*.ClaveLocalidad')
		.isString()
		.not()
		.isEmpty()
		.withMessage(
			'La clave de la localidad es obligatoria y debe ser un string.',
		)
		.isLength({ min: 2, max: 2 })
		.withMessage('La clave localidad debe ser un string de 2 dígitos.'),

	body('datos.*.ClaveColonia')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave de la colonia es obligatoria y debe ser un string.')
		.isLength({ min: 4, max: 4 })
		.withMessage('La clave colonia debe ser un string de 4 dígitos.'),

	body('datos.*.ClavePais')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del país es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave país debe ser un string de 3 dígitos.'),
];

export const editarSucursal = [
	body('sucursal.*.SucursalId')
		.isInt()
		.withMessage('El campo SucursalId es obligatorio y debe ser un entero.'),

	body('sucursal.*.Nombre')
		.optional()
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

	body('sucursal.*.ActualizadoPor')
		.isInt()
		.exists()
		.withMessage(
			'El campo ActualizadoPor es obligatorio y debe ser un número entero.',
		),

	body('datos.*.Calle')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('La calle es un campo obligatorio y debe ser un string.'),

	body('datos.*.NumeroExt')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('El número exterior es obligatorio y debe ser un string.'),

	body('datos.*.NumeroInt')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('El número interior es obligatorio y debe ser un string.'),

	body('datos.*.CodigoPostal')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('El código postal es obligatorio y debe ser un string.'),
	body('datos.*.ClaveEstado')
		.optional()
		.isString()
		.withMessage('La clave del estado es obligatoria y debe ser un string.')
		.not()
		.isEmpty()
		.withMessage('La clave del estado no puede estar vacía.')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del estado debe ser un string de 3 dígitos.'),

	body('datos.*.ClaveMunicipio')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del municipio es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del municipio debe ser un string de 3 dígitos.'),

	body('datos.*.ClaveLocalidad')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage(
			'La clave de la localidad es obligatoria y debe ser un string.',
		)
		.isLength({ min: 2, max: 2 })
		.withMessage('La clave localidad debe ser un string de 2 dígitos.'),

	body('datos.*.ClaveColonia')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave de la colonia es obligatoria y debe ser un string.')
		.isLength({ min: 4, max: 4 })
		.withMessage('La clave colonia debe ser un string de 4 dígitos.'),

	body('datos.*.ClavePais')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del país es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave país debe ser un string de 3 dígitos.'),
];