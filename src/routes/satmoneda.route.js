import { Router } from 'express';
import { methods } from "../controllers/satmoneda.controller.js";
import * as schemas from '../schemas/satmoneda.schema.js';
import * as middleware from '../middlewares/express-validator.js';
import { param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *    - name: MONEDAS SAT
 *      description: Módulo Monedas SAT.
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       SatMonedaModel:
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
 * /api/v1/satmoneda/crear:
 *   post:
 *      summary: Crear monedas SAT
 *      tags: [MONEDAS SAT]
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
 *                     errors: "Error al obtener los datos"
 */ 
 
router. post(
    '/crear',
    schemas.CrarMoneda,
    middleware.validateSchema,
    methods.CrearSatMoneda
);

/**
 * @swagger
 * /api/v1/satmoneda/editar:
 *   patch:
 *      summary: Actualizar moneda SAT
 *      tags: [MONEDAS SAT]
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
 *                     Activo:
 *                        type: bit
 *                        description: Estatus de moneda sat (requerido)
 *                  example:
 *                     ClaveMoneda: "AFN"
 *                     Descripcion: "Afghani"
 *                     Activo: 1
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
 *                     message: "La clave de moneda SAT no existe"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     errors: "Error al obtener los datos"
 */ 

router.patch(
    '/editar',
    schemas.EditarMoneda,
    middleware.validateSchema,
    methods.EditarSatMoneda
);

/**
 * @swagger
 * /api/v1/satmoneda/Eliminar:
 *   delete:
 *      summary: Eliminar moneda SAT
 *      tags: [MONEDAS SAT]
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
 *                  example:
 *                     ClaveMoneda: "AFN"
 *      responses:
 *         200:
 *            description: Moneda SAT eliminado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Moneda SAT borrado"
 *         404:
 *            description: La clave de moneda SAT que se está eliminando no existe.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "Clave moneda SAT no encontrado"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     errors: "Error al obtener los datos"
 */ 
router.delete(
	'/Eliminar',
	schemas.Des_HabilitaMoneda,
	middleware.validateSchema,
	methods.EliminarSatMoneda,
);

/**
 * @swagger
 * /api/v1/satmoneda/habilitar:
 *   patch:
 *      summary: Habilitar moneda SAT
 *      tags: [MONEDAS SAT]
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
 *                  example:
 *                     ClaveMoneda: "AFN"
 *      responses:
 *         200:
 *            description: Moneda SAT habilitado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Moneda SAT habilitado correctamente"
 *         404:
 *            description: La clave de moneda SAT que se esta habilitando no existe.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave moneda SAT no existe"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     errors: "Error al obtener los datos"
 */ 

router.patch(
    '/habilitar',
    schemas.Des_HabilitaMoneda,
    middleware.validateSchema,
    methods.HabilitarSatMoneda
);

/**
 * @swagger
 * /api/v1/satmoneda/deshabilitar:
 *   patch:
 *      summary: Deshabilitar moneda SAT
 *      tags: [MONEDAS SAT]
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
 *                  example:
 *                     ClaveMoneda: "AFN"
 *      responses:
 *         200:
 *            description: Moneda SAT deshabilitado
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Ok"
 *                     message: "Moneda SAT deshabilitado correctamente"
 *         404:
 *            description: La clave de moneda SAT que se esta deshabilitando no existe.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "La clave moneda SAT no existe"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     errors: "Error al obtener los datos"
 */ 

router.patch(
    '/deshabilitar',
    schemas.Des_HabilitaMoneda,
    middleware.validateSchema,
    methods.DesHabilitarSatMoneda
);

export default router;