import { Router } from 'express';
import {methods as datosDomicilioController} from '../controllers/datosDomicilio.controller.js';
const router = Router();

// router.get('/', datosDomicilioController.obtenerDatosDomicilio);


// GET - /api/datosDomicilio
router.get('/sat/municipio', datosDomicilioController.obtenerSAT_Municipio)
router.get('/sat/localidad', datosDomicilioController.obtenerSAT_Localidad)
router.get('/sat/colonia', datosDomicilioController.obtenerSAT_Colonias)
router.get('/sat/codigospostal', datosDomicilioController.obtenerCodigosPostal)
router.get('/sat/estado', datosDomicilioController.obtenerSAT_Estado)

export default router;

