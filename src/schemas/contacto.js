import { body } from 'express-validator';

export const crearContactoSchema = [
	body('SucursalId')
		.notEmpty()
		.withMessage('El campo SucursalId no puede estar vacío')
		.isInt()
		.withMessage('El campo SucursalId debe ser un número entero'),
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
	body('Nombres')
		.notEmpty()
		.withMessage('El campo Nombres no puede estar vacío')
		.isString()
		.withMessage('El campo Nombres debe ser una cadena de texto'),
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
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero'),
];

export const actualizarContactoSchema = [
	body('ContactoId')
		.notEmpty()
		.withMessage('El campo ContactoId no puede estar vacío')
		.isInt()
		.withMessage('El campo ContactoId debe ser un número entero'),
	body('SucursalId')
		.optional()
		.isInt()
		.withMessage('El campo SucursalId debe ser un número entero'),
	body('ApellidoPaterno')
		.optional()
		.isString()
		.withMessage('El campo ApellidoPaterno debe ser una cadena de texto'),
	body('ApellidoMaterno')
		.optional()
		.isString()
		.withMessage('El campo ApellidoMaterno debe ser una cadena de texto'),
	body('Nombres')
		.optional()
		.isString()
		.withMessage('El campo Nombres debe ser una cadena de texto'),
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

export const desactivarContactoSchema = [
	body('ContactoId')
		.notEmpty()
		.withMessage('El campo ContactoId no puede estar vacío')
		.isInt()
		.withMessage('El campo ContactoId debe ser un número entero'),
	body('BorradoPor')
		.notEmpty()
		.withMessage('El campo BorradoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero'),
];

export const crearCorreoSchema = [
	body('Email')
		.notEmpty()
		.withMessage('El campo Email no puede estar vacío')
		.isEmail()
		.withMessage('El campo Email debe ser una dirección de correo válida'),
	body('ContactoId')
		.notEmpty()
		.withMessage('El campo ContactoId no puede estar vacío')
		.isInt()
		.withMessage('El campo ContactoId debe ser un número entero'),
	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero'),
];

export const editarCorreoSchema = [
	body('EmailId')
		.notEmpty()
		.withMessage('El campo EmailId no puede estar vacío')
		.isInt()
		.withMessage('El campo EmailId debe ser un número entero'),
	body('Email')
		.notEmpty()
		.withMessage('El campo Email no puede estar vacío')
		.isEmail()
		.withMessage('El campo Email debe ser una dirección de correo válida'),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero'),
];

export const desactivarCorreoSchema = [
	body('EmailId')
		.notEmpty()
		.withMessage('El campo EmailId no puede estar vacío')
		.isInt()
		.withMessage('El campo EmailId debe ser un número entero'),
	body('BorradoPor')
		.notEmpty()
		.withMessage('El campo BorradoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero'),
];

export const crearTelefonoSchema = [
	body('NumeroTelefonico')
		.notEmpty()
		.withMessage('El campo NumeroTelefonico no puede estar vacío')
		.isString()
		.withMessage('El campo NumeroTelefonico debe un string'),
	body('ContactoId')
		.notEmpty()
		.withMessage('El campo ContactoId no puede estar vacío')
		.isInt()
		.withMessage('El campo ContactoId debe ser un número entero'),
	body('CreadoPor')
		.notEmpty()
		.withMessage('El campo CreadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo CreadoPor debe ser un número entero'),
];

export const editarTelefonoSchema = [
	body('TelefonoId')
		.notEmpty()
		.withMessage('El campo TelefonoId no puede estar vacío')
		.isInt()
		.withMessage('El campo TelefonoId debe ser un string'),
	body('NumeroTelefonico')
		.notEmpty()
		.withMessage('El campo NumeroTelefonico no puede estar vacío')
		.isString()
		.withMessage('El campo NumeroTelefonico debe ser un número entero'),
	body('ActualizadoPor')
		.notEmpty()
		.withMessage('El campo ActualizadoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo ActualizadoPor debe ser un número entero'),
];

export const desactivarTelefonoSchema = [
	body('TelefonoId')
		.notEmpty()
		.withMessage('El campo TelefonoId no puede estar vacío')
		.isInt()
		.withMessage('El campo TelefonoId debe ser un número entero'),
	body('BorradoPor')
		.notEmpty()
		.withMessage('El campo BorradoPor no puede estar vacío')
		.isInt()
		.withMessage('El campo BorradoPor debe ser un número entero'),
];

export const BuscarContactoSchema = [
	body('Nombre')
		.notEmpty()
		.withMessage('El campo Nombre no puede estar vacío')
		.isString()
		.withMessage('El campo Nombre debe ser una cadena de texto'),
	body('SucursalId')
		.isInt()
		.withMessage('El campo SucursalId debe ser un número entero')
		.notEmpty()
		.withMessage('El campo  SucursalId no puede estar vacío'),
];
