import { Router } from 'express';
import { methods } from '../controllers/satTipoComprobante.controller.js';
import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/tipoComprobante.js';
const router = Router();

/**
 * @swagger
 * /api/v1/comprobante:
 *   get:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Obtener todos los tipos de comprobante
 *     responses:
 *       200:
 *         description: Tipos de comprobante encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 comprobantes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ClaveTipoDeComprobante:
 *                         type: string
 *                       Descripcion:
 *                         type: string
 *                       Borrado:
 *                         type: boolean
 *             example:
 *               status: "OK"
 *               message: "Tipos de comprobante encontrados"
 *               comprobantes:
 *                 - ClaveTipoDeComprobante: "0"
 *                   Descripcion: "Testing"
 *                   Borrado: true
 *                 - ClaveTipoDeComprobante: "1"
 *                   Descripcion: "HOLA"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "2"
 *                   Descripcion: "Egreso"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "3"
 *                   Descripcion: "wasaaa"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "4"
 *                   Descripcion: "El rojo es peligro"
 *                   Borrado: true
 *                 - ClaveTipoDeComprobante: "7"
 *                   Descripcion: "HOLA"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "8"
 *                   Descripcion: "League Of Valo"
 *                   Borrado: true
 *                 - ClaveTipoDeComprobante: "9"
 *                   Descripcion: "La camioneta no esta diseñada para 7 personas"
 *                   Borrado: true
 *                 - ClaveTipoDeComprobante: "E"
 *                   Descripcion: "Egreso"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "I"
 *                   Descripcion: "Egreso"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "M"
 *                   Descripcion: "Mano"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "N"
 *                   Descripcion: "Nómina"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "O"
 *                   Descripcion: "Test O"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "P"
 *                   Descripcion: "Pago"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "Q"
 *                   Descripcion: "Coca"
 *                   Borrado: true
 *                 - ClaveTipoDeComprobante: "R"
 *                   Descripcion: "Raton"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "S"
 *                   Descripcion: "Stun"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "T"
 *                   Descripcion: "Traslado"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "U"
 *                   Descripcion: "Usted"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "V"
 *                   Descripcion: "Test V"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "W"
 *                   Descripcion: "Test W"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "X"
 *                   Descripcion: "Test X"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "Y"
 *                   Descripcion: "Test Y"
 *                   Borrado: false
 *                 - ClaveTipoDeComprobante: "Z"
 *                   Descripcion: "Test Z"
 *                   Borrado: false
 *       404:
 *         description: No se encontraron tipos de comprobante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *             example:
 *               status: "Error"
 *               message: "No se encontraron tipos de comprobante"
 *       500:
 *         description: Error al obtener los tipos de comprobante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                 error:
 *             example:
 *               status: "Error"
 *               message: "Error al obtener los tipos de comprobante"
 *               error: "Detalles del error"
 */
router.get(
    '/',
    methods.obtenerTiposComprobantes
);

/**
 * @swagger
 * /api/v1/comprobante:
 *   post:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Crear un nuevo tipo de comprobante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveTipoDeComprobante:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *           example:
 *             ClaveTipoDeComprobante: "I"
 *             Descripcion: "Egreso"
 *     responses:
 *       200:
 *         description: Tipo de comprobante creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 comprobante:
 *                   type: object
 *                   properties:
 *                     ClaveTipoDeComprobante:
 *                       type: string
 *                     Descripcion:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Tipo de comprobante creado correctamente"
 *               comprobante:
 *                 ClaveTipoDeComprobante: "5"
 *                 Descripcion: "Español"
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Error de validación"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: [
 *                     "La clave del tipo de comprobante es requerida",
 *                     "La clave del tipo de comprobante debe tener una longitud de 1 carácter"
 *                   ]
 *       409:
 *         description: El tipo de comprobante ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 error:
 *                   type: string
 *                   example: "El tipo de comprobante ya existe"
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
 *                   example: "Error al crear el tipo de comprobante"
 */
router.post(
    '/',
    schemas.crearTiposComprobantesSchema,
    middleware.validateSchema,
    methods.crearTiposComprobantes,
);

/**
 * @swagger
 * /api/v1/comprobante:
 *   patch:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Actualizar un tipo de comprobante existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveTipoDeComprobante:
 *                 type: string
 *               Descripcion:
 *                 type: string
 *           example:
 *             ClaveTipoDeComprobante: "I"
 *             Descripcion: "Egreso"
 *     responses:
 *       200:
 *         description: Tipo de comprobante actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 comprobante:
 *                   type: object
 *                   properties:
 *                     ClaveTipoDeComprobante:
 *                       type: string
 *                     Descripcion:
 *                       type: string
 *             example:
 *               status: "OK"
 *               message: "Tipo de comprobante actualizado correctamente"
 *               comprobante:
 *                 ClaveTipoDeComprobante: "1"
 *                 Descripcion: "Trabajadores"
 *       404:
 *         description: El tipo de comprobante no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 error:
 *                   type: string
 *             example:
 *               status: 404
 *               error: "El tipo de comprobante no existe"
 *       409:
 *         description: La descripción del tipo de comprobante ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 error:
 *                   type: string
 *             example:
 *               status: 409
 *               error: "La descripción del tipo de comprobante ya existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "Error"
 *               message: "Error al actualizar el tipo de comprobante"
 */
router.patch(
    '/',
    schemas.actualizarTiposComprobantesSchema,
    middleware.validateSchema,
    methods.actualizarTiposComprobantes,
);

/**
 * @swagger
 * /api/v1/comprobante:
 *   delete:
 *     tags:
 *       - Tipo de comprobante
 *     summary: Eliminar un tipo de comprobante existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveTipoDeComprobante:
 *                 type: string
 *           example:
 *             ClaveTipoDeComprobante: "X"
 *     responses:
 *       200:
 *         description: Tipo de comprobante eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 comprobante:
 *                   type: string
 *             example:
 *               status: "OK"
 *               message: "Tipo de comprobante eliminado correctamente"
 *               comprobante: "1"
 *       404:
 *         description: El tipo de comprobante no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 error:
 *                   type: string
 *             example:
 *               status: 404
 *               error: "El tipo de comprobante no existe"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *             example:
 *               status: "Error"
 *               message: "Error al borrar el tipo de comprobante"
 */
router.delete(
    '/',
    schemas.borrarTiposComprobantesSchema,
    middleware.validateSchema,
    methods.borrarTiposComprobantes,
);

export default router;
