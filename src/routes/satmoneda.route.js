import { Router } from 'express';
import { methods } from "../controllers/satmoneda.controller.js";
import * as schemas from '../schemas/satmoneda.schema.js';
import * as middleware from '../middlewares/express-validator.js';
import { param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *    - name: Monedas SAT
 *      description: Módulos Monedas SAT.
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       SatMetodoPagoModel:
 *          type: object
 *          properties:
 *             ClaveMoneda:
 *                type: string
 *                description: Clave Moneda SAT (Requerido)
 *             Descripcion:
 *                type: string
 *                description: nombre / descripción de moneda SAT (requerido)
 *             Activo:
 *                type: boolean
 *                description: si es visible (requerido)
 */

/**
 * @swagger
 * /api/v1/satmetodopago/crear:
 *   post:
 *      summary: Crear monedas SAT
 *      tags: [Monedas SAT]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     ClaveMoneda:
 *                        type: string
 *                        description: Clave Moneda SAT (Requerido)
 *                     Descripcion:
 *                        type: integer
 *                        description: nombre / descripción de moneda SAT (requerido)
 *                  example:
 *                     ClaveMoneda: "AFN"
 *                     Descripcion: "Afghani"
 *      responses:
 *         200:
 *            description: Moneda SAT registrado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Se creo moneda SAT"
 *                     data:
 *                        - ClaveMoneda: "AFN"
 *                          Descripcion: "Afghani"
 *         404:
 *            description: La clave de moneda SAT ya existe.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave de moneda SAT ya está en uso"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     error: "Error al obtener los datos"
 */ 
 
router. post(
    '/crear',
    schemas.crea,
    middleware.validateSchema,
    methods.CrearSatMetodoPago
);
