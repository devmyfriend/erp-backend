import { Router } from 'express';
import { methods } from '../controllers/catalogos.busquedas.controller.js';

import * as middleware from '../middlewares/express-validator.js';
import * as schemas from '../schemas/cat.search.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Catálogo de códigos postales
 *     description: Operaciones relacionadas con códigos postales
 *   - name: Catálogo de colonias
 *     description: Operaciones relacionadas con las colonias
 *   - name: Usos de CFDI
 *     description: Operaciones relacionadas con los usos de CFDI
 *   - name: Régimen Fiscal
 *     description: Operaciones relacionadas con los regímenes fiscales
 *   - name: Uso de CFDI con Regímenes Fiscales
 *     description: Operaciones relacionadas con el enlace de uso de CFDI a regímenes fiscales
 *   - name: Régimen Fiscal con Usos de CFDI
 *     description: Operaciones relacionadas con el enlace de régimen fiscal a usos de CFDI
 *   - name: Métodos de Pago
 *     description: Métodos de pago
 */

/**
 * @swagger
 * /api/v1/catalogo/cp:
 *   get:
 *     summary: Obtener una lista de códigos postales
 *     tags: [Catálogo de códigos postales]
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
 *                   pais:
 *                     type: string
 *                     example: "México"
 *                   codigo_postal:
 *                     type: string
 *                     example: "01000"
 *                   estado:
 *                     type: string
 *                     example: "Ciudad de México"
 *                   municipio:
 *                     type: string
 *                     example: "El Llano"
 *                   localidad:
 *                     type: string
 *                     example: "Aguascalientes"
 */

router.get('/cp', methods.getPostalCodes);
/**
 * @swagger
 * /api/v1/catalogo/cp/buscar:
 *   post:
 *     summary: Buscar códigos postales
 *     tags: [Catálogo de códigos postales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cp:
 *                 type: string
 *                 example: "01000"
 *
 *     responses:
 *       200:
 *         description: Lista de códigos postales encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pais:
 *                     type: string
 *                     example: "México"
 *                   codigo_postal:
 *                     type: string
 *                     example: "01000"
 *                   estado:
 *                     type: string
 *                     example: "Ciudad de México"
 *                   municipio:
 *                     type: string
 *                     example: "El Llano"
 *                   localidad:
 *                     type: string
 *                     example: "Aguascalientes"
 */
router.post(
	'/cp/buscar',
	schemas.findPostalCodeSchema,
	middleware.validateSchema,
	methods.findPostalCodes,
);

/**
 * @swagger
 * /api/v1/catalogo/colonias:
 *   get:
 *     summary: Obtener la lista de colonias
 *     tags: [Catálogo de colonias]
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
 *                     example: "0001"
 *                   CodigoPostal:
 *                     type: string
 *                     example: "01000"
 *                   Nombre:
 *                     type: string
 *                     example: "San Ángel"
 */
router.get('/colonias', methods.findCol);

/**
 * @swagger
 * /api/v1/catalogo/colonias/buscar:
 *   post:
 *     summary: Buscar colonia
 *     tags: [Catálogo de colonias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cp:
 *                 type: string
 *                 example: "77518"
 *               colonia:
 *                 type: string
 *                 example: "Sacbe"
 *     responses:
 *       200:
 *         description: Lista de códigos postales encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ClaveColonia:
 *                     type: string
 *                     example: "0033"
 *                   CodigoPostal:
 *                     type: string
 *                     example: "01000"
 *                   Nombre:
 *                     type: string
 *                     example: "Privadas Sacbe"
 */
router.post(
	'/colonias/buscar',
	schemas.findColSchema,
	middleware.validateSchema,
	methods.findColByName,
);

/**
 * @swagger
 * /api/v1/catalogo/metodos/pago:
 *   get:
 *     summary: Obtener una lista de formas y metodos de pago
 *     tags: [Metodos de pago]
 *     responses:
 *       200:
 *         description: Lista de formas y metodos de pago
 *         content:
 *           application/json:
 *             example:
 *                   - metodos: []
 *                   - formas: []
 */
router.get('/metodos/pago', methods.paymentMethods);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   get:
 *     summary: Obtener una lista de los tipos de moneda
 *     tags: [Metodos de pago]
 *     responses:
 *       200:
 *         description: Lista de los tipos de moneda
 *         content:
 *           application/json:
 *             example:
 *                   - ClaveMoneda: "MXN"
 *                     Descripcion: "Peso Mexicano"
 *
 */
