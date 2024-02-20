import { body } from "express-validator";

export const createTypeOfReceiptSchema = [
    body('ClaveTipoDeComprobante')
        .notEmpty()
        .withMessage('La clave del tipo de comprobante es requerida')
        .isString()
        .withMessage('La clave del tipo de comprobante debe ser una cadena de texto')
        .isLength({ min: 1, max: 1 })
        .withMessage('La clave del tipo de comprobante debe tener una longitud de 1 caracter'),
    body('Descripcion')
        .notEmpty()
        .withMessage('La descripción del tipo de comprobante es requerida')
        .isString()
        .withMessage('La descripción del tipo de comprobante debe ser una cadena de texto'),
   ]

export const updateTypeOfReceiptSchema = [
    body('ClaveTipoDeComprobante')
        .notEmpty()
        .withMessage('La clave del tipo de comprobante es requerida')
        .isString()
        .withMessage('La clave del tipo de comprobante debe ser una cadena de texto')
        .isLength({ min: 1, max: 1 })
        .withMessage('La clave del tipo de comprobante debe tener una longitud de 1 caracter'),
    body('Descripcion')
        .notEmpty()
        .withMessage('La descripción del tipo de comprobante es requerida')
        .isString()
        .withMessage('La descripción del tipo de comprobante debe ser una cadena de texto'),
   ]