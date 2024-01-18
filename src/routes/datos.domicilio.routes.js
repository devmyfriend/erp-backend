import { Router } from 'express';
import { methods as datosDomicilioController } from '../controllers/datos.domicilio.controller.js';
const router = Router();


/**
 * @swagger
 * tags:
 *   - name: SAT
 *     description: Operaciones relacionadas con el catalogo del SAT
 */

/**
 * @swagger
 * /api/v1/domicilio/sat/{codigoPostal}:
 *   get:
 *     summary: Obtener colonias por código postal del SAT
 *     tags: [SAT]
 *     parameters:
 *       - in: path
 *         name: codigoPostal
 *         required: true
 *         description: Código postal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de colonias para el código postal dado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idColonia:
 *                     type: integer
 *                   claveColonia:
 *                     type: string
 *                     example: "001"
 *                   codigoPostal:
 *                     type: string
 *                     example: "77509"
 *                   nombre:
 *                     type: string
 *                     example: "Colonia 1"
 */
router.get('/sat/:codigoPostal', datosDomicilioController.obtenerColoniasPorCodigoPostal);

export default router;
