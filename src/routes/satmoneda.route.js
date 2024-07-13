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
 *            description: Moneda SAT registrado correctamente
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Se creo moneda SAT"
 *                     data:
 *                        - ClaveMoneda: "AFN"
 *                          Descripcion: "Afghani"
 *         404:
 *            description: La clave de moneda SAT que se está agregando ya existe.
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
    schemas.CrarMoneda,
    middleware.validateSchema,
    methods.CrarMoneda
);

/**
 * @swagger
 * /api/v1/satmetodopago/editar:
 *   patch:
 *      summary: Actualizar moneda SAT
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
 *                        description: Clave moneda SAT (Requerido)
 *                     Descripcion:
 *                        type: integer
 *                        description: nombre/ descripción de moneda sat (requerido)
 *                  example:
 *                     ClaveMoneda: "AFN"
 *                     Descripcion: "Afghani"
 *      responses:
 *         200:
 *            description: Moneda SAT actualizado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Se actualizó moneda SAT correctamente"
 *         404:
 *            description: La clave de moneda SAT que se esta editando no existe.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave de moneda SAT no esta dado de alta"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     error: "Error al obtener los datos"
 */ 

router.patch(
    '/editar',
    schemas.EditarMoneda,
    middleware.validateSchema,
    methods.EditarMoneda
);