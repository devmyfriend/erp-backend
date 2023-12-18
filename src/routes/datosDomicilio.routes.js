import { Router } from 'express';
import { methods } from '../controllers/datosDomicilio.controller.js';
const router = Router();

// router.get('/', datosDomicilioController.obtenerDatosDomicilio);


// GET - /api/datosDomicilio
router.get('/sat/municipio', methods.obtenerSAT_Municipio)
router.get('/sat/localidad', methods.obtenerSAT_Localidad)
router.get('/sat/colonia', methods.obtenerSAT_Colonias)
router.get('/sat/codigospostal', methods.obtenerCodigosPostal)
router.get('/sat/estado', methods.obtenerSAT_Estado)

export default router;

