import { Router } from 'express';
import { methods as datoseEmpresaController } from '../controllers/datos.empresa.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/datosEmpresa.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();

/**
 * @swagger
 * /api/v1/empresa/{id}:
 *   get:
 *     summary: Obtener datos de la empresa por ID
 *     tags: [Datos Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la empresa
 *         content:
 *           application/json:
 *             Entidad:
 *               type: object
 *               properties:
 *                 EntidadNegocioId:
 *                   type: integer
 *                 EsPropietaria:
 *                   type: boolean
 *                 RFC:
 *                   type: string
 *                 NombreComercial:
 *                   type: string
 *                 ClavePais:
 *                   type: string
 *                 TaxId:
 *                   type: string
 *                 ClaveRegimenFisca:
 *                   type: string
 *                 PersonaFisica:
 *                   type: boolean
 *                 PersonaMoral:
 *                   type: boolean
 *                 NombreOficial:
 *                   type: string
 *                 Estatus:
 *                   type: integer
 *                 Domicilio:
 *                   type: object
 *                   properties:
 *                     DomicilioId:
 *                       type: integer
 *                     EntidadNegocioId:
 *                       type: integer
 *                     SucursalId:
 *                       type: integer
 *                     AlmacenId:
 *                       type: integer
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
 *       400:
 *         description: ID de la entidad de negocio no proporcionado
 *       404:
 *         description: No se encontró la entidad de negocio con el ID proporcionado
 *       500:
 *         description: Internal Server Error
 */
router.get(
    '/:id',
    param('id', 'El parametro debe ser un entero').isNumeric(),
    datoseEmpresaController.buscarIdEmpresa,
);

// POST - /api/datosFiscales

/**
 * @swagger
 * components:
 *   schemas:
 *     crearEmpresaSchema:
 *       type: object
 *       required:
 *         - entidad
 *         - domicilio
 *       properties:
 *         entidad:
 *           type: object
 *           required:
 *             - EsPropietaria
 *             - RFC
 *             - NombreComercial
 *             - ClavePais
 *             - TaxId
 *             - ClaveRegimenFisca
 *             - PersonaFisica
 *             - PersonalMoral
 *             - NombreOficial
 *             - Estatus
 *             - CreadoPor
 *             - ActualizadoPor
 *             - logo
 *             - BorradoPor
 *             - BorradoEn
 *           properties:
 *             RFC:
 *               type: string
 *             NombreComercial:
 *               type: string
 *             ClavePais:
 *               type: string
 *             TaxId:
 *               type: string
 *             ClaveRegimenFiscal:
 *               type: string
 *             PersonaFisica:
 *               type: boolean
 *             PersonaMoral:
 *               type: boolean
 *             NombreOficial:
 *               type: string
 *             Estatus:
 *               type: integer
 *             logo:
 *               type: string
 *             CreadoPor:
 *               type: string
 *             ActualizadoPor:
 *               type: string
 *             BorradoPor:
 *               type: string
 *             BorradoEn:
 *               type: string
 *         domicilio:
 *           type: object
 *           properties:
 *             AlmacenId:
 *               type: integer
 *             Calle:
 *               type: string
 *             NumeroExt:
 *               type: string
 *             NumeroInt:
 *               type: string
 *             CodigoPostal:
 *               type: string
 *             ClaveEstado:
 *               type: string
 *             ClaveMunicipio:
 *               type: string
 *             ClaveLocalidad:
 *               type: string
 *             ClaveColonia:
 *               type: string
 *             ClavePais:
 *               type: string
 * /api/v1/fiscales/empresa/crear:
 *   post:
 *     summary: Crear una nueva entidad de negocio
 *     tags: [Datos Fiscales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/crearEmpresaSchema'
 *     responses:
 *       201:
 *         description: Entidad de negocio creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/crearEmpresaSchema'
 *       400:
 *         description: Datos de entrada inválidos
 *       500:
 *         description: Internal Server Error
 */
router.post(
    '/empresa/crear',
    schemas.crearIdEmpresaSchema,
    middleware.validateSchema,
    datoseEmpresaController.crearIdEmpresa,
);





// UPDATE - /api/datosFiscales

