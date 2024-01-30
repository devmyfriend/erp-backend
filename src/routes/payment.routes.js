import { param } from 'express-validator';
import { methods } from '../controllers/sat.payment.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/payment.methods.js';
import router from './sucursal.routes.js';

/**
 * @swagger
 * /api/v1/catalogo/sat/paymentMethods/crear:
 *   post:
 *     tags:
 *       - Forma Pago
 *     summary: Crea un nuevo método de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveFormaPago:
 *                 type: string
 *                 description: La clave del método de pago
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del método de pago
 *               Bancarizado:
 *                 type: boolean
 *                 description: Si el método de pago está bancarizado
 *     responses:
 *       200:
 *         description: Método de pago creado con éxito
 *       400:
 *         description: Ya existe un método de pago con esa clave
 *       500:
 *         description: Error al crear el método de pago
 */
router.post(
	'/sat/paymentMethods/crear',
	schemas.createPaymentMethodsSchema,
	middleware.validateSchema,
	methods.createPaymentMethods,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/paymentMethods/actualizar:
 *   patch:
 *     tags:
 *       - Forma Pago
 *     summary: Actualiza un método de pago existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveFormaPago:
 *                 type: string
 *                 description: La clave del método de pago
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del método de pago
 *               Bancarizado:
 *                 type: boolean
 *                 description: Si el método de pago está bancarizado
 *     responses:
 *       200:
 *         description: Método de pago actualizado con éxito
 *       404:
 *         description: No se encontró el método de pago
 *       500:
 *         description: Error al actualizar el método de pago
 */
router.patch(
	'/sat/paymentMethods/actualizar',
	schemas.updatePaymentMethodsSchema,
	middleware.validateSchema,
	methods.updatePaymentMethods,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/paymentMethods/eliminar/{ClaveFormaPago}:
 *   delete:
 *     tags:
 *       - Forma Pago
 *     summary: Elimina un método de pago existente
 *     parameters:
 *       - in: path
 *         name: ClaveFormaPago
 *         required: true
 *         schema:
 *           type: string
 *         description: La clave del método de pago
 *     responses:
 *       200:
 *         description: Método de pago eliminado con éxito
 *       404:
 *         description: No se encontró el método de pago
 *       500:
 *         description: Error al eliminar el método de pago
 */
router.delete(
	'/sat/paymentMethods/eliminar/:ClaveFormaPago',
	param('ClaveFormaPago', 'La clave del método de pago es requerida')
		.notEmpty()
		.isLength({ min: 3, max: 3 })
		.withMessage('La clave del método de pago debe tener 3 caracteres'),
	methods.deletePaymentMethods,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/paymentType/crear:
 *   post:
 *     tags:
 *       - Metodo de pago
 *     summary: Crea un nuevo tipo de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ClaveMetodoPago
 *               - Descripcion
 *             properties:
 *               ClaveMetodoPago:
 *                 type: string
 *                 description: La clave del método de pago
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del método de pago
 *     responses:
 *       200:
 *         description: Tipo de pago creado con éxito
 *       400:
 *         description: Ya existe un tipo de pago con esa clave
 *       500:
 *         description: Error al crear el tipo de pago
 */
router.post(
	'/sat/paymentType/crear',
	schemas.createPaymentTypeSchema,
	middleware.validateSchema,
	methods.createPaymentType,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/paymentType/actualizar:
 *   patch:
 *     tags:
 *       - Metodo de pago
 *     summary: Actualiza un tipo de pago existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ClaveMetodoPago
 *               - Descripcion
 *             properties:
 *               ClaveMetodoPago:
 *                 type: string
 *                 description: La clave del método de pago
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del método de pago
 *     responses:
 *       200:
 *         description: Tipo de pago actualizado con éxito
 *       404:
 *         description: No se encontró el tipo de pago
 *       500:
 *         description: Error al actualizar el tipo de pago
 */
router.patch(
	'/sat/paymentType/actualizar',
	schemas.updatePaymentTypeSchema,
	middleware.validateSchema,
	methods.updatedPaymentType,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/paymentType/eliminar/{ClaveMetodoPago}:
 *   delete:
 *     tags:
 *       - Metodo de pago
 *     summary: Elimina un tipo de pago existente
 *     parameters:
 *       - in: path
 *         name: ClaveMetodoPago
 *         required: true
 *         schema:
 *           type: string
 *         description: La clave del método de pago
 *     responses:
 *       200:
 *         description: Tipo de pago eliminado con éxito
 *       404:
 *         description: No se encontró el tipo de pago
 *       500:
 *         description: Error al eliminar el tipo de pago
 */
router.delete(
	'/sat/paymentType/eliminar/:ClaveMetodoPago',
	param('ClaveMetodoPago', 'La clave del método de pago es requerida'),
	methods.deletePaymentType,
);

export default router;
