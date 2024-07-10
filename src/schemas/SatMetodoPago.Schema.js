import { body } from 'express-validator';

export const CrarMetodoPago = [
	body('ClaveMetodoPago')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 1, max: 3 })
        .withMessage('La clave del Método de Pago es obligatorio y debe de tener entre 1 a 3 cacteres'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripción es obligatorio.'),
];

export const EditarMetodoPago = [
	body('ClaveMetodoPago')
		.notEmpty()
		.withMessage('El campo clave de metodo de pago es invalido'),
	body('Descripcion')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3, max: 50 })
		.withMessage('El nombre de la familia es obligatorio y debe de tener entre 3 a 50 cacteres'),
];

export const Des_HabilitaMetodoPago = [
	body('ClaveMetodoPago')
    .notEmpty()
    .withMessage('El campo clave de metodo de pago es invalido'),
];
