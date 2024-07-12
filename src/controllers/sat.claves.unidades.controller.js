import { ClaveUnidad } from '../models/sat.clave.unidad.model.js';
import { Op } from 'sequelize';

const findAllUnitKeys = async (req, res) => {
    const page = req.params.pagina ? Number(req.params.pagina) : 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await ClaveUnidad.findAndCountAll({
            limit,
            offset,
        });

        const totalPages = Math.ceil(count / limit);

        if (page > totalPages) {
            return res.status(404).json({
                error: 'La página solicitada no existe',
                info: {
                    totalPages,
                    currentPage: page,
                }
            });
        }

        return res.status(200).json({
            info: {
                totalPages,
                currentPage: page,
                totalItems: count,
            },
            items: rows,
        });
    } catch (error) {
        console.error('Error al obtener las claves de unidades', error.message);
        return res
            .status(500)
            .json({ error: 'Error al obtener las claves de unidades' });
    }
};

const findUnitKeysByKey = async (req, res) => {
    const key = req.params.clave;
    try {
        const data = await ClaveUnidad.findAll({
            where: {
                ClaveUnidadSat: { [Op.like]: `%${key}%` },
            },
        });

        if (!data.length) {
            return res.status(404).json({ message: 'No hay datos disponibles' });
        }

        return res.status(200).json({ response: data });
    } catch (error) {
        console.error('Error al obtener los datos de la clave de unidad', error.message);
        return res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

const findUnitKeysByName = async (req, res) => {
    const name = req.params.nombre;
    try {
        const data = await ClaveUnidad.findAll({
            where: {
                NombreUnidadSat: { [Op.like]: `%${name}%` },
            },
        });

        if (!data.length) {
            return res.status(404).json({ message: 'No hay datos disponibles' });
        }

        return res.status(200).json({ response: data });
    } catch (error) {
        console.error('Error al obtener los datos de la clave de unidad', error.message);
        return res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

const createUnitKey = async (req, res) => {
    const unitKeyBody = req.body;
    try {
        const validateUnitKey = await ClaveUnidad.findOne({
            where: {
                ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
                Activo: 1,
            },
        });

        if (validateUnitKey) {
            return res.status(409).json({ error: 'La clave de unidad ya existe' });
        }

        const unitKeyAdd = await ClaveUnidad.create(unitKeyBody);

        return res
            .status(200)
            .json({ success: true, message: 'Clave de unidad creada', unitKeyAdd });
    } catch (error) {
        console.error('Error al crear la clave de unidad', error);
        return res.status(500).json({ error: 'Error al crear la clave de unidad' });
    }
};

const updateUnitKey = async (req, res) => {
    const unitKeyBody = req.body;
    try {
        const validateUnitKey = await ClaveUnidad.findOne({
            where: {
                ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
                Activo: 1,
            },
        });

        if (!validateUnitKey) {
            return res.status(404).json({ error: 'La clave de unidad no existe' });
        }

        await ClaveUnidad.update(unitKeyBody, {
            where: {
                ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
                Activo: 1,
            },
        });

        return res
            .status(200)
            .json({ success: true, message: 'Clave de unidad actualizada' });
    } catch (error) {
        console.error('Error al actualizar la clave de unidad', error);
        return res
            .status(500)
            .json({ error: 'Error al actualizar la clave de unidad' });
    }
};

const deleteUnitKey = async (req, res) => {
    const UnitSATKey = req.body.ClaveUnidadSat;

    try {
        const unitKey = await ClaveUnidad.findOne({
            where: { ClaveUnidadSat: UnitSATKey, Activo: 1 },
        });

        if (!unitKey) {
            return res.status(404).json({ error: 'Clave de unidad no encontrada' });
        }

        await ClaveUnidad.update({ Activo: false }, { where: { ClaveUnidadSat: UnitSATKey } });

        return res
            .status(200)
            .json({ success: true, message: 'Clave de unidad borrada' });
    } catch (error) {
        console.error('Error al borrar la clave de unidad', error.message);
        return res
            .status(500)
            .json({ error: 'Error al borrar la clave de unidad' });
    }
};

export const methods = {
    findAllUnitKeys,
    findUnitKeysByKey,
    findUnitKeysByName,
    createUnitKey,
    updateUnitKey,
    deleteUnitKey,
};
