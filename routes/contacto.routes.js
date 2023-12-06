const { Router } = require('express')
const { obtenerContactos } = require('../controllers/contacto.controller')

const router = Router()

router.get( '/:id', obtenerContactos )

module.exports = router