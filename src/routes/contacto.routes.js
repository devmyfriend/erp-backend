import { Router } from 'express';
import { methods as contactoController } from '../controllers/contacto.controller.js';
import { methods } from '../controllers/contacto.empresa.controller.js';
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
 * components:
 *   schemas:
 *     SucursalContactoModel:
 *       type: object
 *       properties:
 *         ContactoId:
 *           type: number
 *           description: Identificador del contacto (opcional)
 *         SucursalId:
 *           type: number
 *           description: Identificador de la sucursal (requerido)
 *
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
/**
 * @swagger
 * /api/v1/contacto/crear:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SucursalId
 *               - ApellidoPaterno
 *               - ApellidoMaterno
 *               - Nombres
 *               - Departamento
 *               - Puesto
 *               - CreadoPor
 *               - ActualizadoPor
 *             properties:
 *               SucursalId:
 *                 type: integer
 *                 description: ID de la sucursal
 *               ApellidoPaterno:
 *                 type: string
 *                 description: Apellido paterno del contacto
 *               ApellidoMaterno:
 *                 type: string
 *                 description: Apellido materno del contacto
 *               Nombres:
 *                 type: string
 *                 description: Nombres del contacto
 *               Departamento:
 *                 type: string
 *                 description: Departamento del contacto
 *               Puesto:
 *                 type: string
 *                 description: Puesto del contacto
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea el contacto
 *               ActualizadoPor:
 *                 type: integer
 *                 description: ID del usuario que actualiza el contacto
 *           example:
 *             SucursalId: 1010
 *             ApellidoPaterno: "García"
 *             ApellidoMaterno: "López"
 *             Nombres: "Juan Carlos"
 *             Departamento: "Ventas"
 *             Puesto: "Gerente"
 *             CreadoPor: 1
 *             ActualizadoPor: 1
 *     responses:
 *       200:
 *         description: Nuevo contacto creado
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 ContactoId: 1
 *                 SucursalId: 1010
 *                 ApellidoPaterno: "García"
 *                 ApellidoMaterno: "López"
 *                 Nombres: "Juan Carlos"
 *                 Departamento: "Ventas"
 *                 Puesto: "Gerente"
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
	'/crear',
	schemas.crearContactoSchema,
	middleware.validateSchema,
	contactoController.crearContacto,
);

/**
 * @swagger
 * /api/v1/contacto/crear/datos:
 *   post:
 *     summary: Agregar detalles (correos y teléfonos) a un contacto existente
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ContactoId
 *               - CreadoPor
 *               - Correos
 *               - Telefonos
 *             properties:
 *               ContactoId:
 *                 type: integer
 *                 description: ID del contacto existente
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea los detalles
 *               Correos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     correo:
 *                       type: string
 *                       format: email
 *                       description: Dirección de correo electrónico a agregar
 *               Telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       description: Número de teléfono a agregar
 *           example:
 *             ContactoId: 1
 *             CreadoPor: 1
 *             Correos:
 *               - correo: "contacto@example.com"
 *             Telefonos:
 *               - telefono: "1234567890"
 *     responses:
 *       201:
 *         description: Detalles del contacto agregados con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 correos:
 *                   - EmailId: 1
 *                     ContactoId: 1
 *                     Email: "contacto@example.com"
 *                 telefonos:
 *                   - TelefonoId: 1
 *                     ContactoId: 1
 *                     NumeroTelefonico: "1234567890"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Contacto no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.post(
	'/crear/datos',
	schemas.agregarDetalleContacto,
	middleware.validateSchema,
	contactoController.agregarDetalleContacto,
);
/**
 * @swagger
 * /api/v1/contacto/editar:
 *   patch:
 *     summary: Editar un contacto existente
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ContactoId
 *               - ActualizadoPor
 *             properties:
 *               ContactoId:
 *                 type: integer
 *                 description: ID del contacto a editar
 *               SucursalId:
 *                 type: integer
 *                 description: ID de la sucursal (opcional)
 *               ApellidoPaterno:
 *                 type: string
 *                 description: Apellido paterno del contacto (opcional)
 *               ApellidoMaterno:
 *                 type: string
 *                 description: Apellido materno del contacto (opcional)
 *               Nombres:
 *                 type: string
 *                 description: Nombres del contacto (opcional)
 *               Departamento:
 *                 type: string
 *                 description: Departamento del contacto (opcional)
 *               Puesto:
 *                 type: string
 *                 description: Puesto del contacto (opcional)
 *               ActualizadoPor:
 *                 type: integer
 *                 description: ID del usuario que actualiza el contacto
 *           example:
 *             ContactoId: 1
 *             SucursalId: 1010
 *             ApellidoPaterno: "García"
 *             ApellidoMaterno: "Fernández"
 *             Nombres: "Laura"
 *             Departamento: "Marketing"
 *             Puesto: "Gerente de Marketing"
 *             ActualizadoPor: 2
 *     responses:
 *       200:
 *         description: Contacto editado con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 ContactoId: 1
 *                 SucursalId: 1010
 *                 ApellidoPaterno: "García"
 *                 ApellidoMaterno: "Fernández"
 *                 Nombres: "Laura"
 *                 Departamento: "Marketing"
 *                 Puesto: "Gerente de Marketing"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Contacto no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.patch(
	'/editar',
	schemas.actualizarContactoSchema,
	middleware.validateSchema,
	contactoController.editarContacto,
);
/**
 * @swagger
 * /api/v1/contacto/borrar:
 *   delete:
 *     summary: Desactivar un contacto existente
 *     tags: [Contactos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ContactoId
 *               - BorradoPor
 *             properties:
 *               ContactoId:
 *                 type: integer
 *                 description: ID del contacto a desactivar
 *               BorradoPor:
 *                 type: integer
 *                 description: ID del usuario que realiza la desactivación
 *           example:
 *             ContactoId: 1
 *             BorradoPor: 2
 *     responses:
 *       200:
 *         description: Contacto desactivado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Contacto desactivado: 1"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Contacto no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.delete(
	'/borrar',
	schemas.desactivarContactoSchema,
	middleware.validateSchema,
	contactoController.desactivarContacto,
);

/**
 * @swagger
 * /api/v1/contacto/crear/correo:
 *   post:
 *     summary: Crear un nuevo correo electrónico para un contacto
 *     tags: [Correos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Email
 *               - ContactoId
 *               - CreadoPor
 *             properties:
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico a crear
 *               ContactoId:
 *                 type: integer
 *                 description: ID del contacto asociado al correo electrónico
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea el correo electrónico
 *           example:
 *             Email: "contacto@example.com"
 *             ContactoId: 1
 *             CreadoPor: 2
 *     responses:
 *       201:
 *         description: Correo electrónico creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 EmailId: 1
 *                 Email: "contacto@example.com"
 *                 ContactoId: 1
 *                 CreadoPor: 2
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Contacto no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.post(
	'/crear/correo',
	schemas.crearCorreoSchema,
	middleware.validateSchema,
	contactoController.crearCorreo,
);
/**
 * @swagger
 * /api/v1/contacto/editar/correo:
 *   patch:
 *     summary: Editar un correo electrónico existente de un contacto
 *     tags: [Correos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - EmailId
 *               - Email
 *               - ActualizadoPor
 *             properties:
 *               EmailId:
 *                 type: integer
 *                 description: ID del correo electrónico a editar
 *               Email:
 *                 type: string
 *                 format: email
 *                 description: Nueva dirección de correo electrónico
 *               ActualizadoPor:
 *                 type: integer
 *                 description: ID del usuario que actualiza el correo electrónico
 *           example:
 *             EmailId: 1
 *             Email: "nuevo-email@example.com"
 *             ActualizadoPor: 2
 *     responses:
 *       200:
 *         description: Correo electrónico editado con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 EmailId: 1
 *                 ContactoId: 1
 *                 Email: "nuevo-email@example.com"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Correo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Correo no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.patch(
	'/editar/correo',
	schemas.editarCorreoSchema,
	middleware.validateSchema,
	contactoController.editarCorreo,
);
/**
 * @swagger
 * /api/v1/contacto/correo/borrar:
 *   delete:
 *     summary: Desactivar un correo electrónico de un contacto
 *     tags: [Correos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - EmailId
 *               - BorradoPor
 *             properties:
 *               EmailId:
 *                 type: integer
 *                 description: ID del correo electrónico a desactivar
 *               BorradoPor:
 *                 type: integer
 *                 description: ID del usuario que realiza la desactivación
 *           example:
 *             EmailId: 1
 *             BorradoPor: 2
 *     responses:
 *       200:
 *         description: Correo electrónico desactivado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Correo desactivado: 1"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Correo no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Correo no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.delete(
	'/correo/borrar',
	schemas.desactivarCorreoSchema,
	middleware.validateSchema,
	contactoController.desactivarCorreo,
);
/**
 * @swagger
 * /api/v1/contacto/crear/telefono:
 *   post:
 *     summary: Crear un nuevo número telefónico para un contacto
 *     tags: [Telefonos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NumeroTelefonico
 *               - ContactoId
 *               - CreadoPor
 *             properties:
 *               NumeroTelefonico:
 *                 type: string
 *                 description: Número telefónico a crear
 *               ContactoId:
 *                 type: integer
 *                 description: ID del contacto asociado al número telefónico
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea el número telefónico
 *           example:
 *             NumeroTelefonico: "1234567890"
 *             ContactoId: 1
 *             CreadoPor: 2
 *     responses:
 *       200:
 *         description: Número telefónico creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               TelefonoId: 1
 *               NumeroTelefonico: "1234567890"
 *               ContactoId: 1
 *               CreadoPor: 2
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Contacto no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Contacto no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.post(
	'/crear/telefono',
	schemas.crearTelefonoSchema,
	middleware.validateSchema,
	contactoController.crearTelefono,
);
/**
 * @swagger
 * /api/v1/contacto/editar/telefono:
 *   patch:
 *     summary: Editar un número telefónico existente de un contacto
 *     tags: [Telefonos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TelefonoId
 *               - NumeroTelefonico
 *               - ActualizadoPor
 *             properties:
 *               TelefonoId:
 *                 type: integer
 *                 description: ID del número telefónico a editar
 *               NumeroTelefonico:
 *                 type: string
 *                 description: Nuevo número telefónico
 *               ActualizadoPor:
 *                 type: integer
 *                 description: ID del usuario que actualiza el número telefónico
 *           example:
 *             TelefonoId: 1
 *             NumeroTelefonico: "0987654321"
 *             ActualizadoPor: 2
 *     responses:
 *       200:
 *         description: Número telefónico editado con éxito
 *         content:
 *           application/json:
 *             example:
 *               TelefonoId: 1
 *               ContactoId: 1
 *               NumeroTelefonico: "0987654321"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Teléfono no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Telefono no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.patch(
	'/editar/telefono',
	schemas.editarTelefonoSchema,
	middleware.validateSchema,
	contactoController.editarTelefono,
);
/**
 * @swagger
 * /api/v1/contacto/telefono/borrar:
 *   delete:
 *     summary: Desactivar un número telefónico de un contacto
 *     tags: [Telefonos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TelefonoId
 *               - BorradoPor
 *             properties:
 *               TelefonoId:
 *                 type: integer
 *                 description: ID del número telefónico a desactivar
 *               BorradoPor:
 *                 type: integer
 *                 description: ID del usuario que realiza la desactivación
 *           example:
 *             TelefonoId: 1
 *             BorradoPor: 2
 *     responses:
 *       200:
 *         description: Número telefónico desactivado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Telefono desactivado: 1"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Teléfono no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Telefono no encontrado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.delete(
	'/telefono/borrar',
	schemas.desactivarTelefonoSchema,
	middleware.validateSchema,
	contactoController.desactivarTelefono,
);

/**
 * @swagger
 * /api/v1/contacto/telefono/buscar/{id}:
 *   get:
 *     tags:
 *       - Contacto Telefono
 *     summary: Obtiene los teléfonos de un contacto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del contacto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de teléfonos del contacto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   // Define las propiedades de los teléfonos aquí
 *       404:
 *         description: No existen teléfonos relacionados con este contacto
 *       500:
 *         description: Error interno del servidor
 */
