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
 *               municipio:
 *                 type: string
 *                 example: "El Llano"
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
router.get('/sat/cfdi/lista', methods.findCFDI)

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
router.get('/metodos/pago', methods.paymentMethods)

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
router.get('/metodos/moneda', methods.getTypeCoin)

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
router.get('/metodos/moneda/buscar/:id', methods.findTypeCoin)




export default router;
