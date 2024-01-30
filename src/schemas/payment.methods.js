import { body } from 'express-validator'

export const createPaymentMethodsSchema = [
    body('ClaveFormaPago')
        .notEmpty()
        .withMessage('La clave del método de pago es requerida')
        .isString()
        .withMessage('La clave del método de pago debe ser una cadena de texto')
        .isLength({ min: 3, max: 3 })
        .withMessage('La clave del método de pago debe tener 3 caracteres'),
    body('Descripcion')
        .notEmpty()
        .withMessage('La descripción del método de pago es requerida')
        .isString()
        .withMessage('La descripción del método de pago debe ser una cadena de texto'),
    body('Bancarizado')
        .notEmpty()
        .withMessage('El campo bancarizado es requerido')
        .isBoolean()
        .withMessage('El campo bancarizado debe ser un booleano'),
]

export const updatePaymentMethodsSchema = [
    body('ClaveFormaPago')
        .notEmpty()
        .withMessage('La clave del método de pago es requerida')
        .isString()
        .withMessage('La clave del método de pago debe ser una cadena de texto')
        .isLength({ min: 3, max: 3 })
        .withMessage('La clave del método de pago debe tener 3 caracteres'),
    body('Descripcion')
        .optional()
        .isString()
        .withMessage('La descripción del método de pago debe ser una cadena de texto'),
    body('Bancarizado')
        .optional()
        .isBoolean()
        .withMessage('El campo bancarizado debe ser un booleano'),
]

export const createPaymentTypeSchema = [
    body('ClaveMetodoPago')
        .notEmpty()
        .withMessage('La clave del método de pago es requerida')
        .isString()
        .withMessage('La clave del método de pago debe ser una cadena de texto')
        .isLength({ min: 3, max: 3})
        .withMessage('La clave del método de pago debe tener 3 caracteres'),
    body('Descripcion')
        .notEmpty()
        .withMessage('La descripción del método de pago es requerida')
        .isString()
        .withMessage('La descripción del método de pago debe ser una cadena de texto'),
]

export const updatePaymentTypeSchema = [
    body('ClaveMetodoPago')
        .notEmpty()
        .withMessage('La clave del método de pago es requerida')
        .isString()
        .withMessage('La clave del método de pago debe ser una cadena de texto')
        .isLength({ min: 3, max: 3})
        .withMessage('La clave del método de pago debe tener 3 caracteres'),
    body('Descripcion')
        .optional()
        .isString()
        .withMessage('La descripción del método de pago debe ser una cadena de texto'),
]


