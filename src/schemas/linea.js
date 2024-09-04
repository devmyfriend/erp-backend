import { body, param } from 'express-validator';

export const buscarLineasPorNombreSchema = [
    param('NombreLinea')
        .notEmpty()
        .withMessage('El nombre de la línea no puede estar vacío')
        .isString()
        .withMessage('El nombre de la línea debe ser una cadena de texto')
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre de la línea debe tener entre 3 y 255 caracteres'),
];

export const buscarLineasPorSubFamiliaIdSchema = [
    param('SubFamiliaId')
        .notEmpty()
        .withMessage('El id de la subfamilia es requerido')
        .isInt()
        .withMessage('El id de la subfamilia debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la subfamilia debe tener una longitud entre 1 y 11 caracteres'),
];

export const crearLineaSchema = [
    body('NombreLinea')
        .notEmpty()
        .withMessage('El nombre de la linea es requerido')
        .isString()
        .withMessage('El nombre de la linea debe ser una cadena de texto')
        .isLength({ min: 3, max: 50 })
        .withMessage('El nombre de la linea debe tener entre 3 y 50 caracteres'),
    body('SubFamiliaId')
        .notEmpty()
        .withMessage('El id de la subfamilia es requerido')
        .isInt()
        .withMessage('El id de la subfamilia debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la subfamilia debe tener una longitud entre 1 y 11 caracteres'),
    body('CreadoPor')
        .notEmpty()
        .withMessage('El usuario creador es requerido')
        .isString()
        .withMessage('El usuario creador debe ser una cadena de texto'),
];

export const actualizarLineaSchema = [
    body('LineaId')
    .notEmpty()
    .withMessage('El id de la línea es requerido')
    .isInt()
    .withMessage('El id de la línea debe ser un número entero')
    .isLength({ min: 1, max: 11 })
    .withMessage('El id de la línea debe tener una longitud entre 1 y 11 caracteres'),
    body('NombreLinea')
    .notEmpty()
    .withMessage('El nombre de la linea es requerido')
    .isString()
    .withMessage('El nombre de la linea debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de la linea debe tener entre 3 y 50 caracteres'),
    body('ActualizadoPor')
    .notEmpty()
    .withMessage('El usuario que actualiza es requerido')
    .isInt()
    .withMessage('El usuario que actualiza debe ser un número entero'),
];

export const borrarLineaSchema = [
    body('LineaId')
        .notEmpty()
        .withMessage('El id de la linea es requerido')
        .isInt()
        .withMessage('El id de la linea debe ser un número entero')
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la linea debe tener una longitud entre 1 y 11 caracteres'),
];
