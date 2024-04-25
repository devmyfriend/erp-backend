import { body, param } from 'express-validator';

export const TaxSchema = [
body('ClaveImpuesto')
    .isString()
    .withMessage('El campo ClaveImpuesto debe ser un string')
    .notEmpty()
    .withMessage('El campo ClaveImpuesto es requerido'),
body('Nombre')
    .isString()
    .withMessage('El campo Nombre debe ser un string')
    .notEmpty()
    .withMessage('El campo Nombre es requerido'),
];

export const findTaxByNameSchema = [
body('Nombre')
    .isString()
    .withMessage('El campo Nombre debe ser un string')
    .notEmpty()
    .withMessage('El campo Nombre es requerido'),
];

export const deleteTaxSchema = [
    param('id')
        .isString()
        .withMessage('El campo id debe ser un string')
        .notEmpty()
        .withMessage('El campo id es requerido'),
];
