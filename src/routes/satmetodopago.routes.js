import { Router } from 'express';
import { methods } from "../controllers/satmetodopago.controller.js";
import * as schemas from '../schemas/satmetodopago.schema.js';
import * as middleware from '../middlewares/express-validator.js';
import { param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *    - name: MÉTODOS DE PAGO SAT
 *      description: Listado de métodos de pago SAT 
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       SatMetodoPagoModel:
 *          type: object
 *          properties:
 *             ClaveMetodoPago:
 *                type: string
 *                description: Clave método de pago (Requerido)
 *             Descripcion:
 *                type: string
 *                description: nombre/ descripción de método de pago (requerido)
 *             Activo:
 *                type: boolean
 *                description: si es visible (requerido)
 */

/**
 * @swagger
 * /api/v1/satmetodopago:
 *    get:
 *       summary: Obtener listado de metodos de pagos
 *       tags: [MÉTODOS DE PAGO SAT]
 *       responses:
 *          200:
 *             description: Lista métodos de pago SAT
 *             content:
 *                application/json:
 *                   example:
 *                      ClaveMetodoPago: "PUE"
 *                      Descripcion: "Pago en una sola exhibición"
 *                      Activo: true
 *          500:
 *             description: Error del servidor
 *             content:
 *                application/json:
 *                   example:
 *                      error: "Error interno del servidor"
 */

router.get(
    '/',
    methods.ObtenerSatMetodoPago
);

/**
 * @swagger
 * /api/v1/satmetodopago/crear:
 *   post:
 *      summary: Crear método de pago SAT
 *      tags: [MÉTODOS DE PAGO SAT]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     ClaveMetodoPago:
 *                        type: string
 *                        description: Clave método de pago (Requerido)
 *                     Descripcion:
 *                        type: integer
 *                        description: nombre/ descripción de método de pago (requerido)
 *                  example:
 *                     ClaveMetodoPago: "PUE"
 *                     Descripcion: "Pago en una sola exhibición"
 *      responses:
 *         200:
 *            description: Método de pago registrado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Se creo método de pago"
 *                     data:
 *                        - ClaveMetodoPago: "PUE"
 *                          Descripcion: "Pago en una sola exhibición"
 *         404:
 *            description: La clave del método de pago ya está en uso.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave del método de pago ya está en uso"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     errors: "Error al obtener los datos"
 */ 
 
router. post(
    '/crear',
    schemas.CrarMetodoPago,
    middleware.validateSchema,
    methods.CrearSatMetodoPago
);

/**
 * @swagger
 * /api/v1/satmetodopago/editar:
 *   patch:
 *      summary: Actualizar método de pago SAT
 *      tags: [MÉTODOS DE PAGO SAT]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     ClaveMetodoPago:
 *                        type: string
 *                        description: Clave método de pago (Requerido)
 *                     Descripcion:
 *                        type: integer
 *                        description: nombre/ descripción de método de pago (requerido)
 *                  example:
 *                     ClaveMetodoPago: "PUE"
 *                     Descripcion: "Pago en una sola exhibición"
 *      responses:
 *         200:
 *            description: Método de pago actualizado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Se actualizó método de pago SAT correctamente"
 *         404:
 *            description: El método de pago no existe
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave del método de pago no existe"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     error: "Error al obtener los datos"
 */ 

router.patch(
    '/editar',
    schemas.EditarMetodoPago,
    middleware.validateSchema,
    methods.EditarSatMetodoPago
);

/**
 * @swagger
 * /api/v1/satmetodopago/habilitar:
 *   patch:
 *      summary: Habilitar método de pago SAT
 *      tags: [MÉTODOS DE PAGO SAT]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     ClaveMetodoPago:
 *                        type: string
 *                        description: Clave método de pago (Requerido)
 *                  example:
 *                     ClaveMetodoPago: "PUE"
 *      responses:
 *         200:
 *            description: Método de pago actualizado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Método de pago habilitado correctamente"
 *         404:
 *            description: El método de pago no existe
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave del método de pago no existe"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     error: "Error al obtener los datos"
 */ 

router.patch(
    '/habilitar',
    schemas.Des_HabilitaMetodoPago,
    middleware.validateSchema,
    methods.HabilitarSatMetodoPago
);

/**
 * @swagger
 * /api/v1/satmetodopago/deshabilitar:
 *   patch:
 *      summary: Habilitar método de pago SAT
 *      tags: [MÉTODOS DE PAGO SAT]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     ClaveMetodoPago:
 *                        type: string
 *                        description: Clave método de pago (Requerido)
 *                  example:
 *                     ClaveMetodoPago: "PUE"
 *      responses:
 *         200:
 *            description: Método de pago actualizado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Método de pago deshabilitado correctamente"
 *         404:
 *            description: El método de pago no existe
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave del método de pago no existe"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     error: "Error al obtener los datos"
 */ 

router.patch(
    '/deshabilitar',
    schemas.Des_HabilitaMetodoPago,
    middleware.validateSchema,
    methods.DesHabilitarSatMetodoPago
);

export default router;