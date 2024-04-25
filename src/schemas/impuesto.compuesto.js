import { body } from 'express-validator';

export const CompoundTaxSchema = [
body('Nombre')
    .isString()
    .withMessage('El campo Nombre debe ser un string')
    .notEmpty()
    .withMessage('El campo Nombre es requerido'),
body('Predeterminado')
    .isBoolean()
    .withMessage('El campo Predeterminado debe ser un booleano')
    .notEmpty()
    .withMessage('El campo Predeterminado es requerido'),

];

export const createCompoundTaxSchema = [
...CompoundTaxSchema,
body('CreadoPor')
    .isInt()
    .withMessage('El campo CreadoPor debe ser un número')
    .notEmpty()
    .withMessage('El campo CreadoPor es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo CreadoPor debe tener entre 1 y 11 carácteres')
];

export const updateCompoundTaxSchema = [
body('ImpuestoCompuestoId')
    .isInt()
    .withMessage('El campo ImpuestoCompuestoId debe ser de tipo int')
    .notEmpty()
    .withMessage('El campo ImpuestoCompuestoId es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo ImpuestoCompuestoId debe tener entre 1 y 11 carácateres'),
...CompoundTaxSchema,
body('ActualizadoPor')
    .isInt()
    .withMessage('El campo ActualizadoPor debe ser un número')
    .notEmpty()
    .withMessage('El campo ActualizadoPor es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo ActualizadoPor debe tener entre 1 y 11 carácteres'),
]

export const deleteCompoundTaxSchema = [
    body('ImpuestoCompuestoId')
    .isInt()
    .withMessage('El campo ImpuestoCompuestoId debe ser de tipo int')
    .notEmpty()
    .withMessage('El campo ImpuestoCompuestoId es requerido')
    .isLength({ min: 1, max: 11 })
    .withMessage('El campo ImpuestoCompuestoId debe tener entre 1 y 11 carácateres'),
];

export const findByNameCompoundTaxSchema = [
    body('Nombre')
    .isString()
    .withMessage('El campo Nombre debe ser un string')
    .notEmpty()
    .withMessage('El campo Nombre es requerido'),
];