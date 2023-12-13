import { Router } from 'express';
import { methods as contactoController } from '../controllers/contacto.controller.js';
const router = Router();

router.get('/:id', contactoController.obtenerContactos);
router.post('/buscar', contactoController.buscarContacto);
router.get('/detalle/:id', contactoController.obtenerDatosContacto);
router.post('/crear', contactoController.crearContacto);
router.post('/crear/datos', contactoController.agregarDetalleContacto);
router.patch('/editar', contactoController.editarContacto);
router.delete('/borrar', contactoController.desactivarContacto);
router.post('/crear/correo', contactoController.crearCorreo);
router.patch('/editar/correo', contactoController.editarCorreo);
router.delete('/correo/borrar', contactoController.desactivarCorreo);
router.post('/crear/telefono', contactoController.crearTelefono);
router.patch('/editar/telefono', contactoController.editarTelefono);
router.delete('/telefono/borrar', contactoController.desactivarTelefono);

export default router;
