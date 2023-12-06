const { Router } = require('express')
const { obtenerContactos, obtenerDatosContacto, crearContacto, editarContacto } = require('../controllers/contacto.controller')

const router = Router()

router.get('/:id', obtenerContactos)
router.get('/detalle/:id', obtenerDatosContacto)
router.post('/crear', crearContacto)
router.patch('/editar', editarContacto)

module.exports = router