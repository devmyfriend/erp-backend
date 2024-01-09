import { Router } from 'express';
import { methods as datosFiscalesController } from '../controllers/datos.fiscales.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/datosFiscales.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();

// GET - /api/datosFiscales

/**
 * @swagger
 * /api/v1/fiscales/{id}:
 *   get:
 *     summary: Obtener datos fiscales de la empresa por ID
 *     tags: [Datos Fiscales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la empresa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos fiscales de la empresa
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
 *                 PersonalMoral:
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
    datosFiscalesController.buscarIdEmpresa,
);

/**
 * @swagger
 * /api/v1/datosFiscales/buscarIdRFC/{rfc}:
 *   get:
 *     summary: Buscar una entidad de negocio por RFC
 *     tags: [Datos Fiscales]
 *     parameters:
 *       - in: path
 *         name: rfc
 *         schema:
 *           type: string
 *         required: true
 *         description: RFC de la entidad de negocio a buscar
 *     responses:
 *       200:
 *         description: Entidad de negocio encontrada con éxito
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
 *         description: RFC no proporcionado
 *         content:
 *           application/json:
 *             example:
 *               error: "RFC no proporcionado"
 *       404:
 *         description: No se encontró la entidad de negocio con el RFC proporcionado
 *         content:
 *           application/json:
 *             example:
 *               error: "No se encontró la entidad de negocio con el RFC proporcionado"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */
router.get('/buscarPorRFC/:rfc', datosFiscalesController.buscarIdRFC);

// router.get('/descripcion', datosFiscalesController.obtenerDescripcion);

// router.get('/pais', datosFiscalesController.obtenerPais);

// router.get('/personafisica', datosFiscalesController.obtenerPersonaFisica);

// router.get('/personamoral', datosFiscalesController.obtenerPersonaMoral);

// router.get('/taxId', datosFiscalesController.obtenerTaxId);

// router.get('/regimenFiscal', datosFiscalesController.obtenerRegimenFiscal);

