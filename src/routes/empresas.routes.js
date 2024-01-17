import { Router } from "express";
import { methods as empresasController } from "../controllers/empresas.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Empresas
 *     description: Operaciones relacionadas con las empresas (Propietarias y generales)
 */

/**
 * @swagger
 * /api/vi/empresas:
 *   post:
 *     summary: Obtener todas las empresas
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               esPropietaria:
 *                 type: boolean
 *                 description: Indica si se buscan empresas propietarias o no
 *           example:
 *             esPropietaria: false
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idEmpresa:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Empresa 1"
 */
router.post("/", empresasController.obtenerEmpresas);


/**
 * @swagger
 * /api/vi/empresas/filtrado:
 *   post:
 *     summary: Búsqueda de empresas
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Busqueda:
 *                 type: string
 *                 description: Texto a buscar
 *               esPropietaria:
 *                 type: boolean
 *                 description: Indica si se buscan empresas propietarias o no
 *           example:
 *             Busqueda: "Comercio"
 *             esPropietaria: false
 *     responses:
 *       200:
 *         description: Lista de empresas filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   idEmpresa:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: "Empresa 1"
 */
router.post("/filtrado", empresasController.busquedaEmpresas);

export default router;