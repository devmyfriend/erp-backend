import { Router } from 'express';
import * as middleware from '../middlewares/express-validator.js';
import { method } from '../controllers/cp.sat.controller.js';
import { param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * tags:
 *    - name: CÓDIGOS POSTALES SAT
 *      description: Módulo DE códigos postales SAT.
 */

/**
 * @swagger
 * components:
 *    schemas:
 *       vwCpSatModel:
 *          type: object
 *          properties:
 *             cp:
 *                type: string
 *                description: Código postal.
 *             pais:
 *                type: string
 *                description: Nombre del país.
 *             estado:
 *                type: boolean
 *                description: Nombre del estado.
 *             municipio:
 *                type: boolean
 *                description: Nombre del minucipio.
 *             localidad:
 *                type: boolean
 *                description: Nombre de la localidad.
*/

/**
 * @swagger
 * /api/v1/satcp/buscar/:cp
 *   get:
 *      summary: Crear CÓDIGOS POSTALES SAT
 *      tags: [CÓDIGOS POSTALES SAT]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                     cp:
 *                        type: string
 *                        description: Código postal.
 *                     pais:
 *                        type: integer
 *                        description: Nombre del país.
 *                     estado:
 *                        type: string
 *                        description: Nombre del estado.
 *                     municipio:
 *                        type: integer
 *                        description: Nombre del minucipio.
 *                     localidad:
 *                        type: string
 *                        description: Nombre de la localidad.
 *                  example:
 *                     cp: "77214"
 *                     pais: "México"
 *                     estado: "Quintana Roo"
 *                     municipio: "Felipe Carrillo Puerto"
 *                     localidad: "Felipe Carrillo Puerto"
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
 *            description: No se encontro ningun registro.
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Error"
 *                     message: "No hay registros para mostrar"
 *         500:
 *            description: Error del servidor
 *            content:
 *               application/json:
 *                  example:
 *                     status: "Errors"
 *                     message: "Error al obtener los datos del servidor"
 */ 
router.get(
    '/buscar/:cp',
    middleware.validateSchema,
    method.buscarCpPorCP
)

router.get(
    '/buscar1/:texto',
    middleware.validateSchema,
    method.buscarCpPorCoinsidencia
)