import { Router } from 'express';
import { methods as busquedaController } from '../../controllers/empresas/buscador.controller.js';
const router = Router();

router.get(
    '/' +
    'offset=' + ':offset' +
    '&limit=' + ':limit' +
    '&propiedad=' + ':propiedad' +
    '&texto=' + ':texto'
    , busquedaController.busqueda )

export default router;