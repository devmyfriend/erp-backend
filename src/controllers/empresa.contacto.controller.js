import { Contacto } from '../models/contacto.model.js';
import { ContactoTelefono } from '../models/contacto.telefono.model.js';
import { Telefono } from '../models/telefono.model.js';
import { ContactoEmail } from '../models/contacto.emails.model.js';
import { Email } from '../models/email.model.js'

const crearContactoDetalleEmpresa = async (req, res) => {
    try {
        const data = req.body;

        const contacto = await Contacto.findByPk(data.ContactoId);
        if (!contacto) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        // Crear correos
        const correosCreados = await Promise.all(
            data.Correo.map(async correo => {
                return await Email.create({
                    Email: correo.Email,
                    CreadoPor: data.CreadoPor,
                });
            }),
        );

        // Asignar correos
        await Promise.all(
            correosCreados.map(async correo => {
                await ContactoEmail.create({
                    ContactoId: data.ContactoId,
                    EmailId: correo.EmailId,
                });
            }),
        );

        // Crear telefonos
        const telefonosCreados = await Promise.all(
            data.Telefono.map(async telefono => {
                return await Telefono.create({
                    NumeroTelefonico: telefono.NumeroTelefonico,
                    CreadoPor: data.CreadoPor,
                });
            }),
        );

        // Asignar telefonos
        await Promise.all(
            telefonosCreados.map(async tel => {
                await ContactoTelefono.create({
                    ContactoId: data.ContactoId,
                    TelefonoId: tel.TelefonoId,
                });
            }),
        );

        res.status(201).json({
            success: true,
            data: {
                correos: correosCreados.map(correo => correo.toJSON()),
                telefonos: telefonosCreados.map(telefono => telefono.toJSON()),
            },
        });
    } catch (error) {
        console.error('Error al agregar detalles de contacto:', error.message);
        return res
            .status(500)
            .json({ success: false, error: 'Internal Server Error' });
    }
};

export const methods = {
    crearContactoDetalleEmpresa,
};