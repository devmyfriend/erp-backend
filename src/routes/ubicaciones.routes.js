import { Router } from 'express';
import { methods } from '../controllers/cat.ubicaciones.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/ubicaciones.js';
import { param } from 'express-validator';
const router = Router();

/**
 * @swagger
 * /api/v1/ubicaciones/{page}:
 *   get:
 *     tags:
 *       - Ubicaciones
 *     summary: Obtiene todas las ubicaciones
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de ubicaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ubicacion'
 *       500:
 *         description: Error al obtener las ubicaciones
 */
router.get('/:page',
param('page').isInt().withMessage('La página tiene que ser un número entero'),
methods.findAllUbications);

/**
 * @swagger
 * /api/v1/ubicaciones/{Nombre}:
 *   get:
 *     tags:
 *       - Ubicaciones
 *     summary: Obtiene una ubicación por nombre
 *     parameters:
 *       - in: path
 *         name: Nombre
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la ubicación
 *     responses:
 *       200:
 *         description: Ubicación obtenida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ubicacion'
 *       400:
 *         description: La ubicación no existe
 *       500:
 *         description: Error al obtener la ubicación
 */
router.get('/:Nombre',
param('Nombre').isString().withMessage('El nombre de la ubicación tiene que ser una cadena de texto'),
 methods.findUbicationByName);

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   post:
 *     tags:
 *       - Ubicaciones
 *     summary: Crea una nueva ubicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *               CreadoPor:
 *                 type: string
 *           example:
 *             Nombre: "Colosio 1"
 *             CreadoPor: "1"
 *     responses:
 *       201:
 *         description: Ubicación creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 CreadoPor:
 *                   type: string
 *             example:
 *               Nombre: "Colosio 1"
 *               CreadoPor: "1"
 */
router.post(
	'/',
	schemas.createUbication,
	middleware.validateSchema,
	methods.createUbication,
);

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   patch:
 *     tags:
 *       - Ubicaciones
 *     summary: Actualiza una ubicación existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UbicacionId:
 *                 type: integer
 *               Nombre:
 *                 type: string
 *               ActualizadoPor:
 *                 type: string
 *           example:
 *             UbicacionId: 1
 *             Nombre: "Ubicación 1"
 *             ActualizadoPor: "0"
 *     responses:
 *       201:
 *         description: Ubicación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UbicacionId:
 *                   type: integer
 *                 Nombre:
 *                   type: string
 *                 ActualizadoPor:
 *                   type: string
 *             example:
 *               UbicacionId: 1
 *               Nombre: "Ubicación 1"
 *               ActualizadoPor: "0"
 */
router.patch(
	'/',
	schemas.updateUbication,
	middleware.validateSchema,
	methods.updateUbication,
);

/**
 * @swagger
 * /api/v1/ubicaciones:
 *   delete:
 *     tags:
 *       - Ubicaciones
 *     summary: Elimina una ubicación existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UbicacionId:
 *                 type: integer
 *               BorradoPor:
 *                 type: string
 *           example:
 *             UbicacionId: 1
 *             BorradoPor: "1"
 *     responses:
 *       200:
 *         description: Ubicación eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ubicacion:
 *                   type: object
 *                   properties:
 *                     UbicacionId:
 *                       type: integer
 *             example:
 *               message: "Ubicación eliminada"
 *               ubicacion:
 *                 UbicacionId: 1
 */
router.delete(
	'/',
	schemas.deleteUbication,
	middleware.validateSchema,
	methods.deleteUbication,
);

export default router;
