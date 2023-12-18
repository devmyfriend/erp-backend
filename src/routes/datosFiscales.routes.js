import { Router } from 'express';
import { methods as datosFiscalesController } from '../controllers/datosFiscales.controller.js';
const router = Router();

// GET - /api/datosFiscales
router.get(
	'/empresa',
	param('id', 'El parametro debe ser un entero').isNumeric(),
	middleware.validateSchema,
	datosFiscalesController.obtenerIdEmpresa);

router.get(
	'/rfc',
	schemas.buscarRFC,
	middleware.validateSchema,
	datosFiscalesController.obtenerRFC);

router.get('/descripcion', datosFiscalesController.obtenerDescripcion);

router.get('/pais', datosFiscalesController.obtenerPais);

router.get('/personafisica', datosFiscalesController.obtenerPersonaFisica);

router.get('/personamoral', datosFiscalesController.obtenerPersonaMoral);

router.get('/taxId', datosFiscalesController.obtenerTaxId);

router.get('/regimenFiscal', datosFiscalesController.obtenerRegimenFiscal);

router.get('/nombreComercial', datosFiscalesController.obtenerNombreComercial);

// POST - /api/datosFiscales
router.post('/empresa/crear', datosFiscalesController.crearIdEmpresa);

// UPDATE - /api/datosFiscales
router.patch('/empresa/editar', datosFiscalesController.editarIdEmpresa);

// DELETE - /api/datosFiscales
router.delete(
	'/empresa/desactivar',
	datosFiscalesController.desactivarIdEmpresa,
);

export default router;
