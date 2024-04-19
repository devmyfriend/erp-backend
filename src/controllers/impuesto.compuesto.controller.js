import { CompoundTax } from "../models/impuesto.compuesto.model.js";

const findCompoundTax = async (req, res) => {
    try{
        const data = await CompoundTax.findAll({
            where: {
                Borrado: 0
            }
        });
        
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const createCompoundTax = async (req, res) => {
    try {
        const data = req.body;
        const newCompoundTax = await CompoundTax.create(data);
        return res.status(200).json(newCompoundTax);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor: ' + error,
        });
    }
};

const updateCompoundTax = async (req, res) => {
    try {
        const data = req.body;
        
        const taxFound = await CompoundTax.findOne({
            where: {
                ImpuestoCompuestoId: data.ImpuestoCompuestoId,
            }
        });

        if (!taxFound) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto compuesto no existe',
            });
        }

        
        data.ActualizadoEn = new Date();
        await CompoundTax.update(data, {
            where: {
                ImpuestoCompuestoId: data.ImpuestoCompuestoId
            }
        });
        return res.status(200).json({ message: 'Impuesto compuesto actualizado correctamente', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const deleteCompoundTax = async (req, res) => {
    const { ImpuestoCompuestoId, BorradoPor } = req.body

    const taxFound = await CompoundTax.findOne({
        where: {
            ImpuestoCompuestoId,
            Borrado: 0
        }
    });
    if (!taxFound) {
        return res.status(404).json({
            status: 502,
            error: 'El impuesto compuesto no existe: ' + ImpuestoCompuestoId + ' id',
        });
    }
    taxFound.Borrado = 1;
    taxFound.BorradoPor = BorradoPor;

    await taxFound.save();

    return res.status(200).json({ message: 'Impuesto compuesto eliminado' })
};

export const methods = {
    findCompoundTax,
    createCompoundTax,
    updateCompoundTax,
    deleteCompoundTax
}