import { OwnTax } from '../models/impuesto.propio.model.js';

const findAll = async (req, res) => {
    const page = parseInt(req.params.pagina) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const { count, rows } = await OwnTax.findAndCountAll({
			limit,
			offset,
		});
        const totalPages = Math.ceil(count / limit);


        const newData = rows.map(item => ({
            cfgImpuestoId: item.cfgImpuestoId,
            NombreImpuesto: item.NombreImpuesto,
            ClaveImpuesto: item.ClaveImpuesto
        }));

        return res.status(200).json({
            totalPages,
            currentPage: page,
            totalItems: count,
            items: newData,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const create = async (req, res) => {
    try {
        const data = req.body;

        const taxFound = await OwnTax.findOne({
            where: {
                NombreImpuesto: data.NombreImpuesto,
            }
        });

        if (taxFound) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto propio ya existe',
            });
        }

        const newOwnTax = await OwnTax.create(data);
        return res.status(200).json({message: 'Impuesto propio creado correctamente', response: newOwnTax.cfgImpuestoId});
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

        const taxNameFound = await OwnTax.findOne({
            where: {
                NombreImpuesto: data.NombreImpuesto,
            }
        });

        if (taxNameFound && taxNameFound.cfgImpuestoId !== data.cfgImpuestoId) {
            return res.status(400).json({
                status: 400,
                error: 'El nombre del impuesto propio ya existe',
            });
        }

        data.ActualizadoEn = new Date();
        await OwnTax.update(data, {
            where: {
                cfgImpuestoId: data.cfgImpuestoId
            }
        });

        return res.status(200).json({ message: 'Impuesto propio actualizado correctamente', response: data.cfgImpuestoId});
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

        return res.status(200).json( {message: 'Impuesto propio eliminado correctamente', response: cfgImpuestoId});
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
    create,
    updateById,
    deleteById
};