import { Router } from 'express';
import { methods as contactoController } from '../controllers/contacto.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/contacto.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();

router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	middleware.validateSchema,
	contactoController.obtenerContactos,
);

router.post(
	'/buscar',
	schemas.BuscarContactoSchema,
	middleware.validateSchema,
	contactoController.buscarContacto,
);
router.get(
	'/detalle/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	middleware.validateSchema,
	contactoController.obtenerDatosContacto,
);
router.post(
	'/crear',
	schemas.crearContactoSchema,
	middleware.validateSchema,
	contactoController.crearContacto,
);
router.post(
	'/crear/datos',
	schemas.agregarDetalleContacto,
	middleware.validateSchema,
	contactoController.agregarDetalleContacto,
);

router.patch(
	'/editar',
	schemas.actualizarContactoSchema,
	middleware.validateSchema,
	contactoController.editarContacto,
);

router.delete(
	'/borrar',
	schemas.desactivarContactoSchema,
	middleware.validateSchema,
	contactoController.desactivarContacto,
);
router.post(
	'/crear/correo',
	schemas.crearCorreoSchema,
	middleware.validateSchema,
	contactoController.crearCorreo,
);

router.patch(
	'/editar/correo',
	schemas.editarCorreoSchema,
	middleware.validateSchema,
	contactoController.editarCorreo,
);

router.delete(
	'/correo/borrar',
	schemas.desactivarCorreoSchema,
	middleware.validateSchema,
	contactoController.desactivarCorreo,
);

router.post(
	'/crear/telefono',
	schemas.crearTelefonoSchema,
	middleware.validateSchema,
	contactoController.crearTelefono,
);
router.patch(
	'/editar/telefono',
	schemas.editarTelefonoSchema,
	middleware.validateSchema,
	contactoController.editarTelefono,
);
router.delete(
	'/telefono/borrar',
	schemas.desactivarTelefonoSchema,
	middleware.validateSchema,
	contactoController.desactivarTelefono,
);

export default router;
