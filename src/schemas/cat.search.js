import { body } from 'express-validator';

export const findPostalCodeSchema = [
	body('cp')
		.isInt()
		.withMessage('El código postal debe ser un numero entero')
		.notEmpty()
		.withMessage('El código postal es obligatorio y debe ser un numero entero'),
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
	body('ClaveMoneda')
		.notEmpty()
		.withMessage('El codigo de moneda no puede estar vacia')
		.isLength({ min: 3, max: 3 })
		.withMessage('El codigo moneda tiene que ser de 3 caracteres')
		.isString()
		.withMessage('El codigo moneda tiene que ser un valor de texto o numero'),
	body('Descripcion')
		.notEmpty()
		.withMessage('No puedes dejar la descripcion vacia, llena el campo')
		.isString()
		.withMessage('El campo descripcion tiene que ser una cadena de texto'),
];

export const updateTypeCoinSchema = [
	body('ClaveMoneda')
		.notEmpty()
		.isString()
		.withMessage('El codigo de la moneda no puede estar vacia'),
	body('Descripcion')
		.optional()
		.isString()
		.withMessage('La descripcion no puede estar vacia'),
];

export const deleteTypeCoinSchema = [
	body('ClaveMoneda')
		.notEmpty()
		.isString()
		.withMessage('El codigo de la moneda no puede estar vacia'),
];

export const createSatFKSchema = [
	body('ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('La clave del régimen fiscal no puede estar vacía')
		.isString()
		.withMessage('La clave del régimen fiscal tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripción no puede estar vacía')
		.isString()
		.withMessage('La descripción tiene que ser una cadena de texto')
		.isLength({ max: 255 })
		.withMessage('La descripción no puede tener más de 255 caracteres'),
	body('Fisica')
		.notEmpty()
		.withMessage('El estatus de la persona física no puede estar vacío')
		.isBoolean()
		.withMessage('El estatus de la persona física tiene que ser un valor booleano'),
	body('Moral')
		.notEmpty()
		.withMessage('El estatus de la persona moral no puede estar vacío')
		.isBoolean()
		.withMessage('El estatus de la persona moral tiene que ser un valor booleano'),
];

export const editSatFKSchema = [
	body('ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('La clave del régimen fiscal no puede estar vacía')
		.isString()
		.withMessage('La clave del régimen fiscal tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
	body('Descripcion')
		.optional()
		.isString()
		.withMessage('La descripción tiene que ser una cadena de texto')
		.isLength({ max: 255 })
		.withMessage('La descripción no puede tener más de 255 caracteres'),
	body('Fisica')
		.optional()
		.isBoolean()
		.withMessage('El estatus de la persona física tiene que ser un valor booleano'),
	body('Moral')
		.optional()
		.isBoolean()
		.withMessage('El estatus de la persona moral tiene que ser un valor booleano'),
];

export const deleteSatFKSchema = [
	body('ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('La clave del régimen fiscal no puede estar vacía')
		.isString()
		.withMessage('La clave del régimen fiscal tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
];

export const createCFDISchema = [
	body('ClaveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripción no puede estar vacía')
		.isString()
		.withMessage('La descripción tiene que ser una cadena de texto')
		.isLength({ max: 255 })
		.withMessage('La descripción no puede tener más de 255 caracteres'),
	body('Fisica')
		.notEmpty()
		.withMessage('El estatus de la persona física no puede estar vacío')
		.isBoolean()
		.withMessage('El estatus de la persona física tiene que ser un valor booleano'),
	body('Moral')
		.notEmpty()
		.withMessage('El estatus de la persona moral no puede estar vacío')
		.isBoolean()
		.withMessage('El estatus de la persona moral tiene que ser un valor booleano'),
];

export const editCFDISchema = [
	body('ClaveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
	body('Descripcion')
		.optional()
		.isString()
		.withMessage('La descripción tiene que ser una cadena de texto')
		.isLength({ max: 255 })
		.withMessage('La descripción no puede tener más de 255 caracteres'),
	body('Fisica')
		.optional()
		.isBoolean()
		.withMessage('El estatus de la persona física tiene que ser un valor booleano'),
	body('Moral')
		.optional()
		.isBoolean()
		.withMessage('El estatus de la persona moral tiene que ser un valor booleano'),
];

export const deleteCFDISchema = [
	body('ClaveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
];

export const createCFDIRegimenSchema = [
	body('regimen.ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('La clave del régimen fiscal no puede estar vacía')
		.isString()
		.withMessage('La clave del régimen fiscal tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
	body('cfdi')
		.isArray({ min: 1 })
		.withMessage('Debe proporcionar al menos un CFDI'),
	body('cfdi.*.ClaveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
];

export const deleteCFDIRegimenSchema = [
	body('regimen.ClaveRegimenFiscal')
		.notEmpty()
		.withMessage('La clave del régimen fiscal no puede estar vacía')
		.isString()
		.withMessage('La clave del régimen fiscal tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
	body('cfdi.ClaveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
];

export const linkCfdiToRegimenSchema = [
	body('claveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
	body('regimenes')
		.isArray({ min: 1 })
		.withMessage('Debe proporcionar al menos un régimen fiscal'),
	body('regimenes.*')
		.notEmpty()
		.withMessage('La clave del régimen fiscal no puede estar vacía')
		.isString()
		.withMessage('La clave del régimen fiscal tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
];

export const deleteCFDIToRegimenSchema = [
	body('claveUsoCFDI')
		.notEmpty()
		.withMessage('La clave del uso del CFDI no puede estar vacía')
		.isString()
		.withMessage('La clave del uso del CFDI tiene que ser una cadena de texto')
		.isLength({ min: 3, max: 4 })
		.withMessage('La clave CFDI tiene que tener entre 3 y 4 caracteres'),
	body('regimenes')
		.isArray({ min: 1 })
		.withMessage('Debe proporcionar al menos un régimen para desvincular')
		.custom((value) => {
			return value.every(item => typeof item === 'string');
		})
		.withMessage('Las claves de los regímenes deben ser cadenas de texto')
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del régimen fiscal debe tener exactamente 3 caracteres'),
];