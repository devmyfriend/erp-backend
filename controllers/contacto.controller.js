const Contacto = require('../models/contacto.model');

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

module.exports = {
    obtenerContactos,
};
