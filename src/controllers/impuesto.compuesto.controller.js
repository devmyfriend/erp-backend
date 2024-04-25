import {
	findCompoundTaxById,
	findCompoundTaxByName,
} from '../middlewares/finders/index.js';
import { CompoundTax } from '../models/impuesto.compuesto.model.js';
import { Op } from 'sequelize';

const findAll = async (req, res) => {
	const limit = 10;
	try {
		const data = await CompoundTax.findAll({
			limit,
			where: {
				Borrado: 0,
			},
			order: [['ImpuestoCompuestoId', 'DESC']],
		});

		const newData = data.map(item => ({
			ImpuestoCompuestoId: item.ImpuestoCompuestoId,
			Nombre: item.Nombre,
			Predeterminado: item.Predeterminado,
		}));
		return res.status(200).json(newData);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

const findByName = async (req, res) => {
	const name = req.body.Nombre;
	try {
		const data = await CompoundTax.findAll({
			where: {
				Nombre: { [Op.like]: `%${name}%` },
				Borrado: 0,
			},
		});

		if (data.length === 0) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error(
			'Error al obtener los datos del impuesto compuesto',
			error.message,
		);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const create = async (req, res) => {
	try {
		const data = req.body;

		const taxNameFound = await findCompoundTaxByName(data.Nombre);
		if (taxNameFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El nombre del impuesto compuesto ya existe',
			});
		}

		const newCompoundTax = await CompoundTax.create(data);
		return res.status(200).json({
			message: 'Impuesto compuesto creado correctamente',
			ImpuestoCompuestoId: newCompoundTax.ImpuestoCompuestoId,
		});
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

		const taxFound = await findCompoundTaxById(data.ImpuestoCompuestoId);
		if (!taxFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto compuesto no existe',
			});
		}

		const taxNameFound = await findCompoundTaxByName(data.Nombre);
		if (taxNameFound.exist && taxNameFound.data.ImpuestoCompuestoId !== data.ImpuestoCompuestoId) {
			return res.status(404).json({
				status: 404,
				error: 'El nombre del impuesto compuesto ya existe',
			});
		}

		await CompoundTax.update(
			Object.assign(data, {
				ActualizadoEn: new Date(),
			})
			, {
			where: {
				ImpuestoCompuestoId: data.ImpuestoCompuestoId,
			},
		});

		return res.status(200).json({
			message: 'Impuesto compuesto actualizado correctamente',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

const deleteById = async (req, res) => {
	const { ImpuestoCompuestoId, BorradoPor } = req.body;

	const taxFound = await findCompoundTaxById(ImpuestoCompuestoId);
	if (!taxFound.exist) {
		return res.status(404).json({
			status: 404,
			error: 'El impuesto compuesto no existe',
		});
	}

	await CompoundTax.update(
		{
			Borrado: 1,
			BorradoPor,
			BorradoEn: new Date(),
		},
		{
			where: {
				ImpuestoCompuestoId,
			},
		},
	);

	return res.status(200).json({
		message: 'Impuesto compuesto eliminado',
	});
};

export const methods = {
	findAll,
	findByName,
	create,
	updateById,
	deleteById,
};