router.get('/metodos/moneda', methods.getTypeCoin);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda/buscar/{Descripcion}:
 *   get:
 *     summary: Obtener una lista de los tipos de moneda.
 *     tags: [Metodos de pago]
 *     parameters:
 *       - in: path
 *         name: Descripcion
 *         required: true
 *         description: Descripción del tipo de moneda a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipos de moneda encontrados.
 *         content:
 *           application/json:
 *             example:
 *               TiposDeMoneda:
 *                 - ClaveMoneda: "MXN"
 *                   Descripcion: "Peso Mexicano"
 */
router.get('/metodos/moneda/buscar/:id', methods.findTypeCoin);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   post:
 *     tags: [Moneda]
 *     summary: Crear un nuevo tipo de moneda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *                 description: La clave de la moneda
 *               Descripcion:
 *                 type: string
 *                 description: La descripción de la moneda
 *             example:
 *               ClaveMoneda: "USD"
 *               Descripcion: "Dólar estadounidense"
 *     responses:
 *       200:
 *         description: Moneda creada con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Moneda creada correctamente"
 *               data:
 *                 ClaveMoneda: "USD"
 *                 Descripcion: "Dólar estadounidense"
 *       409:
 *         description: La clave de la moneda ya está en uso
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave de la moneda ya está en uso"
 *       500:
 *         description: Error al crear la moneda
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al crear la moneda"
 */
