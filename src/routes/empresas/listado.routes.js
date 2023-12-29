import { Router } from "express";
import { methods as listadoController } from '../../controllers/empresas/listado.controller.js';
const router = Router()

router.get(
    '/' +
    'offset=' + ':offset' +
    '&limit='  + ':limit' +
    '&propiedad=' + ':propiedad'
    , listadoController.obtenerListado )

export default router;