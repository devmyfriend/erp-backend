import { Router } from "express";
import { methods as paisController } from '../controllers/pais.controller.js';
const router = Router()

router.get( '/', paisController.obtenerPaises )

export default router;