import { Router } from "express";
import { methods } from "../controllers/sat.unit.key.controller.js";

import * as middleware from "../middlewares/express-validator.js";
import * as schemas from "../schemas/unit.key.js";
const router = Router();

/**
 * @swagger
 * /api/v1/unidades/{page}:
 *   get:
 *     tags:
 *       - Claves Unidades
 *     summary: Obtiene todos los registros de la tabla SAT_UnidadesClave
 *     responses:
 *       200:
 *         description: Lista de registros de SAT_UnidadesClave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveUnidadSat:
 *                     type: string
 *                   NombreUnidadSat:
 *                     type: string
 *                   Activo:
 *                     type: boolean
 *             example:
 *               - ClaveUnidadSat: "KGM"
 *                 NombreUnidadSat: "Kilogramo"
 *                 Activo: true
 */
router.get('/unidades/:page', methods.findAllUnitKeys);

/**
 * @swagger
 * /api/v1/unidades/buscar/{key}:
 *   get:
 *     tags:
 *       - Claves Unidades
 *     summary: Obtiene los registros de la tabla SAT_UnidadesClave por clave
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: La clave de la unidad
 *     responses:
 *       200:
 *         description: Lista de registros de SAT_UnidadesClave
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveUnidadSat:
 *                     type: string
 *                   NombreUnidadSat:
 *                     type: string
 *                   Activo:
 *                     type: boolean
 *             example:
 *               - ClaveUnidadSat: "KGM"
 *                 NombreUnidadSat: "Kilogramo"
 *                 Activo: true
 */
router.get('/buscar/:key', methods.findUnitKeysByKey);

/**
 * @swagger
 * /api/v1/unidades/clave:
 *   post:
 *     tags:
 *       - Claves Unidades
 *     summary: Crea un nuevo registro en la tabla SAT_UnidadesClave
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUnidadSat:
 *                 type: string
 *               NOmbreUnidadSat:
 *                 type: string
 *           example:
 *             ClaveUnidadSat: "KGM"
 *             NombreUnidadSat: "Kilogramo"
 *     responses:
 *       200:
 *         description: Clave de unidad creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Clave de unidad creada"
 */
router.post(
	'/clave',
	schemas.createUnitKeySchema,
	middleware.validateSchema,
	methods.createUnitKey,
);

/**
 * @swagger
 * /api/v1/unidades/editar:
 *   patch:
 *     tags:
 *       - Claves Unidades
 *     summary: Actualiza un registro en la tabla SAT_UnidadesClave
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUnidadSat:
 *                 type: string
 *               NombreUnidadSat:
 *                 type: string
 *           example:
 *             ClaveUnidadSat: "KGM"
 *             NombreUnidadSat: "Kilogramo"
 *     responses:
 *       200:
 *         description: Clave de unidad actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Clave de unidad actualizada"
 *       404:
 *         description: Clave de unidad no encontrada
 *       500:
 *         description: Error al actualizar la clave de unidad
 */
router.patch('/editar', 
schemas.updateUnitKeySchema,
middleware.validateSchema,
methods.updateUnitKey);


/**
 * @swagger
 * /api/v1/unidades/borrar:
 *   delete:
 *     tags:
 *       - Claves Unidades
 *     summary: Borra un registro en la tabla SAT_UnidadesClave
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUnidadSat:
 *                 type: string
 *           example:
 *             ClaveUnidadSat: "KGM"
 *     responses:
 *       200:
 *         description: Clave de unidad borrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: true
 *               message: "Clave de unidad borrada"
 *       404:
 *         description: Clave de unidad no encontrada
 *       500:
 *         description: Error al borrar la clave de unidad
 */
router.delete('/borrar', methods.deleteUnitKey);

export default router;