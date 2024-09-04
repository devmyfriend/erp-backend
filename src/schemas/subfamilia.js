import { body, param } from 'express-validator';

export const buscarSubfamiliasPorNombreSchema = [
    param('NombreSubFamilia')
        .notEmpty()
        .withMessage('El nombre de la subfamilia no puede estar vacío')
        .isString()
        .withMessage('El nombre de la subfamilia debe ser una cadena de texto')
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre de la subfamilia debe tener entre 3 y 255 caracteres'),
];

export const buscarSubfamiliasPorFamiliaIdSchema = [
    param('FamiliaId')
        .notEmpty()
        .withMessage('El id de la familia es requerido')
        .isInt()
        .withMessage('El id de la familia debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la familia debe tener una longitud entre 1 y 11 caracteres'),
];

export const crearSubfamiliaSchema = [
    body('NombreSubFamilia')
        .notEmpty()
        .withMessage('El nombre de la subfamilia es requerido')
        .isString()
        .withMessage('El nombre de la subfamilia debe ser una cadena de texto')
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre de la subfamilia debe tener entre 3 y 50 caracteres'),
    body('FamiliaId')
        .notEmpty()
        .withMessage('El id de la familia es requerido')
        .isInt()
        .withMessage('El id de la familia debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la familia debe tener una longitud entre 1 y 11 caracteres'),
    body('CreadoPor')
        .notEmpty()
        .withMessage('El usuario creador es requerido')
        .isString()
        .withMessage('El usuario creador debe ser una cadena de texto'),
];

export const actualizarSubfamiliaSchema = [
    body('SubFamiliaId')
    .notEmpty()
    .withMessage('El id de la subfamilia es requerido')
    .isInt()
    .withMessage('El id de la subfamilia debe ser un número entero')
    .isLength({ min: 1, max: 11 })
    .withMessage('El id de la subfamilia debe tener una longitud entre 1 y 11 caracteres'),
    body('NombreSubFamilia')
    .notEmpty()
    .withMessage('El nombre de la subfamilia es requerido')
    .isString()
    .withMessage('El nombre de la subfamilia debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de la subfamilia debe tener entre 3 y 50 caracteres'),
    body('ActualizadoPor')
    .notEmpty()
    .withMessage('El usuario que actualiza es requerido')
    .isInt()
    .withMessage('El usuario que actualiza debe ser un número entero'),
];

export const borrarSubfamiliaSchema = [
    body('SubFamiliaId')
        .notEmpty()
        .withMessage('El id de la subfamilia es requerido')
        .isInt()
        .withMessage('El id de la subfamilia debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la subfamilia debe tener una longitud entre 1 y 11 caracteres'),
];
