const { Router } = require('express')
const { obtenerContactos, obtenerDatosContacto, crearContacto, editarContacto, desactivarContacto, crearCorreo, editarCorreo } = require('../controllers/contacto.controller')

const router = Router()

router.get('/:id', obtenerContactos)
router.get('/detalle/:id', obtenerDatosContacto)
router.post('/crear', crearContacto)
router.patch('/editar', editarContacto)
router.delete('/borrar', desactivarContacto)
router.post('/crear/correo', crearCorreo)
router.patch('/editar/correo', editarCorreo)

module.exports = router