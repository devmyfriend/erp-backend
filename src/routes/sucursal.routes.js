import { methods } from '../controllers/sucursal.controller.js';

import { Router } from 'express';

const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Sucursal
 *     description: Operaciones relacionadas la sucursal
 *
 */


/**
 * @swagger
 * /api/v1/sucursal:
 *   get:
 *     summary: Obtener contactos por ID de sucursal
 *     tags: [Sucursal]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - ContactoId: 1
 *                 SucursalId: 1010
 *                 Nombres: Sebastian
 *                 Puesto: Gerente
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             example:
 *               error: "Parámetro inválido"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno del servidor"
 */
router.get('/:id', methods.obtenerSucursales);

export default router;
