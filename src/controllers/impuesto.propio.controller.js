import { OwnTax } from '../models/impuesto.propio.model.js';

const findOwnTax = async (req, res) => {
    try {
        const data = await OwnTax.findAll({
            where: {
                Borrado: 0
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

const createOwnTax = async (req, res) => {
    try {
        const data = req.body;
        const newOwnTax = await OwnTax.create(data);
        return res.status(200).json(newOwnTax);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const updateOwnTax = async (req, res) => {
    try {
        const data = req.body;

        const taxFound = await OwnTax.findOne({
            where: {
                cfgImpuestoId: data.cfgImpuestoId,
            }
        });

        if (!taxFound) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto propio no existe',
            });
        }

        taxFound.NombreImpuesto = data.NombreImpuesto;
        taxFound.ClaveImpuesto = data.ClaveImpuesto;
        taxFound.ActualizadoPor = data.ActualizadoPor;
        taxFound.ActualizadoEn = new Date();

        await taxFound.save();

        return res.status(200).json(taxFound);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
}

const deleteOwnTax = async (req, res) => {
    try {
        const { cfgImpuestoId, BorradoPor } = req.body;

        const taxFound = await OwnTax.findOne({
            where: {
                cfgImpuestoId,
            }
        });

        if (!taxFound) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto propio no existe',
            });
        }

        taxFound.Borrado = 1;
        taxFound.BorradoEn = new Date();
        taxFound.BorradoPor = BorradoPor;

        await taxFound.save();

        return res.status(200).json(taxFound);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
}

export const methods = {
    findOwnTax,
    createOwnTax,
    updateOwnTax,
    deleteOwnTax
};