import { body } from "express-validator";

export const createUbication = [
    body('Nombre')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser una cadena de texto'),
    body('CreadoPor')
        .notEmpty()
        .withMessage('El usuario creador es requerido')
        .isString()
        .withMessage('El usuario creador debe ser una cadena de texto'),
]

export const updateUbication = [
    body('UbicacionId')
    .notEmpty()
    .withMessage('El id de la ubicación es requerido')
    .isInt()
    .withMessage('El id de la ubicación debe ser un número entero'),
    body('Nombre')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto'),
    body('ActualizadoPor')
    .notEmpty()
    .withMessage('El usuario actualizador es requerido')
    .isString()
    .withMessage('El usuario actualizador debe ser una cadena de texto'),
]

export const deleteUbication = [
    body('UbicacionId')
    .notEmpty()
    .withMessage('El id de la ubicación es requerido')
    .isInt()
    .withMessage('El id de la ubicación debe ser un número entero'),
    body('BorradoPor')
    .notEmpty()
    .withMessage('El usuario que borra es requerido')
    .isString()
    .withMessage('El usuario que borra debe ser una cadena de texto'),
]