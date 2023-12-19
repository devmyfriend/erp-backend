import { Router } from 'express';
import { methods as datosDomicilioController } from '../controllers/datos.domicilio.controller.js';
import { param } from 'express-validator';
const router = Router();

// router.get('/sat/estado', datosDomicilioController.obtenerSATEstado);

/**
 * @swagger
 * tags:
 *      - name: SAT
 *      - description: Operaciones relacionadas con los catalogos del SAT
 * */

/**
 * @swagger
 * /api/v1/domicilio/{id}:
 *   get:
 *     summary: Obtener municipios por ID de Municipio
 *     tags: [SAT]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Clave Municipio
 *     responses:
 *       200:
 *         description: Lista de contactos del municipio
 *         content:
 *           application/json:
 *             example:
 *               - ClaveMunicipio: 001
 *                 ClaveEstado: AGU
 *                 Nombres: Aguascalientes
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
router.get(
	'/:id',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	datosDomicilioController.buscarSATMunicipio,
);

console.log('ruta ejecutada');
/**
 * @swagger
 * /api/v1/domicilio/sat/municipio:
 *   get:
 *     summary: Obtener todos los municipios
 *     tags: [SAT]
 *     parameters:
 *       - in: path
 *         required: false
 *         description: Id del municipio
 *     responses:
 *       200:
 *         description: Lista de municipios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveMunicipio:
 *                     type: string
 *                     example: "001"
 *                   ClaveEstado:
 *                     type: string
 *                     example: "AGU"
 */
router.get('/sat/municipio', datosDomicilioController.obtenerSATMunicipio);

/**
 * @swagger
 * /api/v1/domicilio/sat/localidad:
 *   get:
 *     summary: Obtener todas las localidades
 *     tags: [SAT]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: false
 *         description: Id de la localidad
 *     responses:
 *       200:
 *         description: Lista de localidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveLocalidad:
 *                     type: string
 *                     example: "01"
 *                   ClaveEstado:
 *                     type: string
 *                     example: "AGU"
 *                   Nombre:
 *                     type: string
 *                     example: "Agusascalientes"
 */
router.get('/sat/localidad', datosDomicilioController.obtenerSATLocalidad);

/**
 * @swagger
 * /api/v1/domicilio/sat/colonia:
 *   get:
 *     summary: Obtener todas las colonias
 *     tags: [SAT]
 *     responses:
 *       200:
 *         description: Lista de colonias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveColonia:
 *                     type: string
 *                     example: "001"
 *                   Nombre:
 *                     type: string
 *                     example: "Colonia 1"
 */
router.get('/sat/colonia', datosDomicilioController.obtenerSATColonias);

/**
 * @swagger
 * /api/v1/domicilio/sat/codigospostal:
 *   get:
 *     summary: Obtener todos los códigos postales
 *     tags: [SAT]
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
 *                   CodigoPostal:
 *                     type: string
 *                     example: "12345"
 */
router.get('/sat/codigospostal', datosDomicilioController.obtenerCodigosPostal);

/**
 * @swagger
 * /api/v1/domicilio/sat/estado:
 *   get:
 *     summary: Obtener todos los estados
 *     tags: [SAT]
 *     responses:
 *       200:
 *         description: Lista de estados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveEstado:
 *                     type: string
 *                     example: "AGU"
 *                   Nombre:
 *                     type: string
 *                     example: "Aguascalientes"
 */
router.get('/sat/estado', datosDomicilioController.obtenerSATEstado);

export default router;
