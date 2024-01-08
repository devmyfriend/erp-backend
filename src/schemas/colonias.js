import { body } from 'express-validator';

export const crearColoniaSchema = [
    body('ClaveColonia')
    .optional()
    .isString()
    .withMessage('El campo ClaveColonia debe ser una cadena de texto'),
    body('CodigoPostal')
    .notEmpty()
    .withMessage('El campo CodigoPostal no puede estar vacío')
    .isString()
    .withMessage('El campo CodigoPostal debe ser una cadena de texto'),
    body('Nombre')
    .optional()
    .isString()
    .withMessage('El campo Nombre debe ser una cadena de texto'),
];