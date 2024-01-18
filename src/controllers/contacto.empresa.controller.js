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
        
        const validarTelofonoExistente = await Telefono.findOne({
            where: {
                NumeroTelefonico: telefonoBody.NumeroTelefonico,
            },
        });

        if (validarTelofonoExistente){
            return res.status(404).json({ message: 'El teléfono ya se encuentra vinculado con otro contacto' });
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

const actualizarContactoTelefono = async (req, res) => {
    const { ContactoId, TelefonoId, NumeroTelefonico } = req.body;

    try {
        const contactoTelefono = await ContactoTelefono.findOne({
            where: {
                ContactoId: ContactoId,
                TelefonoId: TelefonoId
            },
        });

        if (!contactoTelefono){
            return res.status(404).json({ message: 'La relación ContactoTelefono no existe' });
        }

        await Telefono.update({ NumeroTelefonico: NumeroTelefonico }, {
            where: {
                TelefonoId: TelefonoId,
            },
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha actualizado el teléfono del contacto',
        });
    } catch (error) {
        console.error('Error al actualizar el teléfono del contacto:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Error de validación' });
        }
        res.status(500).json({ error: 'Error al actualizar el teléfono del contacto' });
    }
};

const desactivarContactoTelefono = async (req, res) => {
    try {
        const contactoTelefono = await ContactoTelefono.findOne({
            where: {
                ContactoId: req.body.ContactoId,
                TelefonoId: req.body.TelefonoId,
            },
        });

        if (!contactoTelefono) {
            return res
                .status(404)
                .json({ status: 404, message: 'La relación ContactoTelefono no existe' });
        }

        const verificarTelefonoDesactivado = await Telefono.findOne({
            where: {
                TelefonoId: req.body.TelefonoId,
                Borrado: 1
            }
        });

        if (verificarTelefonoDesactivado) {
            return res
                .status(404)
                .json({ status: 404, message: 'El teléfono ya se encuentra desactivado' });
        }

        await contactoTelefono.update({
            Borrado: 1,
            BorradoPor: req.body.BorradoPor
        });
        
        await Telefono.update({
            Borrado: 1,
            BorradoPor: req.body.BorradoPor
        }, {
            where: {
                TelefonoId: req.body.TelefonoId
            }
        });

        res
            .status(200)
            .json({ message: 'El TelefonoId ' + contactoTelefono.TelefonoId + ' fue desactivado'});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

export const methods = {
    buscarTelefonosPorContactoId,
    crearContactoTelefono,
    actualizarContactoTelefono,
    desactivarContactoTelefono
}
