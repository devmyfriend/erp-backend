import { Impuesto } from '../models/impuesto.model.js';
import { Op } from 'sequelize';
import {
    findTaxById,
    findTaxByName,
} from '../middlewares/finders/index.js';

const findAll = async (req, res) => {
    const limit = 10;
    try {
        const data = await Impuesto.findAll({
            limit,
            where: {
                Activo: 1
            },
            order: [['ClaveImpuesto', 'DESC']]
        });

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const findByName = async (req, res) => {
    const name = req.body.Nombre;
    try {
        const data = await Impuesto.findAll({
            where: {
                Nombre: { [Op.like]: `%${name}%` },
                Activo: 1
            },
        });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No hay datos disponibles' });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(
            'Error al obtener los datos del impuesto',
            error.message,
        );
        return res.status(500).json({ error: 'Error al obtener los datos' });
    }
};

const create = async (req, res) => {
    try {
        const data = req.body;

        const taxFound = await findTaxById(data.ClaveImpuesto);
        if (taxFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto SAT ya existe',
            });
        }

        const taxNameFound = await findTaxByName(data.Nombre);
        if (taxNameFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El nombre del impuesto SAT ya existe',
            });
        }
        
        const newTax = await Impuesto.create(data);
        return res.status(200).json({message: 'El impuesto del SAT se ha creado correctamente', ClaveImpuesto: newTax.dataValues.ClaveImpuesto });
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

        const taxFound = await findTaxById(data.ClaveImpuesto);
        if (!taxFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto no existe',
            });
        }

        const taxNameFound = await findTaxByName(data.Nombre);
        if (taxNameFound.exist && taxNameFound.data.ClaveImpuesto !== data.ClaveImpuesto) {
            return res.status(404).json({
                status: 404,
                error: 'El nombre del impuesto ya existe',
            });
        }

        await Impuesto.update(data, {
            where: {
                ClaveImpuesto: data.ClaveImpuesto
            }
        });
        return res.status(200).json({ message: 'Impuesto actualizado correctamente', });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const deleteById = async (req, res) => {
    const id = req.params.id
    try{
        const taxFound = await findTaxById(id);
        if (!taxFound.exist) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto no existe',
            });
        }
    
        await Impuesto.update(
            {
                Activo: 0,
            },
            {
                where: {
                    ClaveImpuesto: id,
                },
            },
        );
    
        return res.status(200).json({
            message: 'Impuesto eliminado correctamente',
        });
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
    deleteById,
};