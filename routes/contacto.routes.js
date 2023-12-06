const { Router } = require('express')
const { obtenerContactos, obtenerDatosContacto } = require('../controllers/contacto.controller')

const router = Router()

router.get('/:id', obtenerContactos)
router.get('/detalle/:id', obtenerDatosContacto)

module.exports = router