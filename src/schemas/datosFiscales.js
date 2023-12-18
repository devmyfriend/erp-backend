import { body } from 'express-validator';

export const buscarRFC = [
    body('RFC')
        .notEmpty()
        .withMessage('El campo RFC no puede estar vacío')
        .isString()
        .isLength({min: 13, max:13})
        .regex.test(/^(\+123)\d{11}$/)
        .withMessage('El campo RFC debe ser una cadena de texto'),
];