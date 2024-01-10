import { param, body } from 'express-validator';

import { methods } from '../controllers/sucursal.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/sucursal.js';
import { Router } from 'express';

const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Sucursal
 *     description: Operaciones relacionadas a la sucursal
 *
 */

/**
 * @swagger
 * /api/v1/sucursal/{id_empresa}:
 *   get:
 *     summary: Obtener sucursales por ID de empresa
 *     tags: [Sucursal]
 *     parameters:
 *       - in: path
 *         name: id_empresa
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la Empresa
 *     responses:
 *       200:
 *         description: Lista de contactos de la sucursal
 *         content:
 *           application/json:
 *             example:
 *               - SucursalId: 1
 *                 NombreSucursal: nombre sucursal
 *                 EntidadNegocioId: 1
 *                 Puesto: Gerente
 *                 ClavePais: MEX
 *                 NombreEstado: Quintana Roo
 *                 CodigoPostal: 37753
 *                 Calle: Calle 135.
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             example:
 *               errors: [Parámetro inválido]
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al obtener las sucursales"
 */
router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	middleware.validateSchema,
	methods.obtenerSucursales,
);

/**
 * @swagger
 * /api/v1/sucursal/crear:
 *   post:
 *     summary: Crea una nueva sucursal
 *     tags: [Sucursal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sucursal:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Nombre:
 *                       type: string
 *                       description: Nombre de la sucursal
 *                     EntidadNegocioId:
 *                       type: integer
 *                       description: ID de la entidad de negocio
 *                     CreadoPor:
 *                       type: integer
 *                       description: ID del usuario que crea la sucursal
 *               datos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Calle:
 *                       type: string
 *                     NumeroExt:
 *                       type: string
 *                     NumeroInt:
 *                       type: string
 *                     CodigoPostal:
 *                       type: string
 *                     ClaveEstado:
 *                       type: string
 *                     ClaveMunicipio:
 *                       type: string
 *                     ClaveLocalidad:
 *                       type: string
 *                     ClaveColonia:
 *                       type: string
 *                     ClavePais:
 *                       type: string
 *     responses:
 *       200:
 *         description: Sucursal creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Se ha creado la sucursal: [Nombre de la Sucursal]"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear la sucursal"
 */
router.post(
	'/crear',
	schemas.crearSucursal,
	middleware.validateSchema,
	methods.crearSucursal,
);

/**
 * @swagger
 * /api/v1/sucursal/eliminar:
 *   delete:
 *     summary: Desactivar sucursal
 *     tags: [Sucursal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - SucursalId
 *               - BorradoPor
 *             properties:
 *               TelefonoId:
 *                 type: integer
 *                 description: ID del número telefónico a desactivar
 *               BorradoPor:
 *                 type: integer
 *                 description: ID del usuario que realiza la desactivación
 *           example:
 *             SucursalId: 1
 *             BorradoPor: 2
 *     responses:
 *       200:
 *         description: Número telefónico desactivado con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Sucursal desactivada"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Sucursal no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: "Sucursal no encontrada"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.delete(
	'/eliminar',
	body('SucursalId')
		.isNumeric()
		.withMessage('El ID de la sucursal debe ser un número.'),
	body('BorradoPor')
		.isNumeric()
		.withMessage('El ID de quien realiza el borrado debe ser un número.'),
	middleware.validateSchema,
	methods.desactivarSucursal,
);

/**
 * @swagger
 * /api/v1/sucursal/editar:
 *   patch:
 *     summary: Actualizar detalles de una sucursal
 *     tags: [Sucursal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sucursal:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     SucursalId:
 *                       type: integer
 *                       description: ID de la sucursal a actualizar
 *                     Nombre:
 *                       type: string
 *                       description: Nombre nuevo de la sucursal
 *                     EntidadNegocioId:
 *                       type: integer
 *                       description: ID de la entidad de negocio asociada
 *                     ActualizadoPor:
 *                       type: integer
 *                       description: ID del usuario que actualiza la sucursal
 *               datos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Calle:
 *                       type: string
 *                       description: Calle de la sucursal
 *                     NumeroExt:
 *                       type: string
 *                       description: Número exterior de la sucursal
 *                     NumeroInt:
 *                       type: string
 *                       description: Número interior de la sucursal
 *                     CodigoPostal:
 *                       type: string
 *                       description: Código postal de la sucursal
 *                     ClaveEstado:
 *                       type: string
 *                       description: Clave del estado
 *                     ClaveMunicipio:
 *                       type: string
 *                       description: Clave del municipio
 *                     ClaveLocalidad:
 *                       type: string
 *                       description: Clave de la localidad
 *                     ClaveColonia:
 *                       type: string
 *                       description: Clave de la colonia
 *                     ClavePais:
 *                       type: string
 *                       description: Clave del país
 *           example:
 *             sucursal:
 *               - SucursalId: 1
 *                 Nombre: "Sucursal Central"
 *                 EntidadNegocioId: 5
 *                 ActualizadoPor: 3
 *             datos:
 *               - Calle: "Principal"
 *                 NumeroExt: "123"
 *                 NumeroInt: "A"
 *                 CodigoPostal: "45678"
 *                 ClaveEstado: "EST"
 *                 ClaveMunicipio: "MUN"
 *                 ClaveLocalidad: "LOC"
 *                 ClaveColonia: "COL"
 *                 ClavePais: "PAI"
 *     responses:
 *       200:
 *         description: Sucursal actualizada con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Sucursal actualizada"
 *
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       409:
 *         description: Conflicto. El nombre de la sucursal ya está en uso.
 *         content:
 *           application/json:
 *             example:
 *               status: 409
 *               errors: "El nombre de la sucursal ya esta en uso"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al actualizar la sucursal"
 */

router.patch(
	'/editar',
	schemas.editarSucursal,
	middleware.validateSchema,
	methods.editarSucursal,
);
export default router;
