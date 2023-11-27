const { Router } = require('express')
const { obtenerPaises } = require('../controllers/pais.controller')

const router = Router()

router.get( '/', obtenerPaises )

module.exports = router