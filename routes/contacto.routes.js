const { Router } = require('express')
const { obtenerContactos, obtenerDatosContacto, crearContacto, editarContacto, desactivarContacto, crearCorreo, editarCorreo, desactivarCorreo, crearTelefono, editarTelefono } = require('../controllers/contacto.controller')

const router = Router()

router.get('/:id', obtenerContactos)
router.get('/detalle/:id', obtenerDatosContacto)
router.post('/crear', crearContacto)
router.patch('/editar', editarContacto)
router.delete('/borrar', desactivarContacto)
router.post('/crear/correo', crearCorreo)
router.patch('/editar/correo', editarCorreo)
router.delete('/correo/borrar', desactivarCorreo)
router.post('/crear/telefono', crearTelefono)
router.patch('/editar/telefono', editarTelefono)

module.exports = router