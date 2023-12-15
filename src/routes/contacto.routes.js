import { Router } from 'express';
import { methods as contactoController } from '../controllers/contacto.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/contacto.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Contactos
 *     description: Operaciones relacionadas con los contactos segun la sucursal
 *
 *   - name: Correos
 *     description: Operaciones relacionadas con los correos segun el contacto
 *
 *   - name: Telefonos
 *     description: Operaciones relacionadas con los telefono segun el contacto
 */

/**
 * @swagger
 * /api/v1/contacto/{id}:
 *   get:
 *     summary: Obtener contactos por ID de sucursal
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sucursal
 *     responses:
 *       200:
 *         description: Lista de contactos de la sucursal
 *         content:
 *           application/json:
 *             example:
 *               - ContactoId: 1
 *                 SucursalId: 1010
 *                 Nombres: Sebastian
 *                 Puesto: Gerente
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             example:
 *               error: "Parámetro inválido"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	middleware.validateSchema,
	contactoController.obtenerContactos,
);

/**
 * @swagger
 * /api/v1/contacto/buscar:
 *   post:
 *     summary: Buscar contacto por nombre y sucursal
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 description: Nombre del contacto a buscar
 *               SucursalId:
 *                 type: integer
 *                 description: ID de la sucursal a la que pertenece el contacto
 *           example:
 *             Nombre: "Juan"
 *             SucursalId: 1010
 *     responses:
 *       201:
 *         description: Contacto encontrado
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - ContactoId: 2
 *                   SucursalId: 1010
 *                   Nombres: "Juan"
 *                   Puesto: "Gerente"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.post(
	'/buscar',
	schemas.BuscarContactoSchema,
	middleware.validateSchema,
	contactoController.buscarContacto,
);
/**
 * @swagger
 * /api/v1/contacto/detalle/{id}:
 *   get:
 *     summary: Obtener detalles del contacto por ID
 *     tags: [Contactos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contacto
 *     responses:
 *       200:
 *         description: Detalles del contacto incluyendo email y teléfono
 *         content:
 *           application/json:
 *             example:
 *               email:
 *                 - EmailId: 1
 *                   ContactoId: 1
 *                   Email: "contacto@example.com"
 *               telefono:
 *                 - TelefonoId: 1
 *                   ContactoId: 1
 *                   NumeroTelefonico: "1234567890"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["El parametro debe ser un entero"]
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

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
