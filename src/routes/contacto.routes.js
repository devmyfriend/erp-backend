import { Router } from 'express';
import { methods as contactoController } from '../controllers/contacto.controller.js';
import { validationResult, param } from 'express-validator';
const router = Router();

router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		return contactoController.obtenerContactos(req, res);
	},
);

router.post('/buscar', contactoController.buscarContacto);
router.get('/detalle/:id', contactoController.obtenerDatosContacto);
router.post('/crear', contactoController.crearContacto);
router.post('/crear/datos', contactoController.agregarDetalleContacto);
router.patch('/editar', contactoController.editarContacto);
router.delete('/borrar', contactoController.desactivarContacto);
router.post('/crear/correo', contactoController.crearCorreo);
router.patch('/editar/correo', contactoController.editarCorreo);
router.delete('/correo/borrar', contactoController.desactivarCorreo);
router.post('/crear/telefono', contactoController.crearTelefono);
router.patch('/editar/telefono', contactoController.editarTelefono);
router.delete('/telefono/borrar', contactoController.desactivarTelefono);

export default router;
