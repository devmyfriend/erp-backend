import { body, param, query } from 'express-validator';

const pageSchema = query('page').optional().isInt({ min: 1 }).withMessage('La página debe ser un número entero mayor o igual a 1');

export const obtenerUbicacionesSchema = [
    pageSchema
];

export const buscarUbicacionesPorNombreSchema = [
    param('Nombre')
        .notEmpty()
        .withMessage('El nombre de la ubicación no puede estar vacío')
        .isString()
        .withMessage('El nombre de la ubicación debe ser una cadena de texto')
        .isLength({ min: 3, max: 255 })
        .withMessage('El nombre de la ubicación debe tener entre 3 y 255 caracteres'),
    pageSchema
];

export const crearUbicacionSchema = [
    body('Nombre')
    .notEmpty()
    .withMessage('El nombre de la ubicación es requerido')
    .isString()
    .withMessage('El nombre de la ubicación debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de la ubicación debe tener entre 3 y 50 caracteres'),
    body('CreadoPor')
    .notEmpty()
    .withMessage('El usuario creador es requerido')
    .isString()
    .withMessage('El usuario creador debe ser una cadena de texto'),
];

export const actualizarUbicacionesSchema = [
    body('UbicacionId')
    .notEmpty()
    .withMessage('El id de la ubicación es requerido')
    .isInt()
    .withMessage('El id de la ubicación debe ser un número entero')
    .isLength({ min: 1, max: 11 })
    .withMessage('El id de la ubicación debe tener una longitud entre 1 y 11 caracteres'),
    body('Nombre')
    .notEmpty()
    .withMessage('El nombre de la ubicación es requerido')
    .isString()
    .withMessage('El nombre de la ubicación debe ser una cadena de texto')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de la ubicación debe tener entre 3 y 50 caracteres'),
    body('ActualizadoPor')
    .notEmpty()
    .withMessage('El usuario que actualiza es requerido')
    .isInt()
    .withMessage('El usuario que actualiza debe ser un número entero'),
];

export const borrarUbicacionesSchema = [
    body('UbicacionId')
        .notEmpty()
        .withMessage('El id de la ubicación es requerido')
        .isInt()
        .withMessage('El id de la ubicación debe ser un número entero')        
        .isLength({ min: 1, max: 11 })
        .withMessage('El id de la ubicación debe tener una longitud entre 1 y 11 caracteres'),
    body('BorradoPor')
        .notEmpty()
        .withMessage('El usuario que borra es requerido')
        .isInt()
        .withMessage('El usuario que borra debe ser un número entero'),
];