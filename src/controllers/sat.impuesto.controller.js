import { Impuesto, ImpuestoCompuesto, ImpuestoCustom } from '../models/impuesto.model.js';

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
};

const findCustomTax = async (req, res) => {
    try{
        const data = await ImpuestoCustom.findAll({
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

const createCustomTax = async (req, res) => {
    try {
        const data = req.body;
        const newCustomTax = await ImpuestoCustom.create(data);
        return res.status(200).json(newCustomTax);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const updateCustomTax = async (req, res) => {
    try {
        const data = req.body;
        
        const taxFound = await ImpuestoCustom.findOne({
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

        
        data.ActualizadoEn = new Date();
        await ImpuestoCustom.update(data, {
            where: {
                cfgImpuestoId: data.cfgImpuestoId
            }
        });
        return res.status(200).json({ message: 'Impuesto propio actualizado correctamente', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const deleteCustomTax = async (req, res) => {
    const id = req.params.id

    const taxFound = await ImpuestoCustom.findOne({
        where: {
            cfgImpuestoId: id,
            Borrado: 0
        }
    });
    if (!taxFound) {
        return res.status(404).json({
            status: 404,
            error: 'El impuesto propio no existe',
        });
    }

    taxFound.Borrado = 1

    await taxFound.save()

    return res.status(200).json({ message: 'Impuesto eliminado' })
};

const findCompoundTax = async (req, res) => {
    try{
        const data = await ImpuestoCompuesto.findAll({
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
        const newCompoundTax = await ImpuestoCompuesto.create(data);
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
        
        const taxFound = await ImpuestoCompuesto.findOne({
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
        await ImpuestoCompuesto.update(data, {
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
    const id = req.params.id

    const taxFound = await ImpuestoCompuesto.findOne({
        where: {
            ImpuestoCompuestoId: id,
            Borrado: 0
        }
    });
    if (!taxFound) {
        return res.status(404).json({
            status: 404,
            error: 'El impuesto compuesto no existe',
        });
    }

    taxFound.Borrado = 1

    await taxFound.save()

    return res.status(200).json({ message: 'Impuesto compuesto eliminado' })
};


export const methods = {
    findTax,
    createTax,
    updateTax,
    deleteTax,
    findCustomTax,
    createCustomTax,
    updateCustomTax,
    deleteCustomTax,
    findCompoundTax,
    createCompoundTax,
    updateCompoundTax,
    deleteCompoundTax,
};
