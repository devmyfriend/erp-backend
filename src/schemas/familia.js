import { body, param } from 'express-validator';

export const buscarFamiliasPorNombreSchema = [
    param('NombreFamilia')
        .notEmpty()
        .withMessage('El nombre de la familia no puede estar vacío')
        .isString()
        .withMessage('El nombre de la familia debe ser una cadena de texto')
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre de la familia debe tener entre 3 y 255 caracteres'),
];

export const crearFamiliaSchema = [
    body('NombreFamilia')
    .notEmpty()
    .withMessage('El nombre de la familia es requerido')
    .isString()
    .withMessage('El nombre de la familia debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de la familia debe tener entre 3 y 50 caracteres'),
    body('CreadoPor')
    .notEmpty()
    .withMessage('El usuario creador es requerido')
    .isString()
    .withMessage('El usuario creador debe ser una cadena de texto'),
];

export const actualizarFamiliaSchema = [
    body('FamiliaId')
    .notEmpty()
    .withMessage('El id de la familia es requerido')
    .isInt()
    .withMessage('El id de la familia debe ser un número entero')
    .isLength({ min: 1, max: 11 })
    .withMessage('El id de la familia debe tener una longitud entre 1 y 11 caracteres'),
    body('NombreFamilia')
    .notEmpty()
    .withMessage('El nombre de la familia es requerido')
    .isString()
    .withMessage('El nombre de la familia debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de la familia debe tener entre 3 y 50 caracteres'),
    body('ActualizadoPor')
    .notEmpty()
    .withMessage('El usuario que actualiza es requerido')
    .isInt()
    .withMessage('El usuario que actualiza debe ser un número entero'),
];

export const borrarFamiliaSchema = [
    body('FamiliaId')
        .notEmpty()
        .withMessage('El id de la familia es requerido')
        .isInt()
        .withMessage('El id de la familia debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la familia debe tener una longitud entre 1 y 11 caracteres'),
];
