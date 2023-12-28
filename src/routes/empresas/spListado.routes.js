const { Router } = require('express');
const { obtenerListado } = require('../../controllers/empresas/listado.controller');

const router = Router();

router.get('/', obtenerListado);

module.exports = router;