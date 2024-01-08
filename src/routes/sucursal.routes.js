import { param } from 'express-validator';
import { methods } from '../controllers/sucursal.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import { Router } from 'express';

const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Sucursal
 *     description: Operaciones relacionadas la sucursal
 *
 */


/*
  {
    "SucursalId": 1010,
    "NombreSucursal": "Sucursal de prueba",
    "EntidadNegocioId": 1,
    "ClavePais": "MEX",
    "NombreEstado": "Quintana Roo",
    "CodigoPostal": "37753",
    "Calle": "Calle 135."
  }

*/
/**
 * @swagger
 * /api/v1/sucursal/{id_empresa}:
 *   get:
 *     summary: Obtener sucursales por ID de empresa
 *     tags: [Sucursal]
 *     parameters:
 *       - in: path
 *         name: id_empresa
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
 *               - SucursalId: 1
 *                 NombreSucursal: nombre sucursal
 *                 EntidadNegocioId: 1
 *                 Puesto: Gerente
 *                 ClavePais: MEX
 *                 NombreEstado: Quintana Roo
 *                 CodigoPostal: 37753
 *                 Calle: Calle 135.
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             example:
 *               errors: [Parámetro inválido]
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: "Error al obtener las sucursales"
 */
router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
    middleware.validateSchema,
	methods.obtenerSucursales,
);

export default router;
