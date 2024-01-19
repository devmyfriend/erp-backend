import { Router } from 'express';
import { methods } from '../controllers/catalogos.busquedas.controller.js';

// import * as middleware from '../middlewares/express-validator.js';
// import { body, param } from 'express-validator';
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
 *     summary: Obtener una lista de países
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
 *                   ClavePais:
 *                     type: string
 *                     example: "ABW"
 *                   Descripcion:
 *                     type: string
 *                     example: "Aruba"
 */

router.get('/cp', methods.getPostalCodes);

export default router;
