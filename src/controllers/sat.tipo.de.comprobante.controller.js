import { TipoDeComprobante } from '../models/sat.tipo.de.comprobante.model.js';

const getTypeOfReceipt = async (req, res) => {
    try {
        const validateTypeOfReceipt = await TipoDeComprobante.findAll({
            where: {
                Borrado: 0,
            },
            attributes: { exclude: ['Borrado'] },
        });

        if (validateTypeOfReceipt.length < 1) {
            return res.status(404).json({
                status: 404,
                message: 'No hay tipos de comprobante',
            });
        }

        return res.status(200).json(validateTypeOfReceipt);
    } catch (error) {
        console.error('Error al obtener los tipos de comprobante:', error);
        res.status(500).json({
            error: 'Error al obtener los tipos de comprobante',
            details: error.message,
        });
    }
};

const createTypeOfReceipt = async (req, res) => {
	const typeOfReceiptBody = req.body;

	try {
		const validateTypeOfReceipt = await TipoDeComprobante.findOne({
			where: {
				ClaveTipoDeComprobante: typeOfReceiptBody.ClaveTipoDeComprobante,
				Borrado: 0,
			},
		});

		if (validateTypeOfReceipt) {
			return res.status(409).json({
				status: 409,
				error: 'El tipo de comprobante ya existe',
			});
		}

		await TipoDeComprobante.create(typeOfReceiptBody);

		return res.status(200).json({
			message: 'Tipo de comprobante creado correctamente',
			ClaveTipoDeComprobante: typeOfReceiptBody.ClaveTipoDeComprobante,
		});
	} catch (error) {
		console.error('Error al crear el tipo de comprobante:', error.message);
		res.status(500).json({ error: 'Error al crear el tipo de comprobante' });
	}
};

const updateTypeOfReceipt = async (req, res) => {
	const typeOfReceiptBody = req.body;

	try {
		const validateTypeOfReceiptBody = await TipoDeComprobante.findOne({
			where: {
				ClaveTipoDeComprobante: typeOfReceiptBody.ClaveTipoDeComprobante,
				Borrado: 0,
			},
		});

		if (!validateTypeOfReceiptBody) {
			return res.status(404).json({
				status: 404,
				error: 'El tipo de comprobante no existe',
			});
		}

		await TipoDeComprobante.update(typeOfReceiptBody, {
			where: {
				ClaveTipoDeComprobante: typeOfReceiptBody.ClaveTipoDeComprobante,
			},
		});

		return res.status(200).json({
			message: 'Tipo de comprobante actualizado correctamente',
			ClaveTipoDeComprobante: typeOfReceiptBody.ClaveTipoDeComprobante,
		});
	} catch (error) {
		console.error('Error al actualizar el tipo de comprobante:', error.message);
		res
			.status(500)
			.json({ error: 'Error al actualizar el tipo de comprobante' });
	}
};

const deleteTypeOfReceipt = async (req, res) => {
	const ClaveTipoDeComprobante = req.params.ClaveTipoDeComprobante;
	try {
		const validateTypeOfReceipt = await TipoDeComprobante.findOne({
			where: { ClaveTipoDeComprobante: ClaveTipoDeComprobante, Borrado: 0 },
		});

		if (!validateTypeOfReceipt) {
			return res.status(404).json({
				status: 404,
				error: 'El tipo de comprobante no existe',
			});
		}

        validateTypeOfReceipt.Borrado = 1;
        await validateTypeOfReceipt.save();

		return res.status(200).json({
			message: 'Tipo de comprobante eliminado correctamente',
		});
	} catch (error) {
		console.error('Error al eliminar el tipo de comprobante:', error.message);
		res.status(500).json({ error: 'Error al eliminar el tipo de comprobante' });
	}
};

export const methods = {
	getTypeOfReceipt,
	createTypeOfReceipt,
	updateTypeOfReceipt,
	deleteTypeOfReceipt,
};