/**
 * @swagger
 * /api/v1/fiscales/empresa/editar/{id}:
 *   patch:
 *     summary: Editar datos fiscales de la empresa
 *     tags: [Datos Fiscales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa a editar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entidad:
 *                 type: object
 *                 properties:
 *                   EsPropietaria:
 *                     type: boolean
 *                   RFC:
 *                     type: string
 *                   NombreComercial:
 *                     type: string
 *                   ClavePais:
 *                     type: string
 *                   TaxId:
 *                     type: string
 *                   ClaveRegimenFisca:
 *                     type: string
 *                   PersonaFisica:
 *                     type: boolean
 *                   PersonaMoral:
 *                     type: boolean
 *                   NombreOficial:
 *                     type: string
 *                   Estatus:
 *                     type: integer
 *               domicilio:
 *                 type: object
 *                 properties:
 *                   Calle:
 *                     type: string
 *                   NumeroExt:
 *                     type: string
 *                   NumeroInt:
 *                     type: string
 *                   CodigoPostal:
 *                     type: string
 *                   ClaveEstado:
 *                     type: string
 *                   ClaveMunicipio:
 *                     type: string
 *                   ClaveLocalidad:
 *                     type: string
 *                   ClaveColonia:
 *                     type: string
 *                   ClavePais:
 *                     type: string
 *     responses:
 *       200:
 *         description: Datos fiscales de la empresa editados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/EntidadNegocio'
 *       400:
 *         description: Cuerpo de la petición inválido
 *       404:
 *         description: Entidad de negocio no encontrada
 *       500:
 *         description: Internal Server Error
 */
router.patch('/empresa/editar/:id', datoseEmpresaController.editarIdEmpresa);

// /**
//  * @swagger
//  * /api/v1/fiscales/empresa/editar:
//  *   patch:
//  *     summary: Editar datos fiscales de la empresa
//  *     tags: [Datos Fiscales]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               entidad:
//  *                 type: object
//  *                 properties:
//  *                   EsPropietaria:
//  *                     type: boolean
//  *                   RFC:
//  *                     type: string
//  *                   NombreComercial:
//  *                     type: string
//  *                   ClavePais:
//  *                     type: string
//  *                   TaxId:
//  *                     type: string
//  *                   ClaveRegimenFisca:
//  *                     type: string
//  *                   PersonaFisica:
//  *                     type: boolean
//  *                   PersonaMoral:
//  *                     type: boolean
//  *                   NombreOficial:
//  *                     type: string
//  *                   Estatus:
//  *                     type: integer
//  *               domicilio:
//  *                 type: object
//  *                 properties:
//  *                   AlmacenId:
//  *                     type: integer
//  *                   Calle:
//  *                     type: string
//  *                   NumeroExt:
//  *                     type: string
//  *                   NumeroInt:
//  *                     type: string
//  *                   CodigoPostal:
//  *                     type: string
//  *                   ClaveEstado:
//  *                     type: string
//  *                   ClaveMunicipio:
//  *                     type: string
//  *                   ClaveLocalidad:
//  *                     type: string
//  *                   ClaveColonia:
//  *                     type: string
//  *                   ClavePais:
//  *                     type: string
//  *     responses:
//  *       200:
//  *         description: Datos fiscales de la empresa editados con éxito
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 data:
//  *                   $ref: '#/components/schemas/EntidadNegocio'
//  *       400:
//  *         description: Cuerpo de la petición inválido
//  *       404:
//  *         description: Entidad de negocio no encontrada
//  *       500:
//  *         description: Internal Server Error
//  */
// router.patch('/empresa/editar', datoseEmpresaController.editarIdEmpresa);

// DELETE - /api/datosFiscales

/**
 * @swagger
 * /api/v1/fiscales/empresa/desactivar/{id}:
 *   delete:
 *     summary: Desactivar una entidad de negocio
 *     tags: [Datos Fiscales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entidad de negocio a desactivar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entidad de negocio desactivada con éxito
 *         content:
 *           application/json:
 *             example:
 *               message: "Entidad de negocio desactivada: 1"
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos.
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       404:
 *         description: Entidad de negocio no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: "Entidad de negocio no encontrada"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */

router.delete(
    '/empresa/desactivar/:id',
    datoseEmpresaController.desactivarIdEmpresa,
);

export default router;