import { Router } from 'express';
import { methods } from "../controllers/satmetodopago.controller.js";
import * as schemas from '../schemas/satmetodopago.schema.js';
import { validateSchema } from '../middlewares/express-validator.js';
import { param } from 'express-validator';

const router = Router();

router.get(
    '/ListaMetodosPago',
    methods.ObtenerSatMetodoPago
);

export default router;