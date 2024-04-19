import { body } from 'express-validator';

export const createCompoundTaxSchema = [
    body('NombreImpuesto')
    .isString()
    .withMessage('El campo NombreImpuesto debe ser un string')
    .notEmpty()
    .withMessage('El campo NombreImpuesto es requerido'),
    body('ClaveImpuesto')
    .isInt()
    .withMessage('El campo ClaveImpuesto debe ser un número')
    .notEmpty()
    .withMessage('El campo ClaveImpuesto es requerido')
    .isLength({ min: 1, max: 3 })
    .withMessage('El campo ClaveImpuesto debe tener entre 1 y 3 carácteres'),
    body('CreadoPor')
    .isInt()
    .withMessage('El campo CreadoPor debe ser un número')
    .notEmpty()
    .withMessage('El campo CreadoPor es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo CreadoPor debe tener entre 1 y 11 carácteres'),
];

export const updateCompoundTaxSchema = [
    body('cfgImpuestoId')
    .isInt()
    .withMessage('El campo cfgImpuestoId debe ser de tipo int')
    .notEmpty()
    .withMessage('El campo cfgImpuestoId es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo cfgImpuestoId debe tener entre 1 y 11 carácateres'),
body('NombreImpuesto')
    .isString()
    .withMessage('El campo NombreImpuesto debe ser un string')
    .notEmpty()
    .withMessage('El campo NombreImpuesto es requerido'),
body('ClaveImpuesto')
    .isString()
    .withMessage('El campo ClaveImpuesto debe ser un string')
    .notEmpty()
    .withMessage('El campo ClaveImpuesto es requerido')
    .isLength({ min: 1, max: 3 })
    .withMessage('El campo ClaveImpuesto debe tener entre 1 y 3 carácteres'),
body('ActualizadoPor')
    .isInt()
    .withMessage('El campo ActualizadoPor debe ser un número')
    .notEmpty()
    .withMessage('El campo ActualizadoPor es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo ActualizadoPor debe tener entre 1 y 11 carácteres'),
];