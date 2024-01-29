import { Router } from 'express';
import { methods } from '../controllers/datos.empresa.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/empresa.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();

/**
 * @swagger
 * /api/v1/empresa:
 *   get:
 *     tags:
 *       - Datos Empresa
 *     summary: Obtiene una lista de todas las empresas
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *  
 *
 */
router.get('/', methods.obtenerEmpresas);

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
 *                 Borrado:
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
	methods.buscarIdEmpresa,
);


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
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               RFC:
 *                 type: string
 *               NombreComercial:
 *                 type: string
 *               ClavePais:
 *                 type: string
 *               ClaveRegimenFiscal:
 *                 type: string
 *               PersonaFisica:
 *                 type: boolean
 *               PersonaMoral:
 *                 type: boolean
 *               NombreOficial:
 *                 type: string
 *               Borrado:
 *                 type: integer
 *               logo:
 *                 type: string
 *         CreadoPor:
 *           type: integer
 *           default: 1
 *         domicilio:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               Calle:
 *                 type: string
 *               NumeroExt:
 *                 type: string
 *               NumeroInt:
 *                 type: string
 *               CodigoPostal:
 *                 type: string
 *               Estado:
 *                 type: string
 *               Municipio:
 *                 type: string
 *               Localidad:
 *                 type: string
 *               Colonia:
 *                 type: string
 *               Pais:
 *                 type: string
 * /api/v1/empresa/crear:
 *   post:
 *     summary: Crear una nueva entidad de negocio
 *     tags: [Datos Empresa]
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
	'/crear',
	schemas.crearEmpresaSchema,
	middleware.validateSchema,
	methods.crearIdEmpresa,
);

/**
 * @swagger
 * /api/v1/empresa/editar/:
 *   patch:
 *     summary: Editar datos fiscales de la empresa
 *     tags: [Datos Empresa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entidad:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     EntidadNegocioId:
 *                      type: integer
 *                     RFC:
 *                       type: string
 *                     NombreComercial:
 *                       type: string
 *                     ClavePais:
 *                       type: string
 *                     TaxId:
 *                       type: string
 *                     ClaveRegimenFiscal:
 *                       type: string
 *                     PersonaFisica:
 *                       type: boolean
 *                     PersonaMoral:
 *                       type: boolean
 *                     NombreOficial:
 *                       type: string
 *                     Estatus:
 *                       type: integer
 *               domicilio:
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
 *                     Estado:
 *                       type: string
 *                     Municipio:
 *                       type: string
 *                     Localidad:
 *                       type: string
 *                     Colonia:
 *                       type: string
 *                     Pais:
 *                       type: string
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
router.patch(
	'/editar/',
	schemas.editarIdEmpresa,
	middleware.validateSchema,
	methods.editarIdEmpresa,
);


/**
 * @swagger
 * /api/v1/empresa/desactivar/{id}:
 *   delete:
 *     summary: Desactivar una entidad de negocio
 *     tags: [Datos Empresa]
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

router.delete('/desactivar/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	methods.desactivarIdEmpresa);


/**
 * @swagger
 * /api/v1/empresa/contactos/{id}:
 *   get:
 *     tags:
 *       - EmpresaContacto
 *     summary: Obtiene los contactos de una entidad de negocio por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID de la entidad de negocio
 *     responses:
 *       200:
 *         description: Contacto de la entidad de negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 EntidadNegocioId:
 *                   type: integer
 *                 ContactoId:
 *                   type: integer
 *                 Nombres:
 *                   type: string
 *                 ApellidoPaterno:
 *                   type: string
 *                 ApellidoMaterno:
 *                   type: string
 *                 Departamento:
 *                   type: string
 *                 Puesto:
 *                   type: string
 *             example: 
 *               {
 *                 "EntidadNegocioId": 33,
 *                 "ContactoId": 5,
 *                 "Nombres": "Sergio",
 *                 "ApellidoPaterno": "Perez",
 *                 "ApellidoMaterno": "Mendoza",
 *                 "Departamento": "IT",
 *                 "Puesto": "QA"
 *               }
 *       404:
 *         description: No se encontraron contactos para la entidad de negocio
 *         content:
 *           application/json:
 *             example:
 *               message: "No existen contactos relacionados con esta empresa"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */
router.get(
	'/contactos/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	methods.buscarContactosPorEntidadNegocioId,
);

/**
 * @swagger
 * /api/v1/empresa/contacto/crear:
 *   post:
 *     tags:
 *       - EmpresaContacto
 *     summary: Crea una nueva relación EmpresaContacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmpresaId:
 *                 type: integer
 *               Nombres:
 *                 type: string
 *               ApellidoPaterno:
 *                 type: string
 *               ApellidoMaterno:
 *                 type: string
 *               Departamento:
 *                 type: string
 *               Puesto:
 *                 type: string
 *               CreadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Relación creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 
 *       400:
 *         description: Cuerpo de la petición inválido
 *       500:
 *         description: Internal Server Error
 */
router.post(
	'/contacto/crear',
	schemas.crearEmpresaContactoSchema,
	middleware.validateSchema,
	methods.crearEmpresaContacto,
);

/**
 * @swagger
 * /api/v1/empresa/contacto/editar:
 *   patch:
 *     summary: Actualiza una relación EmpresaContacto
 *     tags: [EmpresaContacto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EntidadNegocioId:
 *                 type: integer
 *               ContactoId:
 *                 type: integer
 *               Nombres:
 *                 type: string
 *               ApellidoPaterno:
 *                 type: string
 *               ApellidoMaterno:
 *                 type: string
 *               Departamento:
 *                 type: string
 *               Puesto:
 *                 type: string
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: La relación EmpresaContacto se ha actualizado correctamente
 *       400:
 *         description: Error, ya existe una relación con esta EntidadNegocioId
 *       404:
 *         description: Empresa o Contacto no encontrado
 *       500:
 *         description: Error al actualizar la relación EmpresaContacto
 */
