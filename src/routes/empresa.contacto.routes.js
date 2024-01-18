import { Router } from 'express'
import { methods } from '../controllers/empresa.contacto.controller.js'
const router =  Router()

/**
 * @swagger
 * /api/v1/contactoporempresa/detalle/crear:
 *   post:
 *     tags:
 *       - Contacto
 *     summary: Agrega un detalle de contacto
 *     requestBody:
 *       description: Datos del detalle de contacto a agregar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ContactoId:
 *                 type: integer
 *               CreadoPor:
 *                 type: integer
 *               Correo:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     Email:
 *                       type: string
 *               Telefono:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     NumeroTelefonico:
 *                       type: string
 *     responses:
 *       201:
 *         description: Detalle de contacto agregado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Contacto no encontrado
 *       500:
 *         description: Error al agregar el detalle de contacto
 */
router.post('/detalle/crear', methods.crearContactoDetalleEmpresa);

export default router;