router.get('/telefono/buscar/:id', methods.buscarTelefonosPorContactoId);

/**
 * @swagger
 * /api/v1/contacto/telefono/crear:
 *   post:
 *     tags:
 *       - Contacto Telefono
 *     summary: Crea un teléfono para un contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ContactoId:
 *                 type: integer
 *                 description: ID del contacto
 *               NumeroTelefonico:
 *                 type: string
 *                 description: Número de teléfono del contacto
 *               CreadoPor:
 *                 type: integer
 *                 description: ID del usuario que crea el contacto
 *     responses:
 *       200:
 *         description: Se ha creado la relación ContactoTelefono
 *       404:
 *         description: El contacto no existe
 *       500:
 *         description: Error interno del servidor
 */
router.post('/telefono/crear', methods.crearContactoTelefono);

/**
 * @swagger
 * /api/v1/contacto/telefono/editar:
 *   patch:
 *     tags:
 *       - Contacto Telefono
 *     summary: Actualiza un teléfono de contacto
 *     requestBody:
 *       description: Datos del teléfono a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ContactoId:
 *                 type: integer
 *               TelefonoId:
 *                 type: integer
 *               NumeroTelefonico:
 *                 type: string
 *               ActualizadoPor:
 *                 type: integer
 *                 description: ID del usuario que actualiza el contacto
 *                 default: 1
 *     responses:
 *       200:
 *         description: Teléfono de contacto actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: El contacto o el teléfono no existen
 *       500:
 *         description: Error al actualizar el teléfono del contacto
 */
router.patch('/telefono/editar', methods.actualizarContactoTelefono);

/**
 * @swagger
 * /api/v1/contacto/telefono/desactivar:
 *   delete:
 *     tags:
 *       - Contacto Telefono
 *     summary: Desactiva un teléfono de contacto
 *     requestBody:
 *       description: Datos del teléfono a desactivar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ContactoId:
 *                 type: integer
 *               TelefonoId:
 *                 type: integer
 *               BorradoPor:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Teléfono de contacto desactivado
 *       404:
 *         description: La relación ContactoTelefono no existe
 *       500:
 *         description: Error al desactivar el teléfono del contacto
 */
router.delete('/telefono/desactivar', methods.desactivarContactoTelefono);

export default router;