router.post(
	'/metodos/moneda',
	schemas.createTypeCoinSchema,
	middleware.validateSchema,
	methods.createTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   patch:
 *     tags: [Moneda]
 *     summary: Actualiza una moneda existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *                 description: La clave de la moneda a actualizar
 *               Descripcion:
 *                 type: string
 *                 description: La nueva descripción de la moneda
 *             example:
 *               ClaveMoneda: "USD"
 *               Descripcion: "Dólar americano"
 *     responses:
 *       200:
 *         description: Moneda actualizada con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Moneda actualizada correctamente"
 *               data:
 *                 ClaveMoneda: "USD"
 *                 Descripcion: "Dólar americano"
 *       404:
 *         description: Moneda no encontrada
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Moneda no encontrada"
 *       500:
 *         description: Error al actualizar la moneda
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al actualizar la moneda"
 */
router.patch(
	'/metodos/moneda',
	schemas.updateTypeCoinSchema,
	middleware.validateSchema,
	methods.updateTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/metodos/moneda:
 *   delete:
 *     tags: [Moneda]
 *     summary: Desactiva una moneda existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveMoneda:
 *                 type: string
 *                 description: La clave de la moneda a desactivar
 *             example:
 *               ClaveMoneda: "USD"
 *     responses:
 *       200:
 *         description: Moneda desactivada con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Moneda desactivada correctamente"
 *       404:
 *         description: Moneda no encontrada
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Moneda no encontrada"
 *       500:
 *         description: Error al desactivar la moneda
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al desactivar la moneda"
 */
router.delete(
	'/metodos/moneda',
	schemas.deleteTypeCoinSchema,
	middleware.validateSchema,
	methods.deleteTypeCoin,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   get:
 *     summary: Lista CFDI
 *     tags: [Usos de CFDI]
 *     responses:
 *       200:
 *         description: Lista CFDI obtenida correctamente
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Lista de CFDIs obtenida correctamente"
 *               data:
 *                 - ClaveUsoCFDI: "G01"
 *                   Descripcion: "Adquisición de mercancías."
 *                   Fisica: true
 *                   Moral: true
 *                 - ClaveUsoCFDI: "G02"
 *                   Descripcion: "Devoluciones, descuentos o bonificaciones."
 *                   Fisica: true
 *                   Moral: true
 *       404:
 *         description: No existen registros
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "No existen registros"
 *       500:
 *         description: Error al obtener la lista de usos de CFDi
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al obtener la lista de usos de CFDi"
 */
router.get('/sat/cfdi', methods.findCFDI);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   post:
 *     tags: [Usos de CFDI]
 *     summary: Crea un nuevo uso de CFDI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del uso de CFDI
 *               Fisica:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas morales
 *             example:
 *               ClaveUsoCFDI: "CN01"
 *               Descripcion: "Nómina\r\n"
 *               Fisica: true
 *               Moral: true
 *     responses:
 *       200:
 *         description: Uso de CFDI creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Se creó el uso de CFDi"
 *               data:
 *                 ClaveUsoCFDI: "CN01"
 *                 Descripcion: "Nómina\r\n"
 *                 Fisica: true
 *                 Moral: true
 *       409:
 *         description: La clave de uso de CFDi ya está en uso
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave del CFDi ya está en uso"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al crear el uso de CFDi"
 */
router.post(
	'/sat/cfdi',
	schemas.createCFDISchema,
	middleware.validateSchema,
	methods.createUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   patch:
 *     tags: [Usos de CFDI]
 *     summary: Edita un uso de CFDI existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del uso de CFDI
 *               Fisica:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el uso de CFDI es para personas morales
 *             example:
 *               ClaveUsoCFDI: "CN01"
 *               Descripcion: "Nómina\r\n"
 *               Fisica: true
 *               Moral: true
 *     responses:
 *       200:
 *         description: Uso de CFDI editado con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Se actualizó el uso de CFDi"
 *               data:
 *                 ClaveUsoCFDI: "CN01"
 *                 Descripcion: "Nómina\r\n"
 *                 Fisica: true
 *                 Moral: true
 *       404:
 *         description: La clave de uso de CFDi no existe
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave de uso de CFDi no existe"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al actualizar el uso de CFDi"
 */
router.patch(
	'/sat/cfdi',
	schemas.editCFDISchema,
	middleware.validateSchema,
	methods.updateUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdi:
 *   delete:
 *     tags: [Usos de CFDI]
 *     summary: Borra un uso de CFDI existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *             example:
 *               ClaveUsoCFDI: "CN01"
 *     responses:
 *       200:
 *         description: Uso de CFDI borrado con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Uso de CFDI borrado con éxito"
 *       404:
 *         description: La clave de uso de CFDi no existe
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave de uso de CFDi no existe"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al eliminar el uso de CFDi"
 */
router.delete(
	'/sat/cfdi',
	schemas.deleteCFDISchema,
	middleware.validateSchema,
	methods.deleteCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   get:
 *     summary: Lista de regímenes fiscales
 *     tags: [Régimen Fiscal]
 *     responses:
 *       200:
 *         description: Lista de regímenes fiscales obtenida correctamente
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Lista de regímenes fiscales obtenida correctamente"
 *               data:
 *                 - ClaveRegimenFiscal: "601"
 *                   Descripcion: "General de Ley Personas Morales"
 *                   Fisica: false
 *                   Moral: true
 *                   Activo: true
 *       404:
 *         description: No existen registros
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "No existen registros"
 *       500:
 *         description: Error al obtener la lista de regímenes fiscales
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al obtener la lista de regímenes fiscales"
 */
router.get('/sat/regimenfiscal', methods.findSatRF);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   post:
 *     tags: [Régimen Fiscal]
 *     summary: Crea un nuevo régimen fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del régimen fiscal
 *               Fisica:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas morales
 *             example:
 *               ClaveRegimenFiscal: "601"
 *               Descripcion: "General de Ley Personas Morales"
 *               Fisica: false
 *               Moral: true
 *               Activo: true
 *     responses:
 *       200:
 *         description: Régimen fiscal creado con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Se creó el régimen fiscal"
 *               data:
 *                 ClaveRegimenFiscal: "601"
 *                 Descripcion: "General de Ley Personas Morales"
 *                 Fisica: false
 *                 Moral: true
 *       409:
 *         description: La clave de régimen fiscal ya está en uso
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave de régimen fiscal ya está en uso"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al crear el régimen fiscal"
 */
router.post(
	'/sat/regimenfiscal',
	schemas.createSatFKSchema,
	middleware.validateSchema,
	methods.createRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   patch:
 *     tags: [Régimen Fiscal]
 *     summary: Actualiza un régimen fiscal existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *               Descripcion:
 *                 type: string
 *                 description: La descripción del régimen fiscal
 *               Fisica:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas físicas
 *               Moral:
 *                 type: boolean
 *                 description: Si el régimen fiscal es para personas morales
 *             example:
 *               ClaveRegimenFiscal: "601"
 *               Descripcion: "General de Ley Personas Morales"
 *               Fisica: false
 *               Moral: true
 *     responses:
 *       200:
 *         description: Régimen fiscal editado con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Se actualizó el régimen fiscal"
 *               data:
 *                 ClaveRegimenFiscal: "601"
 *                 Descripcion: "General de Ley Personas Morales"
 *                 Fisica: false
 *                 Moral: true
 *       404:
 *         description: La clave de régimen fiscal no existe
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave de régimen fiscal no existe"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al actualizar el régimen fiscal"
 */
router.patch(
	'/sat/regimenfiscal',
	schemas.editSatFKSchema,
	middleware.validateSchema,
	methods.updateRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscal:
 *   delete:
 *     tags: [Régimen Fiscal]
 *     summary: Borra un régimen fiscal existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ClaveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *           example:
 *             ClaveRegimenFiscal: "601"
 *     responses:
 *       200:
 *         description: Régimen fiscal borrado con éxito
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Régimen fiscal borrado con éxito"
 *       404:
 *         description: La clave de régimen fiscal no existe
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave de régimen fiscal no existe"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al eliminar el régimen fiscal"
 */
router.delete(
	'/sat/regimenfiscal',
	schemas.deleteSatFKSchema,
	middleware.validateSchema,
	methods.deleteRegimenFiscal,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscalcfdi:
 *   get:
 *     summary: Lista de regímenes fiscales con sus usos de CFDI
 *     tags: [Régimen Fiscal con Usos de CFDI]
 *     parameters:
 *       - in: query
 *         name: claveRegimenFiscal
 *         required: true
 *         description: Clave del régimen fiscal
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de regímenes fiscales obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 regimen:
 *                   type: object
 *                   properties:
 *                     ClaveRegimenFiscal:
 *                       type: string
 *                     Descripcion:
 *                       type: string
 *                     cfdis:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ClaveUsoCFDI:
 *                             type: string
 *                           Descripcion:
 *                             type: string
 *             example:
 *               status: "OK"
 *               message: "Usos de CFDIs obtenidos correctamente"
 *               regimen:
 *                 ClaveRegimenFiscal: "601"
 *                 Descripcion: "General de Ley Personas Morales"
 *                 cfdis:
 *                   - ClaveUsoCFDI: "G01"
 *                     Descripcion: "Adquisición de mercancías"
 *                   - ClaveUsoCFDI: "G02"
 *                     Descripcion: "Devoluciones, descuentos o bonificaciones"
 *       404:
 *         description: No existen registros
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "No existen registros"
 *       500:
 *         description: Error al obtener la lista de regímenes fiscales
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al obtener la lista de regímenes fiscales"
 */

router.get(
	'/sat/regimenfiscalcfdi', 
	methods.findRegimenesFiscalesConUsoCFDI
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscalcfdi:
 *   post:
 *     tags: [Régimen Fiscal con Usos de CFDI]
 *     summary: Relacionar múltiples CFDIs a un régimen fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *               usosCfdis:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de claves de Usos de CFDI
 *             example:
 *               claveRegimenFiscal: "601"
 *               usosCfdis: ["CN01", "CN02"]
 *     responses:
 *       200:
 *         description: Régimen Fiscal relacionado con los Usos de CFDI exitosamente
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "Régimen Fiscal relacionado con los Usos de CFDI exitosamente"
 *               results:
 *                 - ClaveUsoCFDI: "CN01"
 *                   ClaveRegimenFiscal: "601"
 *                 - ClaveUsoCFDI: "CN02"
 *                   ClaveRegimenFiscal: "601"
 *       404:
 *         description: La clave del regimen fiscal no existe o no está activa
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave del regimen fiscal no existe o no está activa"
 *       500:
 *         description: Error al relacionar el régimen fiscal con los Usos de CFDI
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al relacionar el régimen fiscal con los Usos de CFDI"
 */

router.post(
	'/sat/regimenfiscalcfdi', 
	methods.linkRegimenesFiscalesConUsoCFDI
);

/**
 * @swagger
 * /api/v1/catalogo/sat/regimenfiscalcfdi:
 *   delete:
 *     tags: [Régimen Fiscal con Usos de CFDI]
 *     summary: Desvincular múltiples CFDIs de un régimen fiscal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claveRegimenFiscal:
 *                 type: string
 *                 description: La clave del régimen fiscal
 *               usosCfdis:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de claves de usos de CFDI
 *             example:
 *               claveRegimenFiscal: "601"
 *               usosCfdis: ["CN01", "CN02"]
 *     responses:
 *       200:
 *         description: CFDIs desvinculados del régimen exitosamente
 *         content:
 *           application/json:
 *             example:
 *               status: "OK"
 *               message: "CFDIs desvinculados del régimen exitosamente"
 *       404:
 *         description: La clave del régimen fiscal o del CFDI no existe o no está activa
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave del régimen fiscal o del CFDI no existe o no está activa"
 *       500:
 *         description: Error al desvincular los CFDIs del régimen
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al desvincular los CFDIs del régimen"
 */

router.delete(
	'/sat/regimenfiscalcfdi',
	methods.unlinkRegimenesFiscalesConUsoCFDI,
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdiregimenfiscal:
 *   get:
 *     summary: Lista de CFDIs con regímenes fiscales
 *     tags: [Uso de CFDI con Regímenes Fiscales]
 *     parameters:
 *       - in: query
 *         name: claveUsoCFDI
 *         required: true
 *         description: Clave del uso de CFDI
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de CFDIs con regímenes fiscales obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 cfdi:
 *                   type: object
 *                   properties:
 *                     ClaveUsoCFDI:
 *                       type: string
 *                     Descripcion:
 *                       type: string
 *                     regimenes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           ClaveRegimenFiscal:
 *                             type: string
 *                           Descripcion:
 *                             type: string
 *             example:
 *               status: "OK"
 *               message: "Regímenes obtenidos correctamente"
 *               cfdi:
 *                 ClaveUsoCFDI: "CN01"
 *                 Descripcion: "Descripción del CFDI"
 *                 regimenes:
 *                   - ClaveRegimenFiscal: "601"
 *                     Descripcion: "General de Ley Personas Morales"
 *                   - ClaveRegimenFiscal: "603"
 *                     Descripcion: "Personas Morales con Fines no Lucrativos"
 *       404:
 *         description: No existen registros
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "No existen registros"
 *       500:
 *         description: Error al obtener los regímenes por CFDI
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al obtener los regímenes por CFDI"
 */

router.get(
	'/sat/cfdiregimenfiscal',
	 methods.findCfdiConRegimenesFiscales
	);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdiregimenfiscal:
 *   post:
 *     summary: Relacionar múltiples regímenes fiscales a un CFDI
 *     tags: [Uso de CFDI con Regímenes Fiscales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               regimenes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de claves de regímenes fiscales
 *             example:
 *               claveUsoCFDI: "G01"
 *               regimenes: ["601", "603"]
 *     responses:
 *       200:
 *         description: Régimen Fiscal relacionado con los Usos de CFDI exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ClaveUsoCFDI:
 *                         type: string
 *                       ClaveRegimenFiscal:
 *                         type: string
 *             example:
 *               status: "OK"
 *               message: "Regímenes fiscales relacionados con el CFDI exitosamente"
 *               results:
 *                 - ClaveUsoCFDI: "G01"
 *                   ClaveRegimenFiscal: "601"
 *                 - ClaveUsoCFDI: "G01"
 *                   ClaveRegimenFiscal: "603"
 *       404:
 *         description: La clave del uso de CFDI no existe o no está activa
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave del uso de CFDI no existe o no está activa"
 *       500:
 *         description: Error al relacionar el uso de CFDI con los regímenes fiscales
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al relacionar el uso de CFDI con los regímenes fiscales"
 */
router.post(
	'/sat/cfdiregimenfiscal', 
	methods.linkCfdiConRegimenesFiscales
);

/**
 * @swagger
 * /api/v1/catalogo/sat/cfdiregimenfiscal:
 *   delete:
 *     summary: Desvincular múltiples regímenes fiscales de un CFDI
 *     tags: [Uso de CFDI con Regímenes Fiscales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               claveUsoCFDI:
 *                 type: string
 *                 description: La clave del uso de CFDI
 *               regimenes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista de claves de regímenes fiscales
 *             example:
 *               claveUsoCFDI: "G01"
 *               regimenes: ["601", "603"]
 *     responses:
 *       200:
 *         description: Régimen Fiscal desvinculado del uso de CFDI exitosamente
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
 *               status: "OK"
 *               message: "Regímenes fiscales desvinculados del uso de CFDI exitosamente"
 *       404:
 *         description: La clave del uso de CFDI o del régimen fiscal no existe o no está activa
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "La clave del uso de CFDI o del régimen fiscal no existe o no está activa"
 *       500:
 *         description: Error al desvincular el uso de CFDI de los regímenes fiscales
 *         content:
 *           application/json:
 *             example:
 *               status: "Error"
 *               message: "Error al desvincular el uso de CFDI de los regímenes fiscales"
 */
router.delete(
	'/sat/cfdiregimenfiscal', 
	methods.unlinkCfdiConRegimenesFiscales
);

export default router;
