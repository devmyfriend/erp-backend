const { Router } = require('express')
const { obtenerContactos, obtenerDatosContacto, crearContacto, editarContacto, desactivarContacto, crearCorreo } = require('../controllers/contacto.controller')

const router = Router()

router.get('/:id', obtenerContactos)
router.get('/detalle/:id', obtenerDatosContacto)
router.post('/crear', crearContacto)
router.patch('/editar', editarContacto)
router.delete('/borrar', desactivarContacto)
router.post('/crear/correo', crearCorreo)

module.exports = router