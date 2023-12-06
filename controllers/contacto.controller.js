const Contacto = require('../models/contacto.model');
const Email = require('../models/email.model');
const Telefono = require('../models/telefono.model');

const obtenerContactos = async (req, res) => {
    try {

        const id_sucursal = req.params.id;

        const contactos = await Contacto.findAll({
            attributes: ['ContactoId', 'SucursalId', 'Nombres', 'Puesto'],
            where: {
                SucursalId: id_sucursal,
                Borrado: 0,
            },
        });

        res.json(contactos);
    } catch (error) {
        console.error('Error al obtener contactos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const obtenerDatosContacto = async (req, res) => {
    try {
        const id_contacto = req.params.id;

        const email = await Email.findAll({
            where: {
                ContactoId: id_contacto,
                Borrado: 0,
            },
        });

        const tel = await Telefono.findAll({
            where: {
                ContactoId: id_contacto,
                Borrado: 0,
            },
        });

        res.json({ email, telefono: tel });
    } catch (error) {
        console.error('Error al obtener datos de contacto:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }



};


const crearContacto = async (req, res) => {
    try {

        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Invalid request, missing body data' });
        }

        const contactoCreado = await Contacto.create(data);
        res.json({ success: true, data: contactoCreado.toJSON() });
    } catch (error) {
        console.error('Error al crear contacto:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


const editarContacto = async (req, res) => {
    try {

        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }

        const { ContactoId, ...actualizacion } = data;

        const contacto = await Contacto.findByPk(ContactoId);

        if (!contacto) {

            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        await contacto.update(actualizacion);

        console.log('Contacto editado con éxito');
        return res.json({ success: true, data: contacto.toJSON() });
    } catch (error) {
        console.error('Error al editar contacto:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const desactivarContacto = async (req, res) => {
    try {

        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }
        const contacto = await Contacto.findByPk(data.ContactoId);

        if (!contacto) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        contacto.Borrado = true;
        contacto.BorradoPor = data.BorradoPor;

        await contacto.save();

        console.log('Contacto desactivado con éxito');

        return res.json({ message: 'Contacto desactivado: ' + data.ContactoId });

    } catch (error) {
        console.error('Error al desactivar contacto:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const crearCorreo = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }

        const contacto = await Contacto.findByPk(req.body.ContactoId);

        if (!contacto) {

            return res.status(404).json({ error: 'Contacto no encontrado' });
        }
        const correoCreado = await Email.create(data);

        res.status(201).json({ success: true, data: correoCreado.toJSON() });
    } catch (error) {
        console.error('Error al crear correo:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


const editarCorreo = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }
        const { EmailId, ...actualizacion } = data;

        const correo = await Email.findByPk(EmailId);

        if (!correo) {
            return res.status(404).json({ error: 'Correo no encontrado' });
        }

        await correo.update(actualizacion);

        console.log('Correo editado con éxito');

        return res.status(200).json({ success: true, data: correo.toJSON() });

    } catch (error) {
        console.error('Error al editar el correo:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


const desactivarCorreo = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }
        const correo = await Email.findByPk(data.EmailId);

        if (!correo) {
            return res.status(404).json({ error: 'Correo no encontrado' });
        }

        correo.Borrado = true;
        correo.BorradoPor = data.BorradoPor;

        await correo.save();

        console.log('Correo desactivado con éxito');

        return res.status(200).json({ message: 'Correo desactivado: ' + data.EmailId })

    } catch (error) {
        console.error('Error al desactivar el Correo:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const crearTelefono = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }
        const contacto = await Contacto.findByPk(req.body.ContactoId);

        if (!contacto) {

            return res.status(404).json({ error: 'Contacto no encontrado' });
        }
        const telefonoCreado = await Telefono.create(data);
        return res.status(200).json(telefonoCreado.toJSON())
    } catch (error) {
        console.error('Error al agregar el telefono:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


const editarTelefono = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }

        const { TelefonoId, ...actualizacion } = data;

        const tel = await Telefono.findByPk(TelefonoId);

        if (!tel) {
            return res.status(404).json({ error: 'Telefono no encontrado' })
        }

        await tel.update(actualizacion);

        console.log('Telefono editado con éxito');
        return res.status(200).json(tel.toJSON())
    } catch (error) {
        console.error('Error al editar el Telefono:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const desactivarTelefono = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la petición invalido ' });
        }
        const telefono = await Telefono.findByPk(data.TelefonoId);

        if (!telefono) {
            return res.status(404).json({ error: 'Telefono no encontrado' })
        }

        telefono.Borrado = true;
        telefono.BorradoPor = data.BorradoPor;

        await telefono.save();

        console.log('Telefono desactivado con éxito');
        res.status(200).json({ message: 'Telefono desactivado: ' + data.TelefonoId })
    } catch (error) {
        console.error('Error al desactivar el Telefono:', error.message);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = {
    obtenerContactos,
    obtenerDatosContacto,
    crearContacto,
    editarContacto,
    desactivarContacto,
    crearCorreo,
    editarCorreo,
    desactivarContacto,
    crearTelefono,
    editarTelefono,
    desactivarCorreo,
    desactivarTelefono
};