// router.get('/nombreComercial', datosFiscalesController.obtenerNombreComercial);

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
    datosFiscalesController.crearIdEmpresa,
);


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     crearEmpresaSchema:
//  *       type: object
//  *       required:
//  *         - EntidadNegocioId
//  *         - EsPropietaria
//  *         - RFC
//  *         - NombreComercial
//  *         - ClavePais
//  *         - TaxId
//  *         - ClaveRegimenFisca
//  *         - PersonaFisica
//  *         - PersonaMoral
//  *         - NombreOficial
//  *         - Estatus
//  *         - CreadoPor
//  *         - ActualizadoPor
//  *         - logo
//  *         - BorradoPor
//  *         - BorradoEn
//  *       properties:
//  *         EntidadNegocioId:
//  *           type: integer
//  *           description: El ID de la entidad de negocio
//  *         EsPropietaria:
//  *           type: boolean
//  *           description: Si la entidad es propietaria
//  *         RFC:
//  *           type: string
//  *           description: El RFC de la entidad
//  *         NombreComercial:
//  *           type: string
//  *           description: El nombre comercial de la entidad
//  *         ClavePais:
//  *           type: string
//  *           description: La clave del país de la entidad
//  *         TaxId:
//  *           type: string
//  *           description: El ID de impuestos de la entidad
//  *         ClaveRegimenFisca:
//  *           type: string
//  *           description: La clave del régimen fiscal de la entidad
//  *         PersonaFisica:
//  *           type: integer
//  *           description: Si la entidad es una persona física
//  *         PersonalMoral:
//  *           type: integer
//  *           description: Si la entidad es una persona moral
//  *         NombreOficial:
//  *           type: string
//  *           description: El nombre oficial de la entidad
//  *         Estatus:
//  *           type: integer
//  *           description: El estatus de la entidad
//  *         CreadoPor:
//  *           type: string
//  *           description: El ID del usuario que creó la entidad
//  *         ActualizadoPor:
//  *           type: integer
//  *           description: El ID del usuario que actualizó la entidad
//  *         logo:
//  *           type: string
//  *           description: El logo de la entidad
//  *         BorradoPor:
//  *           type: string
//  *           description: El ID del usuario que borró la entidad
//  *         BorradoEn:
//  *           type: string
//  *           format: string
//  *           description: La fecha en que se borró la entidad
//  * /api/v1/fiscales/empresa/crear:
//  *   post:
//  *     summary: Crear una nueva entidad de negocio
//  *     tags: [Datos Fiscales]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/crearEmpresaSchema'
//  *     responses:
//  *       201:
//  *         description: Entidad de negocio creada con éxito
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 data:
//  *                   $ref: '#/components/schemas/crearEmpresaSchema'
//  *       400:
//  *         description: Datos de entrada inválidos
//  *       500:
//  *         description: Internal Server Error
//  */
// router.post(
//     '/empresa/crear',
//     schemas.crearIdEmpresaSchema,
//     middleware.validateSchema,
//     datosFiscalesController.crearIdEmpresa,
// );

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     crearEmpresaSchema:
//  *       type: object
//  *       required:
//  *         - EntidadNegocioId
//  *         - EsPropietaria
//  *         - RFC
//  *         - NombreComercial
//  *         - ClavePais
//  *         - TaxId
//  *         - ClaveRegimenFisca
//  *         - PersonaFisica
//  *         - PersonaMoral
//  *         - NombreOficial
//  *         - Estatus
//  *         - CreadoPor
//  *         - ActualizadoPor
//  *         - logo
//  *         - BorradoPor
//  *         - BorradoEn
//  *       properties:
//  *         EntidadNegocioId:
//  *           type: integer
//  *           description: El ID de la entidad de negocio
//  *         EsPropietaria:
//  *           type: boolean
//  *           description: Si la entidad es propietaria
//  *         RFC:
//  *           type: string
//  *           description: El RFC de la entidad
//  *         NombreComercial:
//  *           type: string
//  *           description: El nombre comercial de la entidad
//  *         ClavePais:
//  *           type: string
//  *           description: La clave del país de la entidad
//  *         TaxId:
//  *           type: string
//  *           description: El ID de impuestos de la entidad
//  *         ClaveRegimenFisca:
//  *           type: string
//  *           description: La clave del régimen fiscal de la entidad
//  *         PersonaFisica:
//  *           type: integer
//  *           description: Si la entidad es una persona física
//  *         PersonalMoral:
//  *           type: integer
//  *           description: Si la entidad es una persona moral
//  *         NombreOficial:
//  *           type: string
//  *           description: El nombre oficial de la entidad
//  *         Estatus:
//  *           type: integer
//  *           description: El estatus de la entidad
//  *         CreadoPor:
//  *           type: string
//  *           description: El ID del usuario que creó la entidad
//  *         ActualizadoPor:
//  *           type: integer
//  *           description: El ID del usuario que actualizó la entidad
//  *         logo:
//  *           type: string
//  *           description: El logo de la entidad
//  *         BorradoPor:
//  *           type: string
//  *           description: El ID del usuario que borró la entidad
//  *         BorradoEn:
//  *           type: string
//  *           format: string
//  *           description: La fecha en que se borró la entidad
//  * /api/v1/fiscales/empresa/crear:
//  *   post:
//  *     summary: Crear una nueva entidad de negocio
//  *     tags: [Datos Fiscales]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/crearEmpresaSchema'
//  *     responses:
//  *       201:
//  *         description: Entidad de negocio creada con éxito
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                 data:
//  *                   $ref: '#/components/schemas/crearEmpresaSchema'
//  *       400:
//  *         description: Datos de entrada inválidos
//  *       500:
//  *         description: Internal Server Error
//  */
// router.post(
//     '/empresa/crear',
//     middleware.validateSchema,
//     datosFiscalesController.crearIdEmpresa,
// );



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
router.patch('/empresa/editar/:id', datosFiscalesController.editarIdEmpresa);

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
// router.patch('/empresa/editar', datosFiscalesController.editarIdEmpresa);

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
    datosFiscalesController.desactivarIdEmpresa,
);

/**
 * @swagger
 * /api/v1/fiscales/regimenes/listado:
 *   get:
 *     summary: Obtener la lista de regímenes fiscales
 *     tags: [Datos Fiscales]
 *     responses:
 *       200:
 *         description: La lista de regímenes fiscales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveRegimenFiscal:
 *                     type: string
 *                   Descripcion:
 *                     type: string
 *                   Fisica:
 *                     type: boolean
 *                   Moral:
 *                     type: boolean
 *       500:
 *         description: Internal Server Error
 */
router.get(
    '/regimenes/listado',
    datosFiscalesController.obtenerRegimenesFiscales,
);

export default router;
