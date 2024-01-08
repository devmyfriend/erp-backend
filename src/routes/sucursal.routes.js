import { methods as test } from '../controllers/sucursal.controller.js';

import { Router } from "express";

const router = Router();

router.get('/', test.test);

export default router;
