import { Connection as sequelize } from '../database/mariadb.database.js';
import { Contacto } from '../models/contacto.model.js';
import { ContactoTelefono } from '../models/contacto.telefono.model.js';
import { Telefono } from '../models/telefono.model.js';

const buscarTelefonosPorContactoId = async (req, res) => {
    const contactoId = req.params.id;
    try {
        const telefonos = await sequelize.query(
            'CALL ObtenerContactoTelefonos(?)',
            {
                replacements: [contactoId],
                type: sequelize.QueryTypes.RAW,
            },
        );

        if (telefonos.length === 0) {
            res.status(404).json({ message: 'No existen teléfonos relacionados con este contacto' });
        } else {
            res.json(telefonos);
        }
    } catch (error) {
        console.error('Error al obtener los teléfonos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const crearContactoTelefono = async (req, res) => {
    const telefonoBody = req.body;
    try {
        const validarContacto = await Contacto.findOne({
            where: {
                ContactoId: telefonoBody.ContactoId,
            },
        });

        if (!validarContacto){
            return res.status(404).json({ message: 'El contacto no existe' });
        }
        
        const datosTelefono = await Telefono.create(telefonoBody)

        await ContactoTelefono.create({
            ContactoId: telefonoBody.ContactoId,
            TelefonoId: datosTelefono.TelefonoId,
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha creado la relación ContactoTelefono',
        });
    } catch (error) {
        console.error('Error al crear la relación ContactoTelefono:', error);
        res.status(500).json({ error: 'Error al crear la relación ContactoTelefono' });
    }
};

export const methods = {
    buscarTelefonosPorContactoId,
    crearContactoTelefono
}
