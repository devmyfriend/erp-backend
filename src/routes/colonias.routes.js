import { Router } from 'express';
import { methods as coloniasController } from '../controllers/colonias.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/colonias.js';
import * as middleware from '../middlewares/express-validator.js'
const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Colonias
 *     description: Operaciones relacionadas con las colonias en el formulario de empresas
 */

/**
 * @swagger
 * /api/v1/colonias/crear:
 *   post:
 *     summary: Crear una colonia
 *     tags: [Colonias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ClaveColonia
 *               - CodigoPostal
 *               - Nombre
 *             properties:
 *               ClaveColonia:
 *                 type: string
 *                 description: Clave de la colonia
 *               CodigoPostal:
 *                 type: string
 *                 description: Código postal de la colonia
 *               Nombre:
 *                 type: string
 *                 description: Nombre de la colonia
 *             example:
 *               ClaveColonia: P001
 *               CodigoPostal: '12345'
 *               Nombre: Colonia de prueba
 *     responses:
 *       201:
 *         description: Colonia creada con éxito
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 idColonia: 1
 *                 ClaveColonia: P001
 *                 CodigoPostal: 12345
 *                 Nombre: Colonia de prueba
 *       400:
 *         description: Error de validación. Los datos proporcionados no son válidos
 *         content:
 *           application/json:
 *             example:
 *               status: "Error de validación"
 *               errors: ["Mensaje de error 1", "Mensaje de error 2"]
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error interno del servidor"     
 * */
router.post(
    '/crear',
    schemas.crearColoniaSchema,
    middleware.validateSchema,
    coloniasController.crearColonia,
);

export default router;