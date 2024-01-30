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
		), body('sucursal.*.ResponsableId')
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
	body('datos.*.Estado')
		.isString()
		.withMessage('El estado es obligatoria y debe ser un string.')
		.not()
		.isEmpty()
		.withMessage('El estado no puede estar vacío.')
		.isLength({ min: 3, max: 50 })
		.withMessage('La clave del estado debe ser un string de almenos 3 dígitos.'),

	body('datos.*.Municipio')
		.isString()
		.not()
		.isEmpty()
		.withMessage('El municipio es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 50 })
		.withMessage('El municipio debe ser un string de almenos 3 dígitos.'),

	body('datos.*.Localidad')
		.isString()
		.not()
		.isEmpty()
		.withMessage(
			'La localidad es obligatoria y debe ser un string.',
		)
		.isLength({ min: 3, max: 50 })
		.withMessage('La clave localidad debe ser un string de almenos 3 dígitos.'),

	body('datos.*.Colonia')
		.isString()
		.not()
		.isEmpty()
		.withMessage('La Colonia es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 50 })
		.withMessage('La Colonia debe ser un string con almenos 3 dígitos.'),

	body('datos.*.Pais')
		.isString()
		.not()
		.isEmpty()
		.withMessage('El país es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 50 })
		.withMessage('El país debe ser un string con almenos 3 dígitos.'),
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
	body('datos.*.Estado')
		.optional()
		.isString()
		.withMessage('El estado es obligatoria y debe ser un string.')
		.not()
		.isEmpty()
		.withMessage('El estado no puede estar vacío.')
		.isLength({ min: 3, max: 50 })
		.withMessage('El estado debe ser un string de almenos 3 dígitos.'),

	body('datos.*.Municipio')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('El municipio es obligatorio y debe ser un string.')
		.isLength({ min: 3, max: 50 })
		.withMessage('El estado debe ser un string de almenos 3 dígitos.'),

	body('datos.*.Localidad')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage(
			'La localidad es obligatoria y debe ser un string.',
		)
		.isLength({ min: 3, max: 50 })
		.withMessage('La clave localidad debe ser un string de almenos 3 dígitos.'),

	body('datos.*.Colonia')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('La colonia es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 50 })
		.withMessage('La clave colonia debe ser un string de almenos 4 dígitos.'),

	body('datos.*.Pais')
		.optional()
		.isString()
		.not()
		.isEmpty()
		.withMessage('La clave del país es obligatoria y debe ser un string.')
		.isLength({ min: 3, max: 50 })
		.withMessage('El país debe ser un string de almenos 3 dígitos.'),
];
