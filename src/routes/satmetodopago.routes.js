import { Router } from 'express';
import { methods } from "../controllers/satmetodopago.controller.js";
import * as schemas from '../schemas/satmetodopago.schema.js';
import * as middleware from '../middlewares/express-validator.js';
import { param } from 'express-validator';

const router = Router();

router.get(
    '/',
    methods.ObtenerSatMetodoPago
);

router.post(
    '/crear',
    schemas.CrarMetodoPago,
    middleware.validateSchema,
    methods.CrearSatMetodoPago
);

router.patch(
    '/editar',
    schemas.EditarMetodoPago,
    middleware.validateSchema,
    methods.EditarSatMetodoPago
);

export default router;