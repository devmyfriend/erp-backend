import {
    findOwnTaxById,
    findOwnTaxByName,
    findTaxById,
} from '../middlewares/finders/index.js';

import { OwnTax } from '../models/impuesto.propio.model.js';
import { Op } from 'sequelize';

const findAll = async (req, res) => {
    const limit = 10;
    try {
        const data = await OwnTax.findAll({
            limit,
            where: {
                Borrado: 0,
            },
            order: [['cfgImpuestoId', 'DESC']]
        });

        const newData = data.map(item => ({
            cfgImpuestoId: item.cfgImpuestoId,
            NombreImpuesto: item.NombreImpuesto,
            ClaveImpuesto: item.ClaveImpuesto,
        }));

        return res.status(200).json(newData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const findByName = async (req, res) => {
    const name = req.body.NombreImpuesto;
    try {
        const data = await OwnTax.findAll({
            where: {
                NombreImpuesto: { [Op.like]: `%${name}%` },
            },
        });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No hay datos disponibles' });
        }

        return res.status(200).json({ message: 'Impuestos encontrados', response: data});
    } catch (error) {
        console.error(
            'Error al obtener los datos del impuesto propio',
            error.message,
        );
        return res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

const create = async (req, res) => {
    try {
        const data = req.body;

        const taxNameFound = await findOwnTaxByName(data.NombreImpuesto);
        if (taxNameFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El nombre del impuesto propio ya existe',
            });
        }

        const taxSATFound = await findTaxById(data.ClaveImpuesto);
        if (!taxSATFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto SAT no existe',
            });
        }

        const newOwnTax = await OwnTax.create(data);
        return res.status(200).json({message: 'Impuesto propio creado correctamente', cfgImpuestoId: newOwnTax.dataValues.cfgImpuestoId});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const updateById = async (req, res) => {
    try {
        const data = req.body;

        const taxFound = await findOwnTaxById(data.cfgImpuestoId);
        if (!taxFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto propio no existe',
            });
        }

        const taxNameFound = await findOwnTaxByName(data.NombreImpuesto);
        if (taxNameFound.exist && taxNameFound.data.cfgImpuestoId !== data.cfgImpuestoId) {
            return res.status(404).json({
                status: 404,
                error: 'El nombre del impuesto propio ya existe',
            });
        }
        
        const taxSATFound = await findTaxById(data.ClaveImpuesto);
        if (!taxSATFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto SAT no existe',
            });
        }

        await OwnTax.update(
            Object.assign(data,{
                ActualizadoEn: new Date()
            }), 
            {
            where: {
                cfgImpuestoId: data.cfgImpuestoId
            }
        });

        return res.status(200).json({ message: 'Impuesto propio actualizado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const deleteById = async (req, res) => {
    try {
        const { cfgImpuestoId, BorradoPor } = req.body;

        const taxFound = await findOwnTaxById(cfgImpuestoId);
        if (!taxFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto propio no existe',
            });
        }

        await OwnTax.update(
            {
                Borrado: 1,
                BorradoEn: new Date(),
                BorradoPor
            },
            {
                where: {
                    cfgImpuestoId
                }
            }
        );

        return res.status(200).json( {message: 'Impuesto propio eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

export const methods = {
    findAll,
    findByName,
    create,
    updateById,
    deleteById
};