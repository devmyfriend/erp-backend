import { Router } from 'express';
import { methods } from '../controllers/tax.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Impuestos
 *     description: Operaciones relacionadas con los impuestos
 *
 *
 */

/**
 * @swagger
 * /api/v1/impuestos:
 *   get:
 *     summary: Obtener una lista de impuestos
 *     tags: [Impuestos]
 *     responses:
 *       200:
 *         description: Lista de impuestos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveImpuesto:
 *                     type: string
 *                     example: "ABW"
 *                   Nombre:
 *                     type: string
 *                     example: "ISR"
 *                   Activo:
 *                     type: boolean
 *                     example: "true"
 */


router.get('/', methods.findTax);


export default router;
