const { Router } = require('express');
const { obtenerLongitudListado } = require('../../controllers/empresas/longitud.controller')

const router =  Router()

router.get( '/', obtenerLongitudListado )

module.exports = router