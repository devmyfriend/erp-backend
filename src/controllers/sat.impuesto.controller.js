import * as finders from '../middlewares/finders/index.js';
import { Tax } from '../models/impuesto.model.js';

const findAll = async (req, res) => {
	const limit = 10;
	try {
		const data = await Tax.findAll({
			limit,
			where: {
				Activo: 1,
			},
			order: [['ClaveImpuesto', 'DESC']],
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
		const data = await finders.findAllTaxByName(name);

		if (!data.exist) {
			return res.status(404).json({
				status: 404,
				error: 'No se encontraron valores',
			});
		}

		return res
			.status(200)
			.json({ message: 'Datos encontrados', data: data.data });
	} catch (error) {
		console.error('Error al obtener los datos del impuesto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const create = async (req, res) => {
	try {
		const data = req.body;

		const taxFound = await finders.findTaxById(data.ClaveImpuesto);
		if (taxFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto SAT ya existe',
			});
		}

		const taxNameFound = await finders.findTaxByName(data.Nombre);
		if (taxNameFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El nombre del impuesto SAT ya existe',
			});
		}

		const newTax = await Tax.create(data);
		return res
			.status(200)
			.json({
				message: 'El impuesto del SAT se ha creado correctamente',
				ClaveImpuesto: newTax.dataValues.ClaveImpuesto,
			});
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

		const taxFound = await finders.findTaxById(data.ClaveImpuesto);
		if (!taxFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto no existe',
			});
		}

		const taxNameFound = await finders.findTaxByName(data.Nombre);
		if (
			taxNameFound.exist &&
			taxNameFound.data.ClaveImpuesto !== data.ClaveImpuesto
		) {
			return res.status(404).json({
				status: 404,
				error: 'El nombre del impuesto ya existe',
			});
		}

		await Tax.update(data, {
			where: {
				ClaveImpuesto: data.ClaveImpuesto,
			},
		});
		return res
			.status(200)
			.json({ message: 'Impuesto actualizado correctamente' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

const deleteById = async (req, res) => {
	const id = req.params.id;
	try {
		const taxFound = await finders.findTaxById(id);
		if (!taxFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto no existe',
			});
		}

		await Tax.update(
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
