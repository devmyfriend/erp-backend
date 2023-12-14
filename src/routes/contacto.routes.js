import { Router } from 'express';
import { methods as contactoController } from '../controllers/contacto.controller.js';
import { validationResult, param } from 'express-validator';
import * as schemas from '../schemas/contacto.js';
const router = Router();

router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const uniqueErrorMessages = errors.array().map(error => error.msg);
			const uniqueErrors = [...new Set(uniqueErrorMessages)];

			return res.status(400).json({
				status: 'Error de validación',
				errors: uniqueErrors,
			});
		}
		return contactoController.obtenerContactos(req, res);
	},
);

router.post(
	'/buscar',
	schemas.BuscarContactoSchema,

	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const uniqueErrorMessages = errors.array().map(error => error.msg);
			const uniqueErrors = [...new Set(uniqueErrorMessages)];

			return res.status(400).json({
				status: 'Error de validación',
				errors: uniqueErrors,
			});
		}
		return contactoController.buscarContacto(req, res);
	},
);
router.get(
	'/detalle/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const uniqueErrorMessages = errors.array().map(error => error.msg);
			const uniqueErrors = [...new Set(uniqueErrorMessages)];

			return res.status(400).json({
				status: 'Error de validación',
				errors: uniqueErrors,
			});
		}
		return contactoController.obtenerDatosContacto(req, res);
	},
);
router.post(
	'/crear',
	schemas.crearContactoSchema,

	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const uniqueErrorMessages = errors.array().map(error => error.msg);
			const uniqueErrors = [...new Set(uniqueErrorMessages)];

			return res.status(400).json({
				status: 'Error de validación',
				errors: uniqueErrors,
			});
		}
		return contactoController.crearContacto(req, res);
	},
);
router.post('/crear/datos', schemas.agregarDetalleContacto, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}
	return contactoController.agregarDetalleContacto(req, res);
});
router.patch('/editar', schemas.actualizarContactoSchema, (req, res) => {
	return contactoController.editarContacto(req, res);
});
router.delete('/borrar', contactoController.desactivarContacto);
router.post('/crear/correo', contactoController.crearCorreo);
router.patch('/editar/correo', contactoController.editarCorreo);
router.delete('/correo/borrar', contactoController.desactivarCorreo);
router.post('/crear/telefono', contactoController.crearTelefono);
router.patch('/editar/telefono', contactoController.editarTelefono);
router.delete('/telefono/borrar', contactoController.desactivarTelefono);

export default router;
