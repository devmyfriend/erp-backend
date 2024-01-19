import { Router } from 'express';
import { methods } from '../controllers/catalogos.busquedas.controller.js';

import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/cat.search.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Catálogos Y búsquedas
 *     description: Operaciones relacionadas con los Catálogos y sus busquedas
 *
 *
 */

/**
 * @swagger
 * /api/v1/catalogo/cp:
 *   get:
 *     summary: Obtener una lista de códigos postales
 *     tags: [Catálogos Y búsquedas]
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
 *     tags: [Catálogos Y búsquedas]
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

export default router;
