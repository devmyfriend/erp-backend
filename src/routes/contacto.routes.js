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
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}
	return contactoController.editarContacto(req, res);
});
router.delete('/borrar', schemas.desactivarContactoSchema, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}
	return contactoController.desactivarContacto(req, res);
});
router.post('/crear/correo', schemas.crearCorreoSchema, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}

	return contactoController.crearCorreo(req, res);
});
router.patch('/editar/correo', schemas.editarCorreoSchema, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}

	return contactoController.editarCorreo(req, res);
});
router.delete('/correo/borrar', schemas.desactivarCorreoSchema, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}

	return contactoController.desactivarCorreo(req, res);
});
router.post('/crear/telefono', schemas.crearTelefonoSchema, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}
	return contactoController.crearTelefono(req, res);
});
router.patch('/editar/telefono', schemas.editarTelefonoSchema, (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const uniqueErrorMessages = errors.array().map(error => error.msg);
		const uniqueErrors = [...new Set(uniqueErrorMessages)];

		return res.status(400).json({
			status: 'Error de validación',
			errors: uniqueErrors,
		});
	}

	return contactoController.editarTelefono(req, res);
});
router.delete(
	'/telefono/borrar',
	schemas.desactivarTelefonoSchema,
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
		return contactoController.desactivarTelefono(req, res);
	},
);

export default router;
