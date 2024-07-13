import { body } from 'express-validator';

export const CrarMoneda = [
	body('ClaveMoneda')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 1, max: 3 })
        .withMessage('La clave de moneda SAT es obligatorio y debe de tener entre 1 a 3 cacteres'),
	body('Descripcion')
		.notEmpty()
		.withMessage('La descripción es obligatorio.'),
];

export const EditarMoneda = [
	body('ClaveMoneda')
		.notEmpty()
		.withMessage('El campo clave de moneda SAT no puede estar vacio'),
	body('Descripcion')
		.notEmpty()
		.isString()
		.trim()
		.isLength({ min: 3, max: 50 })
		.withMessage('El nombre de moneda es obligatorio y debe de tener entre 3 a 50 cacteres'),
];

export const Des_HabilitaMoneda = [
	body('ClaveMoneda')
    .notEmpty()
    .withMessage('El campo clave de metodo de pago es invalido'),
];
