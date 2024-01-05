import { Router } from 'express';
import { methods as busquedaController } from '../../controllers/empresas/longitudBuscador.controller.js';
const router = Router(); 

router.get(
    '/' +
    'propiedad=' + ':propiedad' +
    '&texto=' + ':texto'
    , busquedaController.obtenerLongitudBusqueda );
export default router;