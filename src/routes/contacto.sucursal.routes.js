import { Router } from 'express';
import { methods } from '../controllers/contacto.sucursal.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/contacto.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Contactos Por sucursal
 *     description: Operaciones relacionadas con los contactos segun la sucursal
 *
 *   - name: Detalle del Contacto
 *     description: Operaciones relacionadas con los contactos segun su ID
 * 
 *   - name: Correos Contacto
 *     description: Operaciones relacionadas con los correos segun el contacto
 *
 *   - name: Telefonos Contacto
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
 *     tags: [Contactos Por sucursal]
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
 *                 NombreContacto: Laura
 *                 ApellidoPaterno: García
 *                 Departamento: Marketing
 *                 Puesto: Gerente de Marketing
 *
 *
 *
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
	methods.obtenerContactos,
);

/**
 * @swagger
 * /api/v1/contacto/buscar:
 *   post:
 *     summary: Buscar contacto por nombre y sucursal
 *     tags: [Contactos Por sucursal]
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
 *                   NombreContacto: "Laura"
 *                   ApellidoPaterno: "García"
 *                   ApellidoMaterno: "Fernández"
 *                   Departamento: "Marketing"
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
	methods.buscarContacto,
);
/**
 * @swagger
 * /api/v1/contacto/detalle/{id}:
 *   get:
 *     summary: Obtener detalles del contacto por ID del contacto
 *     tags: [Detalle del Contacto]
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
	methods.obtenerDatosContacto,
);
/**
 * @swagger
 * /api/v1/contacto/crear/{id}:
 *   post:
 *     summary: Crear un nuevo contacto
 *     tags: [Contactos Por sucursal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sucursal
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
	'/crear/:id',
	schemas.crearContactoSchema,
	middleware.validateSchema,
	methods.crearContacto,
);

/**
 * @swagger
 * /api/v1/contacto/datos:
 *   post:
 *     summary: Agregar detalles (correos y teléfonos) a un contacto existente
 *     tags: [Detalle del Contacto]
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
	'/datos',
	schemas.agregarDetalleContacto,
	middleware.validateSchema,
	methods.agregarDetalleContacto,
);
/**
 * @swagger
 * /api/v1/contacto/editar:
 *   patch:
 *     summary: Editar un contacto existente
 *     tags: [Contactos Por sucursal]
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
	methods.editarContacto,
);
/**
 * @swagger
 * /api/v1/contacto/borrar:
 *   delete:
 *     summary: Desactivar un contacto existente
 *     tags: [Detalle del Contacto]
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
	methods.desactivarContacto,
);

/**
 * @swagger
 * /api/v1/contacto/correo:
 *   post:
 *     summary: Crear un nuevo correo electrónico para un contacto
 *     tags: [Correos Contacto]
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
	'/correo',
	schemas.crearCorreoContactoSchema,
	middleware.validateSchema,
	methods.crearCorreo,
);
/**
 * @swagger
 * /api/v1/contacto/editar/correo:
 *   patch:
 *     summary: Editar un correo electrónico existente de un contacto
 *     tags: [Correos Contacto]
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
	methods.editarCorreo,
);
/**
 * @swagger
 * /api/v1/contacto/correo/borrar:
 *   delete:
 *     summary: Desactivar un correo electrónico de un contacto
 *     tags: [Correos Contacto]
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
	methods.desactivarCorreo,
);
/**
 * @swagger
 * /api/v1/contacto/telefono:
 *   post:
 *     summary: Crear un nuevo número telefónico para un contacto
 *     tags: [Telefonos Contacto]
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
	'/telefono',
	schemas.crearTelefonoSchema,
	middleware.validateSchema,
	methods.crearTelefono,
);
/**
 * @swagger
 * /api/v1/contacto/editar/telefono:
 *   patch:
 *     summary: Editar un número telefónico existente de un contacto
 *     tags: [Telefonos Contacto]
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
	methods.editarTelefono,
);
/**
 * @swagger
 * /api/v1/contacto/telefono/borrar:
 *   delete:
 *     summary: Desactivar un número telefónico de un contacto
 *     tags: [Telefonos Contacto]
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
	methods.desactivarTelefono,
);

export default router;