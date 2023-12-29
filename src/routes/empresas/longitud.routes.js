import { Router } from "express";
import { methods as longitudController } from '../../controllers/empresas/longitud.controller.js';
const router = Router()

router.get( '/:propiedad', longitudController.obtenerLongitud )

export default router;