import { Router } from 'express';
import { methods } from '../controllers/catalogos.busquedas.controller.js';

import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/cat.search.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Catálogo de códigos postales
 *     description: Operaciones relacionadas con códigos postales
 *
 *   - name: Catálogo de colonias
 *     description: Operaciones relacionadas con las colonias
 *
 *   - name: Régimen Fiscal y CFDI
 *     description: Régimen fiscal con sus usos de CFDI
 *
 *   - name: Metodos de pago
 *     description: Metodos de pago
 *
 *
 */

/**
 * @swagger
 * /api/v1/catalogo/cp:
 *   get:
 *     summary: Obtener una lista de códigos postales
 *     tags: [Catálogo de códigos postales]
 *     responses:
 *       200:
 *         description: Lista de códigos postales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pais:
 *                     type: string
 *                     example: "México"
 *                   codigo_postal:
 *                     type: string
 *                     example: "01000"
 *                   estado:
 *                     type: string
 *                     example: "Ciudad de México"
 *                   municipio:
 *                     type: string
 *                     example: "El Llano"
 *                   localidad:
 *                     type: string
 *                     example: "Aguascalientes"
 */

router.get('/cp', methods.getPostalCodes);
/**
 * @swagger
 * /api/v1/catalogo/cp/buscar:
 *   post:
 *     summary: Buscar códigos postales
 *     tags: [Catálogo de códigos postales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cp:
 *                 type: string
 *                 example: "01000"
 *
 *     responses:
 *       200:
 *         description: Lista de códigos postales encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pais:
 *                     type: string
 *                     example: "México"
 *                   codigo_postal:
 *                     type: string
 *                     example: "01000"
 *                   estado:
 *                     type: string
 *                     example: "Ciudad de México"
 *                   municipio:
 *                     type: string
 *                     example: "El Llano"
 *                   localidad:
 *                     type: string
 *                     example: "Aguascalientes"
 */
router.post(
	'/cp/buscar',
	schemas.findPostalCodeSchema,
	middleware.validateSchema,
	methods.findPostalCodes,
);

/**
 * @swagger
 * /api/v1/catalogo/colonias:
 *   get:
 *     summary: Obtener la lista de colonias
 *     tags: [Catálogo de colonias]
 *     responses:
 *       200:
 *         description: Lista de colonias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveColonia:
 *                     type: string
 *                     example: "0001"
 *                   CodigoPostal:
 *                     type: string
 *                     example: "01000"
 *                   Nombre:
 *                     type: string
 *                     example: "San Ángel"
 */
router.get('/colonias', methods.findCol);

/**
 * @swagger
 * /api/v1/catalogo/colonias/buscar:
 *   post:
 *     summary: Buscar colonia
 *     tags: [Catálogo de colonias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cp:
 *                 type: string
 *                 example: "77518"
 *               colonia:
 *                 type: string
 *                 example: "Sacbe"
 *     responses:
 *       200:
 *         description: Lista de códigos postales encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveColonia:
 *                     type: string
 *                     example: "0033"
 *                   CodigoPostal:
 *                     type: string
 *                     example: "01000"
 *                   Nombre:
 *                     type: string
 *                     example: "Privadas Sacbe"
 */
