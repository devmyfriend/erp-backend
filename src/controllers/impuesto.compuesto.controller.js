import { CompoundTax } from "../models/impuesto.compuesto.model.js";

const findAll = async (req, res) => {
    const page = parseInt(req.params.pagina) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const { count, rows } = await CompoundTax.findAndCountAll({
			limit,
			offset,
		});
        const totalPages = Math.ceil(count / limit);


        const newData = rows.map(item => ({
            ImpuestoCompuestoId: item.ImpuestoCompuestoId,
            Nombre: item.Nombre,
            Predeterminado: item.Predeterminado
        }));

        return res.status(200).json({
            totalPages,
            currentPage: page,
            totalItems: count,
            items: newData,
        });


/*     try{
        const data = await CompoundTax.findAll({
            limit: 10,
            where: {
                Borrado: 0
            }
        });
     
        const newData = data.map(item => ({
            ImpuestoCompuestoId: item.ImpuestoCompuestoId,
            Nombre: item.Nombre,
            Predeterminado: item.Predeterminado
        }));
        
        return res.status(200).json(newData); */
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const create = async (req, res) => {
    try {
        const data = req.body;

        const taxFound = await CompoundTax.findOne({
            where: {
                Nombre: data.Nombre,
            }
        });

        if (taxFound) {
            return res.status(404).json({
                status: 404,
                error: 'El impuesto compuesto ya existe',
            });
        }

        const newCompoundTax = await CompoundTax.create(data);
        return res.status(200).json({ message: 'Impuesto compuesto creado correctamente', response: newCompoundTax.ImpuestoCompuestoId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor: ' + error,
        });
    }
};

const updateById = async (req, res) => {
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

        const taxNameFound = await CompoundTax.findOne({
            where: {
                Nombre: data.Nombre,
            }
        });

        if (taxNameFound && taxNameFound.ImpuestoCompuestoId !== data.ImpuestoCompuestoId) {
            return res.status(404).json({
                status: 404,
                error: 'El nombre del impuesto compuesto ya existe',
            });
        }
        
        data.ActualizadoEn = new Date();
        await CompoundTax.update(data, {
            where: {
                ImpuestoCompuestoId: data.ImpuestoCompuestoId
            }
        });
        return res.status(200).json({ message: 'Impuesto compuesto actualizado correctamente', response: data.ImpuestoCompuestoId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            error: 'Error interno del servidor',
        });
    }
};

const deleteById = async (req, res) => {
    const { ImpuestoCompuestoId, BorradoPor } = req.body

    const taxFound = await CompoundTax.findOne({
        where: {
            ImpuestoCompuestoId,
            Borrado: 0
        }
    });
    if (!taxFound) {
        return res.status(404).json({
            status: 404,
            error: 'El impuesto compuesto de id ' + ImpuestoCompuestoId + ' no existe',
        });
    }
    taxFound.Borrado = 1;
    taxFound.BorradoPor = BorradoPor;

    await taxFound.save();

    return res.status(200).json({ message: 'Impuesto compuesto eliminado', response: ImpuestoCompuestoId})
};

export const methods = {
    findAll,
    create,
    updateById,
    deleteById
}