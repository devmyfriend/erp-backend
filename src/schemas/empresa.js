import { body } from 'express-validator';

export const buscarRFC = [
	body('RFC')
		.notEmpty()
		.withMessage('El RFC no puede estar vacío')
		.isString()
		.isLength({ min: 13, max: 13 })
		.matches(
			/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
		)
		.withMessage('El RFC tiene que mantener la estructura del SAT'),
];

export const editarIdEmpresa = [
	body('entidad.*.EntidadNegocioId')
		.notEmpty()
		.withMessage('El campo EntidadNegocioId no puede estar vacío')
		.isInt()
		.withMessage('El campo EntidadNegocioId debe ser un entero'),
	body('entidad.*.EsPropietaria')
		.optional()
		.isBoolean()
		.withMessage('El campo EsPropietaria debe ser un booleano'),
	body('entidad.*.RFC')
	    .optional()
		.isLength({ min: 13, max: 13 })
		.matches(
			/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
		)
		.withMessage('El campo RFC no cumple con el formato adecuado'),
	body('entidad.*.NombreOficial')
		.optional()
		.isString()
		.withMessage('El campo NombreOficial debe ser una cadena de texto'),
	body('entidad.*.NombreComercial')
		.optional()
		.isString()
		.withMessage('El campo NombreComercial debe ser una cadena de texto'),
	body('entidad.*.ClavePais')
		.optional()
		.isString()
		.withMessage('El campo ClavePais debe ser una cadena de texto'),
	body('entidad.*.TaxId')
		.optional()
		.isString(),
	body('entidad.*.ClaveRegimenFiscal')
		.optional()
		.isString()
		.withMessage('El campo ClaveRegimenFiscal debe ser una cadena de texto'),
	body('entidad.*.PersonaFisica')
		.optional()
		.isBoolean()
		.withMessage('El campo PersonaFisica debe ser un booleano'),
	body('entidad.*.PersonaMoral')
		.optional()
		.isBoolean()
		.withMessage('El campo PersonaMoral debe ser un booleano'),
	body('entidad.*.Borrado')
		.optional()
		.isInt()
		.withMessage('El campo Borrado debe ser un entero'),
	body('domicilio.*.Calle')
		.optional()
		.isString()
		.withMessage('El campo Calle debe ser una cadena de texto'),
	body('domicilio.*.NumeroExt')
		.optional()
		.isString()
		.withMessage('El campo NumeroExt debe ser una cadena de texto'),
	body('domicilio.*.NumeroInt')
		.optional()
		.isString()
		.withMessage('El campo NumeroInt debe ser una cadena de texto'),
	body('domicilio.*.CodigoPostal')
		.optional()
		.isString()
		.withMessage('El campo CodigoPostal debe ser una cadena de texto'),
	body('domicilio.*.ClaveEstado')
		.optional()
		.isString()
		.withMessage('El campo ClaveEstado debe ser una cadena de texto'),
	body('domicilio.*.ClaveMunicipio')
		.optional()
		.isString()
		.withMessage('El campo ClaveMunicipio debe ser una cadena de texto'),
	body('domicilio.*.ClaveLocalidad')
		.optional()
		.isString()
		.withMessage('El campo ClaveLocalidad debe ser una cadena de texto'),
	body('domicilio.*.ClaveColonia')
		.optional()
		.isString()
		.withMessage('El campo ClaveColonia debe ser una cadena de texto'),
	body('domicilio.*.ClavePais')
		.optional()
		.isString()
		.withMessage('El campo ClavePais debe ser una cadena de texto'),
];

export const crearEmpresaSchema = [
	body('entidad.*.NombreOficial')
		.notEmpty()
		.withMessage('El campo NombreOficial no puede estar vacío')
		.isString()
		.withMessage('El campo NombreOficial debe ser una cadena de texto'),
	body('entidad.*.RFC')
		.isString()
		.isLength({ min: 12, max: 13 })
		.withMessage('El RFC tiene que tener de 12 a 13 digitos')
		.matches(
			/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
		)
		.withMessage('El campo RFC no cumple con el formato adecuado'),
	body('entidad.*.NombreComercial')
		.optional()
		.isString()
		.withMessage('El campo NombreComercial debe ser una cadena de texto'),
	body('entidad.*.ClavePais')
		.notEmpty()
		.withMessage('El campo ClavePais no puede estar vacío')
		.isString()
		.withMessage('El campo ClavePais debe ser una cadena de texto'),
	body('entidad.*.TaxId')
	    .optional()
	    .isString(),
	body('entidad.*.ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('El campo ClaveRegimenFiscal no puede estar vacío')
		.isString()
		.withMessage('El campo ClaveRegimenFiscal debe ser una cadena de texto'),
	body('entidad.*.PersonaFisica')
		.notEmpty()
		.withMessage('El campo PersonaFisica no puede estar vacío')
		.isBoolean()
		.withMessage('El campo PersonaFisica debe ser un booleano'),
	body('entidad.*.PersonaMoral')
		.notEmpty()
		.withMessage('El campo PersonaMoral no puede estar vacío')
		.isBoolean()
		.withMessage('El campo PersonaMoral debe ser un booleano'),
	body('entidad.*.Estatus')
		.notEmpty()
		.withMessage('El campo Estatus no puede estar vacio')
		.isBoolean()
		.withMessage('El campo Estatus debe ser un booleano'),
	body('domicilio.*.Calle')
		.notEmpty()
		.withMessage('El campo Calle no puede estar vacío')
		.isString()
		.withMessage('El campo Calle debe ser una cadena de texto'),
	body('domicilio.*.NumeroExt')
		.notEmpty()
		.withMessage('El campo NumeroExt no puede estar vacío')
		.isString()
		.withMessage('El campo NumeroExt debe ser una cadena de texto'),
	body('domicilio.*.NumeroInt')
		.notEmpty()
		.withMessage('El campo NumeroInt no puede estar vacío')
		.isString()
		.withMessage('El campo NumeroInt debe ser una cadena de texto'),
	body('domicilio.*.CodigoPostal')
		.notEmpty()
		.withMessage('El campo CodigoPostal no puede estar vacío')
		.isString()
		.withMessage('El campo CodigoPostal debe ser una cadena de texto'),
	body('domicilio.*.ClaveEstado')
		.notEmpty()
		.withMessage('El campo ClaveEstado no puede estar vacío')
		.isString()
		.withMessage('El campo ClaveEstado debe ser una cadena de texto'),
	body('domicilio.*.ClaveMunicipio')
		.notEmpty()
		.withMessage('El campo ClaveMunicipio no puede estar vacío')
		.isString()
		.withMessage('El campo ClaveMunicipio debe ser una cadena de texto'),
	body('domicilio.*.ClaveLocalidad')
		.notEmpty()
		.withMessage('El campo ClaveLocalidad no puede estar vacío')
		.isString()
		.withMessage('El campo ClaveLocalidad debe ser una cadena de texto'),
	body('domicilio.*.ClaveColonia')
		.notEmpty()
		.withMessage('El campo ClaveColonia no puede estar vacío')
		.isString()
		.withMessage('El campo ClaveColonia debe ser una cadena de texto'),
	body('domicilio.*.ClavePais')
		.notEmpty()
		.withMessage('El campo ClavePais no puede estar vacío')
		.isString()
		.withMessage('El campo ClavePais debe ser una cadena de texto'),
];

export const crearEmpresaContactoSchema = [
	body('contacto.*.ActualizadoPor')
		.optional()
];


export const editarContactoEmailsSchema = [
	body('email.*.Email')
		.optional()
];