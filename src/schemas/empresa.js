import { body } from 'express-validator';

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
		.isLength({ min: 12, max: 13 })
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
		.isInt()
		.withMessage('El campo ClaveRegimenFiscal debe ser un entero'),
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
	body('domicilio.*.Estado')
		.optional()
		.isString()
		.withMessage('El campo Estado debe ser una cadena de texto'),
	body('domicilio.*.Municipio')
		.optional()
		.isString()
		.withMessage('El campo Municipio debe ser una cadena de texto'),
	body('domicilio.*.Localidad')
		.optional()
		.isString()
		.withMessage('El campo Localidad debe ser una cadena de texto'),
	body('domicilio.*.Colonia')
		.optional()
		.isString()
		.withMessage('El campo Colonia debe ser una cadena de texto'),
	body('domicilio.*.Pais')
		.optional()
		.isString()
		.withMessage('El campo Pais debe ser una cadena de texto'),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacio')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un entero'),
];

export const crearEmpresaSchema = [
	body('entidad.*.NombreOficial')
		.notEmpty()
		.withMessage('El campo NombreOficial no puede estar vacío')
		.isString()
		.withMessage('El campo NombreOficial debe ser una cadena de texto'),
	body('entidad.*.RFC')
		.isString()
		.notEmpty()
		.withMessage('El campo RFC no puede estar vacío')
		.isLength({ min: 12, max: 13 })
		.withMessage('El RFC tiene que tener de 12 a 13 digitos')
	,
	body('entidad.*.NombreComercial')
		.optional()
		.isString()
		.withMessage('El campo NombreComercial debe ser una cadena de texto'),
	body('entidad.*.ClavePais')
		.notEmpty()
		.withMessage('El campo Pais no puede estar vacío')
		.isString()
		.withMessage('El campo Pais debe ser una cadena de texto'),
	body('entidad.*.TaxId')
		.optional()
		.isString(),
	body('entidad.*.ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('El campo ClaveRegimenFiscal no puede estar vacío')
		.isInt()
		.withMessage('El campo ClaveRegimenFiscal debe ser un entero'),
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
	body('domicilio.*.Estado')
		.notEmpty()
		.withMessage('El campo Estado no puede estar vacío')
		.isString()
		.withMessage('El campo Estado debe ser una cadena de texto'),
	body('domicilio.*.Municipio')
		.notEmpty()
		.withMessage('El campo Municipio no puede estar vacío')
		.isString()
		.withMessage('El campo Municipio debe ser una cadena de texto'),
	body('domicilio.*.Localidad')
		.notEmpty()
		.withMessage('El campo Localidad no puede estar vacío')
		.isString()
		.withMessage('El campo Localidad debe ser una cadena de texto'),
	body('domicilio.*.Colonia')
		.notEmpty()
		.withMessage('El campo Colonia no puede estar vacío')
		.isString()
		.withMessage('El campo Colonia debe ser una cadena de texto'),
	body('domicilio.*.Pais')
		.notEmpty()
		.withMessage('El campo Pais no puede estar vacío')
		.isString()
		.withMessage('El campo Pais debe ser una cadena de texto'),
	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un entero'),
];

export const crearEmpresaContactoSchema = [
	body('EmpresaId')
		.notEmpty()
		.withMessage('El campo EmpresaId no puede estar vacío')
		.isInt()
		.withMessage('El campo EmpresaId debe ser un número entero'),
	body('Nombres')
		.notEmpty()
		.withMessage('El campo Nombres no puede estar vacío')
		.isString()
		.withMessage('El campo Nombres debe ser una cadena de texto'),
	body('ApellidoPaterno')
		.notEmpty()
		.withMessage('El campo ApellidoPaterno no puede estar vacío')
		.isString()
		.withMessage('El campo ApellidoPaterno debe ser una cadena de texto'),
	body('ApellidoMaterno')
		.notEmpty()
		.withMessage('El campo ApellidoMaterno no puede estar vacío')
		.isString()
		.withMessage('El campo ApellidoMaterno debe ser una cadena de texto'),
	body('Departamento')
		.notEmpty()
		.withMessage('El campo Departamento no puede estar vacío')
		.isString()
		.withMessage('El campo Departamento debe ser una cadena de texto'),
	body('Puesto')
		.notEmpty()
		.withMessage('El campo Puesto no puede estar vacío')
		.isString()
		.withMessage('El campo Puesto debe ser una cadena de texto'),
	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero'),
];

export const editarEmpresaContactoSchema = [
	body('EntidadNegocioId')
		.notEmpty()
		.withMessage('El campo EntidadNegocioId no puede estar vacío')
		.isInt()
		.withMessage('El campo EntidadNegocioId debe ser un número entero'),
	body('ContactoId')
		.notEmpty()
		.withMessage('El campo ContactoId no puede estar vacío')
		.isInt()
		.withMessage('El campo ContactoId debe ser un número entero'),
	body('Nombres')
		.optional()
		.isString()
		.withMessage('El campo Nombres debe ser una cadena de texto'),
	body('ApellidoPaterno')
		.optional()
		.isString()
		.withMessage('El campo ApellidoPaterno debe ser una cadena de texto'),
	body('ApellidoMaterno')
		.optional()
		.isString()
		.withMessage('El campo ApellidoMaterno debe ser una cadena de texto'),
	body('Departamento')
		.optional()
		.isString()
		.withMessage('El campo Departamento debe ser una cadena de texto'),
	body('Puesto')
		.optional()
		.isString()
		.withMessage('El campo Puesto debe ser una cadena de texto'),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero'),
];

export const crearEmpresaTelefonoSchema = [
	body('EntidadNegocioId')
		.notEmpty()
		.withMessage('El campo EntidadNegocioId no puede estar vacío')
		.isInt()
		.withMessage('El campo EntidadNegocioId debe ser un número entero'),
	body('NumeroTelefonico')
		.notEmpty()
		.withMessage('El campo NumeroTelefonico no puede estar vacío')
		.isString()
		.withMessage('El campo NumeroTelefonico debe ser una cadena de texto'),
	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero'),
];

export const editarEmpresaTelefonoSchema = [
	body('TelefonoId')
		.notEmpty()
		.withMessage('El campo TelefonoId no puede estar vacío')
		.isInt()
		.withMessage('El campo TelefonoId debe ser un número entero'),
	body('NumeroTelefonico')
		.optional()
		.isString()
		.withMessage('El campo NumeroTelefonico debe ser una cadena de texto'),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero'),
];

export const crearEmailEmpresaSchema = [
	body('EntidadNegocioId')
		.notEmpty()
		.withMessage('El campo EntidadNegocioId no puede estar vacío')
		.isInt()
		.withMessage('El campo EntidadNegocioId debe ser un número entero'),
	body('Email')
		.notEmpty()
		.withMessage('El campo Email no puede estar vacío')
		.isEmail()
		.withMessage('El campo Email debe ser un correo electrónico válido'),
	body('CreadorPor')
		.notEmpty()
		.withMessage('El campo CreadorPor no puede estar vacío')
		.isInt()
		.withMessage('El campo CreadorPor debe ser un número entero'),
];

export const editarEmpresaEmailsSchema = [
	body('EmailId')
		.notEmpty()
		.withMessage('El campo EntidadNegocioId no puede estar vacío')
		.isInt()
		.withMessage('El campo EntidadNegocioId debe ser un número entero'),
	body('Email')
		.optional()
		.isEmail()
		.withMessage('El campo Email debe ser un correo electrónico válido'),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero'),
];