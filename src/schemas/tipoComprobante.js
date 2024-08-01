import { body } from "express-validator";

export const crearTiposComprobantesSchema = [
    body('ClaveTipoDeComprobante')
        .notEmpty()
        .withMessage('La clave del tipo de comprobante es requerida')
        .isString()
        .withMessage('La clave del tipo de comprobante debe ser una cadena de texto')
        .isLength({ min: 1, max: 1 })
        .withMessage('La clave del tipo de comprobante debe tener una longitud de 1 carácter'),
    body('Descripcion')
        .notEmpty()
        .withMessage('La descripción del tipo de comprobante es requerida')
        .isString()
        .withMessage('La descripción del tipo de comprobante debe ser una cadena de texto')
        .isLength({ min: 3, max: 255 })
        .withMessage('La descripción del tipo de comprobante debe tener una longitud máxima de 255 caracteres')
];

export const actualizarTiposComprobantesSchema = [
    body('ClaveTipoDeComprobante')
        .notEmpty()
        .withMessage('La clave del tipo de comprobante es requerida')
        .isString()
        .withMessage('La clave del tipo de comprobante debe ser una cadena de texto')
        .isLength({ min: 1, max: 1 })
        .withMessage('La clave del tipo de comprobante debe tener una longitud de 1 carácter'),
    body('Descripcion')
        .optional()
        .isString()
        .withMessage('La descripción del tipo de comprobante debe ser una cadena de texto')
        .isLength({ min: 3, max: 255 })
        .withMessage('La descripción del tipo de comprobante debe tener una longitud máxima de 255 caracteres')
];

export const borrarTiposComprobantesSchema = [
    body('ClaveTipoDeComprobante')
    .notEmpty()
    .withMessage('La clave del tipo de comprobante es requerida')
    .isString()
    .withMessage('La clave del tipo de comprobante debe ser una cadena de texto')
    .isLength({ min: 1, max: 1 })
    .withMessage('La clave del tipo de comprobante debe tener una longitud de 1 carácter')
];
