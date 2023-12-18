import { Router } from 'express';
import { methods } from '../controllers/datosFiscales.controller.js';
import { param } from 'express-validator';
import * as schemas from '../schemas/datosFiscales.js';
import * as middleware from '../middlewares/express-validator.js';
const router = Router();

// GET - /api/datosFiscales
router.get(
	'/empresa',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	middleware.validateSchema,
	schemas.buscarRFC,
	methods.obtenerIdEmpresa);

router.get(
	'/rfc',
	schemas.buscarRFC,
	middleware.validateSchema,
	methods.obtenerRFC);

router.get('/descripcion', methods.obtenerDescripcion);

router.get('/pais', methods.obtenerPais);

router.get('/personafisica', methods.obtenerPersonaFisica);

router.get('/personamoral', methods.obtenerPersonaMoral);

router.get('/taxId', methods.obtenerTaxId);

router.get('/regimenFiscal', methods.obtenerRegimenFiscal);

router.get('/nombreComercial', methods.obtenerNombreComercial);

// POST - /api/datosFiscales
router.post('/empresa/crear', methods.crearIdEmpresa);

// UPDATE - /api/datosFiscales
router.patch('/empresa/editar', methods.editarIdEmpresa);

// DELETE - /api/datosFiscales
router.delete(
	'/empresa/desactivar',
	methods.desactivarIdEmpresa,
);

export default router;