router.post(
	'/colonias/buscar',
	schemas.findColSchema,
	middleware.validateSchema,
	methods.findColByName,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   get:
 *     summary: Obtener Régimen Fiscal y CFDI
 *     tags: [Régimen Fiscal y CFDI]
 *     responses:
 *       200:
 *         description: Régimen Fiscal y CFDI
 *         content:
 *           application/json:
 *             example:
 *               - regimen:
 *                   ClaveRegimenFiscal: "601"
 *                   Descripcion: "General de Ley Personas Morales"
 *                   Fisica: false
 *                   Moral: true
 *                 cfdi:
 *                   - ClaveUsoCFDI: "G01"
 *                     Descripcion: "Adquisición de mercancías."
 *                     Fisica: 1
 *                     Moral: 1
 *                   - ClaveUsoCFDI: "G02"
 *                     Descripcion: "Devoluciones, descuentos o bonificaciones."
 *                     Fisica: 1
 *                     Moral: 1
 */

router.get('/sat/cfdi', methods.findSatRF);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi/lista:
 *   get:
 *     summary: Lista CFDI
 *     tags: [Régimen Fiscal y CFDI]
 *     responses:
 *       200:
 *         description: Lista CFDI
 *         content:
 *           application/json:
 *             example:
 *                   - ClaveUsoCFDI: "G01"
 *                     Descripcion: "Adquisición de mercancías."
 *                     Fisica: 1
 *                     Moral: 1
 *                   - ClaveUsoCFDI: "G02"
 *                     Descripcion: "Devoluciones, descuentos o bonificaciones."
 *                     Fisica: 1
 *                     Moral: 1
 */
router.get('/sat/cfdi/lista', methods.findCFDI);

/**
 * @swagger
 * /api/v1/catalogo/metodos/pago:
 *   get:
 *     summary: Obtener una lista de formas y metodos de pago
 *     tags: [Metodos de pago]
 *     responses:
 *       200:
 *         description: Lista de formas y metodos de pago
 *         content:
 *           application/json:
 *             example:
 *                   - metodos: []
 *                   - formas: []
 */
router.get('/metodos/pago', methods.paymentMethods);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   get:
 *     summary: Obtener una lista de los tipos de moneda
 *     tags: [Metodos de pago]
 *     responses:
 *       200:
 *         description: Lista de los tipos de moneda
 *         content:
 *           application/json:
 *             example:
 *                   - ClaveMoneda: "MXN"
 *                     Descripcion: "Peso Mexicano"
 *
 */
router.get('/metodos/moneda', methods.getTypeCoin);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda/buscar/{Descripcion}:
 *   get:
 *     summary: Obtener una lista de los tipos de moneda.
 *     tags: [Metodos de pago]
 *     parameters:
 *       - in: path
 *         name: Descripcion
 *         required: true
 *         description: Descripción del tipo de moneda a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipos de moneda encontrados.
 *         content:
 *           application/json:
 *             example:
 *               TiposDeMoneda:
 *                 - ClaveMoneda: "MXN"
 *                   Descripcion: "Peso Mexicano"
 */
router.get('/metodos/moneda/buscar/:id', methods.findTypeCoin);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   post:
 *     tags:
 *       - Moneda
 *     summary: Crear un nuevo tipo de moneda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Moneda creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Moneda'
 *       500:
 *         description: Error al crear la moneda
 */
router.post(
	'/metodos/moneda',
	schemas.createTypeCoinSchema,
	middleware.validateSchema,
	methods.createTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   patch:
 *     summary: Actualiza una moneda existente
 *     tags: [Moneda]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *                 description: La clave de la moneda a actualizar
 *               Descripcion:
 *                 type: string
 *                 description: La nueva descripción de la moneda
 *     responses:
 *       200:
 *         description: Moneda actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Moneda no encontrada
 *       500:
 *         description: Error al actualizar la moneda
 */
router.patch(
	'/metodos/moneda',
	schemas.updateTypeCoinSchema,
	middleware.validateSchema,
	methods.updateTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   delete:
 *     summary: Desactiva una moneda existente
 *     tags: [Moneda]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *                 description: La clave de la moneda a desactivar
 *     responses:
 *       200:
 *         description: Moneda desactivada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Moneda no encontrada
 *       500:
 *         description: Error al desactivar la moneda
 */
router.delete(
	'/metodos/moneda',
	schemas.deleteTypeCoinSchema,
	middleware.validateSchema,
	methods.deleteTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   post:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Crea un nuevo régimen fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: integer
 *                 description: La clave del régimen fiscal
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del régimen fiscal
 *               Fisica:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas morales
 *     responses:
 *       200:
 *         description: Régimen fiscal creado con éxito
 *       500:
 *         description: Error al crear el régimen fiscal
 */
router.post(
	'/sat/regimenfiscal',
	schemas.createSatFKSchema,
	middleware.validateSchema,
	methods.createRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   patch:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Actualiza un régimen fiscal existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: integer
 *                 description: La clave del régimen fiscal
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del régimen fiscal
 *               Fisica:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas morales
 *     responses:
 *       200:
 *         description: Régimen fiscal actualizado con éxito
 *       404:
 *         description: Régimen fiscal no encontrado
 *       500:
 *         description: Error al actualizar el régimen fiscal
 */
router.patch(
	'/sat/regimenfiscal',
	schemas.editSatFKSchema,
	middleware.validateSchema,
	methods.updateRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   delete:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Borra un régimen fiscal existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *     responses:
 *       200:
 *         description: Régimen fiscal borrado con éxito
 *       400:
 *         description: El régimen fiscal ya está desactivado
 *       404:
 *         description: Régimen fiscal no encontrado
 *       500:
 *         description: Error al borrar el régimen fiscal
 */
router.delete(
	'/sat/regimenfiscal',
	schemas.deleteSatFKSchema,
	middleware.validateSchema,
	methods.deleteRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   post:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Crea un nuevo uso de CFDI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del uso de CFDI
 *               Fisica:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas morales
 *     responses:
 *       200:
 *         description: Uso de CFDI creado con éxito
 *       500:
 *         description: Error al crear el uso de CFDI
 */
router.post(
	'/sat/cfdi',
	schemas.createCFDISchema,
	middleware.validateSchema,
	methods.createUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   patch:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Edita un uso de CFDI existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del uso de CFDI
 *               Fisica:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas morales
 *     responses:
 *       200:
 *         description: Uso de CFDI editado con éxito
 *       404:
 *         description: Uso de CFDI no encontrado
 *       500:
 *         description: Error al editar el uso de CFDI
 */
router.patch(
	'/sat/cfdi',
	schemas.editCFDISchema,
	middleware.validateSchema,
	methods.updateUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   delete:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Borra un uso de CFDI existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *     responses:
 *       200:
 *         description: Uso de CFDI borrado con éxito
 *       400:
 *         description: El uso de CFDI no existe
 *       404:
 *         description: Uso de CFDI no encontrado
 *       500:
 *         description: Error al borrar el uso de CFDI
 */
router.delete(
	'/sat/cfdi',
	schemas.deleteCFDISchema,
	middleware.validateSchema,
	methods.deleteCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   delete:
 *     summary: Desactiva una moneda existente
 *     tags: [Moneda]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *                 description: La clave de la moneda a desactivar
 *     responses:
 *       200:
 *         description: Moneda desactivada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Moneda no encontrada
 *       500:
 *         description: Error al desactivar la moneda
 */
router.delete(
	'/metodos/moneda',
	schemas.deleteTypeCoinSchema,
	middleware.validateSchema,
	methods.deleteTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   post:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Crea un nuevo régimen fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: integer
 *                 description: La clave del régimen fiscal
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del régimen fiscal
 *               Fisica:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas morales
 *     responses:
 *       200:
 *         description: Régimen fiscal creado con éxito
 *       500:
 *         description: Error al crear el régimen fiscal
 */
router.post(
	'/sat/regimenfiscal',
	schemas.createSatFKSchema,
	middleware.validateSchema,
	methods.createRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   patch:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Actualiza un régimen fiscal existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: integer
 *                 description: La clave del régimen fiscal
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del régimen fiscal
 *               Fisica:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas morales
 *     responses:
 *       200:
 *         description: Régimen fiscal actualizado con éxito
 *       404:
 *         description: Régimen fiscal no encontrado
 *       500:
 *         description: Error al actualizar el régimen fiscal
 */
router.patch(
	'/sat/regimenfiscal',
	schemas.editSatFKSchema,
	middleware.validateSchema,
	methods.updateRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   delete:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Borra un régimen fiscal existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *     responses:
 *       200:
 *         description: Régimen fiscal borrado con éxito
 *       400:
 *         description: El régimen fiscal ya está desactivado
 *       404:
 *         description: Régimen fiscal no encontrado
 *       500:
 *         description: Error al borrar el régimen fiscal
 */
router.delete(
	'/sat/regimenfiscal',
	schemas.deleteSatFKSchema,
	middleware.validateSchema,
	methods.deleteRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   post:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Crea un nuevo uso de CFDI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del uso de CFDI
 *               Fisica:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas morales
 *     responses:
 *       200:
 *         description: Uso de CFDI creado con éxito
 *       500:
 *         description: Error al crear el uso de CFDI
 */
router.post(
	'/sat/cfdi',
	schemas.createCFDISchema,
	middleware.validateSchema,
	methods.createUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   patch:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Edita un uso de CFDI existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del uso de CFDI
 *               Fisica:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas morales
 *     responses:
 *       200:
 *         description: Uso de CFDI editado con éxito
 *       404:
 *         description: Uso de CFDI no encontrado
 *       500:
 *         description: Error al editar el uso de CFDI
 */
router.patch(
	'/sat/cfdi',
	schemas.editCFDISchema,
	middleware.validateSchema,
	methods.updateUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   delete:
 *     tags: [Régimen Fiscal y CFDI]
 *     summary: Borra un uso de CFDI existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *     responses:
 *       200:
 *         description: Uso de CFDI borrado con éxito
 *       400:
 *         description: El uso de CFDI no existe
 *       404:
 *         description: Uso de CFDI no encontrado
 *       500:
 *         description: Error al borrar el uso de CFDI
 */
router.delete('/sat/cfdi',
schemas.deleteCFDISchema,
middleware.validateSchema,
methods.deleteCFDI);

export default router;
