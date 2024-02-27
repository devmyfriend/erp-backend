import { Impuesto } from '../models/impuesto.model.js';

const findTax = async (req, res) => {
    try {
        const data = await Impuesto.findAll({
            where: {
                Activo: 1
            }
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

const createTax = async (req, res) => {
    try {
        const data = req.body;
        const newTax = await Impuesto.create(data);
        return res.status(200).json(newTax);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const updateTax = async (req, res) => {
    try {
        const data = req.body;
        const taxFound = await Impuesto.findOne({
            where: {
                ClaveImpuesto: data.ClaveImpuesto,
                Activo: 1
            }
        });

        if (!taxFound) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto no existe',
            });
        }

        await Impuesto.update(data, {
            where: {
                ClaveImpuesto: data.ClaveImpuesto
            }
        });
        return res.status(200).json({ message: 'Impuesto actualizado correctamente', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const deleteTax = async (req, res) => {

    const id = req.params.id

    const taxFound = await Impuesto.findOne({
        where: {
            ClaveImpuesto: id,
            Activo: 1
        }
    });
    if (!taxFound) {
        return res.status(404).json({
            status: 404,
            error: 'El impuesto no existe',
        });
    }

    taxFound.Activo = 0

    await taxFound.save()

    return res.status(200).json({ message: 'Impuesto eliminado' })
}
export const methods = {
    findTax,
    createTax,
    updateTax,
    deleteTax
};
