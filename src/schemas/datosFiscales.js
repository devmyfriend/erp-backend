import { body } from 'express-validator';
import { EntidadNegocio } from "../models/orgEntidadesnegocio.model.js";

export const buscarRFC = [
    body('RFC')
        .notEmpty()
        .withMessage('El campo RFC no puede estar vacío')
        .isString()
        .isLength({min: 13, max:13})
        .matches(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)
        .withMessage('El campo RFC debe ser una cadena de texto'),
];

export const crearIdEmpresaSchema = [
    body('entidad.NombreOficial')
    .notEmpty()
    .withMessage('El campo NombreOficial no puede estar vacío')
    .isString()
    .withMessage('El campo NombreOficial debe ser una cadena de texto'),
    body('entidad.RFC')
    .isString()
    .isLength({min: 12, max:13})
    .matches(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)
    .withMessage('El campo RFC debe ser una cadena de texto'),
    body('entidad.NombreComercial')
        .optional()
        .isString()
        .withMessage('El campo NombreComercial debe ser una cadena de texto'),
    body('entidad.ClavePais')
        .notEmpty()
        .withMessage('El campo ClavePais no puede estar vacío')
        .isString()
        .withMessage('El campo ClavePais debe ser una cadena de texto'),
    body('entidad.TaxId')
        .optional()
        .isString(),
    body('entidad.ClaveRegimenFiscal')
        .notEmpty()
        .withMessage('El campo ClaveRegimenFiscal no puede estar vacío')
        .isString()
        .withMessage('El campo ClaveRegimenFiscal debe ser una cadena de texto'),
    body('entidad.PersonaFisica')
        .notEmpty()
        .withMessage('El campo PersonaFisica no puede estar vacío')
        .isBoolean()
        .withMessage('El campo PersonaFisica debe ser un booleano'),
    body('entidad.PersonaMoral')
        .notEmpty()
        .withMessage('El campo PersonaMoral no puede estar vacío')
        .isBoolean()
        .withMessage('El campo PersonaMoral debe ser un booleano'),
    body('entidad.Estatus')
        .notEmpty()
        .withMessage('El campo Estatus no puede estar vacio')
        .isBoolean()
        .withMessage('El campo Estatus debe ser un booleano'),
]; 