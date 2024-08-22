import { Router } from 'express';
import { methods } from '../controllers/sat.claves.unidades.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/claves.unidades.js';
import { param } from 'express-validator';

const router = Router();

/**
 * @swagger
 * /api/v1/unidades/{pagina}:
 *   get:
 *     tags:
 *       - Claves Unidades
 *     summary: Obtiene todos los registros de la tabla SAT_ClavesUnidades
 *     parameters:
 *       - in: path
 *         name: pagina
 *         schema:
 *           type: integer
 *         required: true
 *         description: Número de página
 *     responses:
 *       200:
 *         description: Lista de registros de SAT_ClavesUnidades
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
 *                     type: object
 *                     properties:
 *                       ClaveUnidadSat:
 *                         type: string
 *                       NombreUnidadSat:
 *                         type: string
 *                       Activo:
 *                         type: boolean
 *       500:
 *         description: Error al obtener las unidades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error al obtener las unidades"
 */
router.get(
    '/:pagina',
    [
        param('pagina')
            .isInt({ gt: 0 })
            .withMessage('El número de página debe ser un número entero mayor que 1'),
    ],
    middleware.validateSchema,
    methods.findAllUnitKeys,
);

/**
 * @swagger
 * /api/v1/unidades/buscar/{clave}:
 *   get:
 *     tags:
 *       - Claves Unidades
 *     summary: Obtiene los registros de la tabla SAT_ClavesUnidades por clave
 *     parameters:
 *       - in: path
 *         name: clave
 *         required: true
 *         schema:
 *           type: string
 *         description: Clave Unidad SAT
 *     responses:
 *       200:
 *         description: Lista de registros de SAT_ClavesUnidades
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
 *       404:
 *         description: Clave no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: string
 *                   example: "Clave no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error al buscar la clave de unidad"
 */
router.get(
    '/buscar/:clave',
    param('clave')
        .isString()
        .withMessage('La clave de la unidad debe ser de tipo string')
        .isLength({ min: 1, max: 3 })
        .withMessage('La clave de la unidad debe tener entre 1 y 3 caracteres'),
    middleware.validateSchema,
    methods.findUnitKeysByKey,
);

/**
 * @swagger
 * /api/v1/unidades/buscar/nombre/{nombre}:
 *   get:
 *     tags:
 *       - Claves Unidades
 *     summary: Obtiene los registros de la tabla SAT_ClavesUnidades por nombre
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la unidad
 *     responses:
 *       200:
 *         description: Lista de registros de SAT_ClavesUnidades
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
 *       404:
 *         description: Nombre no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: string
 *                   example: "Nombre no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error al buscar la clave de unidad por nombre"
 */
router.get(
    '/buscar/nombre/:nombre',
    param('nombre')
        .isString()
        .withMessage('El nombre de la unidad debe ser de tipo string')
        .isLength({ min: 1 })
        .withMessage('El nombre de la unidad debe tener por lo menos 1 carácter'),
    middleware.validateSchema,
    methods.findUnitKeysByName,
);

/**
 * @swagger
 * /api/v1/unidades/clave:
 *   post:
 *     tags:
 *       - Claves Unidades
 *     summary: Crea un nuevo registro en la tabla SAT_ClavesUnidades
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
 *         description: Clave de unidad creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Clave de unidad creada"
 *       409:
 *         description: Clave de unidad ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: string
 *                   example: "Clave de unidad ya existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error al crear la clave de unidad"
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
 *     summary: Actualiza un registro en la tabla SAT_ClavesUnidades
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
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Clave de unidad actualizada"
 *       404:
 *         description: Clave de unidad no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: string
 *                   example: "Clave de unidad no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar la clave de unidad"
 */
router.patch(
    '/editar',
    schemas.updateUnitKeySchema,
    middleware.validateSchema,
    methods.updateUnitKey,
);

/**
 * @swagger
 * /api/v1/unidades/borrar:
 *   delete:
 *     tags:
 *       - Claves Unidades
 *     summary: Borra un registro en la tabla SAT_ClavesUnidades
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
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 message:
 *                   type: string
 *                   example: "Clave de unidad borrada"
 *       404:
 *         description: Clave de unidad no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 error:
 *                   type: string
 *                   example: "Clave de unidad no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error"
 *                 message:
 *                   type: string
 *                   example: "Error al borrar la clave de unidad"
 */
router.delete(
    '/borrar',
    schemas.deleteUnitKeySchema,
    middleware.validateSchema,
    methods.deleteUnitKey,
);

export default router;
