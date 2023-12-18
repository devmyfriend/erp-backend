import { body } from 'express-validator';

export const buscarRFC = [
    body('RFC')
        .notEmpty()
        .withMessage('El campo RFC no puede estar vacío')
        .isString()
        .isLength({min: 13, max:13})
        .matches(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)
        .withMessage('El campo RFC debe ser una cadena de texto'),
];