router.patch(
	'/contacto/editar',
	schemas.editarEmpresaContactoSchema,
	middleware.validateSchema,
	methods.editarEmpresaContacto,
);


/**
 * @swagger
 * /api/v1/empresa/{id}/telefono:
 *   get:
 *     tags:
 *       - EmpresaTelefono
 *     summary: Obtener teléfono de la entidad de negocio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entidad de negocio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Teléfono de la entidad de negocio
 *         content:
 *           application/json:
 *             Telefono:
 *               type: object
 *               properties:
 *                 EntidadNegocioId:
 *                   type: integer
 *                 NumeroTelefono:
 *                   type: string
 */
router.get(
	'/:id/telefono',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	methods.empresaDetalle,
);

/**
 * @swagger
 * /api/v1/empresa/telefono/crear:
 *   post:
 *     tags:
 *       - EmpresaTelefono
 *     summary: Crea una nueva relación EmpresaTelefono
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EntidadNegocioId:
 *                 type: integer
 *               NumeroTelefonico:
 *                 type: string
 *               CreadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: La relación EmpresaTelefono se ha creado correctamente
 *       500:
 *         description: Error al crear la relación EmpresaTelefono
 */
router.post(
	'/telefono/crear',
	schemas.crearEmpresaTelefonoSchema,
	middleware.validateSchema,
	methods.crearEmpresaTelefono,
);

/**
 * @swagger
 * /api/v1/empresa/telefono/editar:
 *   patch:
 *     tags:
 *       - EmpresaTelefono
 *     summary: Actualiza una relación EmpresaTelefono existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TelefonoId:
 *                 type: integer
 *               NumeroTelefonico:
 *                 type: string
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: La relación EmpresaTelefono se ha actualizado correctamente
 *       400:
 *         description: Cuerpo de la petición inválido
 *       500:
 *         description: Error al actualizar la relación EmpresaTelefono
 */
router.patch(
	'/telefono/editar',
	schemas.editarEmpresaTelefonoSchema,
	middleware.validateSchema,
	methods.editarEmpresaTelefono,
);

/**
 * @swagger
 * /api/v1/empresa/telefono/desactivar:
 *   delete:
 *     tags:
 *       - EmpresaTelefono
 *     summary: Desactiva una relación EmpresaTelefono existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EntidadNegocioId:
 *                 type: integer
 *               TelefonoId:
 *                 type: integer
 *               BorradoPor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Relación EmpresaTelefono desactivada
 *       404:
 *         description: La relación EmpresaTelefono no existe
 *       500:
 *         description: Error del servidor
 */
router.delete('/telefono/desactivar', methods.desactivarEmpresaTelefono);

/**
 * @swagger
 * /api/v1/empresa/emails/:id:	
 *   get:
 *     tags:
 *       - EmpresaEmail
 *     summary: Obtener emails de la entidad de negocio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la entidad de negocio
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Emails de la entidad de negocio
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   EntidadNegocioId:
 *                     type: integer
 *                   Email:
 *                     type: string
 *       404:
 *         description: No existen emails relacionados con esta empresa
 *       500:
 *         description: Error al obtener los emails
 */
router.get(
	'/emails/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	methods.buscarEmailsPorEmpresa,
);

/**
 * @swagger
 * /api/v1/empresa/emails/crear:
 *   post:
 *     tags:
 *       - EmpresaEmail
 *     summary: Crea una nueva relación EmpresaEmail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EntidadNegocioId:
 *                 type: integer
 *               Email:
 *                 type: string
 *               CreadorPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: La relación EmpresaEmail se ha creado correctamente
 *       404:
 *         description: La empresa no existe
 *       500:
 *         description: Error al crear la relación EmpresaEmail
 */
router.post(
	'/emails/crear',
	schemas.crearEmailEmpresaSchema,
	middleware.validateSchema,
	methods.crearEmailEmpresa,
);

/**
 * @swagger
 * /api/v1/empresa/emails/editar:
 *   patch:
 *     tags:
 *       - EmpresaEmail
 *     summary: Editar una relación EmpresaEmail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ContactoId:
 *                 type: integer
 *               Email:
 *                 type: string
 *               ActualizadoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Se ha actualizado el email
 *       404:
 *         description: La empresa o el email no existe
 *       500:
 *         description: Error al actualizar el email
 */
router.patch(
	'/emails/editar',
	schemas.editarEmpresaEmailsSchema,
	middleware.validateSchema,
	methods.editarEmpresaEmails,
);

/**
 * @swagger
 * /api/v1/empresa/emails/desactivar:
 *   delete:
 *     tags:
 *       - EmpresaEmail
 *     summary: Eliminar una relación EmpresaEmail
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EntidadNegocioId:
 *                 type: integer
 *               EmailId:
 *                 type: integer
 *               BorradoPor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Se ha eliminado el email
 *       404:
 *         description: La empresa o el email no existe
 *       500:
 *         description: Error al eliminar el email
 */
router.delete('/emails/desactivar', methods.desactivarEmpresaEmails);



/**
 * @swagger
 * tags:
 *   name: Datos Empresa
 *   description: Operaciones relacionadas con la empresa
 *
 * /api/v1/empresa/nombre/{nombre}:
 *   get:
 *     tags: [Datos Empresa]
 *     summary: Buscar empresas por nombre oficial
 *     description: Devuelve una lista de empresas que coinciden con el nombre oficial proporcionado
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre oficial de la empresa
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error interno del servidor
 */
router.get('/nombre/:nombre', methods.buscarPorNombreOficial);

export default router;
