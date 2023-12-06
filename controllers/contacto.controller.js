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


module.exports = {
    obtenerContactos,
    obtenerDatosContacto,
    crearContacto
};
