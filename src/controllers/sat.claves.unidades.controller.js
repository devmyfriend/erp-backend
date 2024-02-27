import UnitKey from '../models/sat.clave.unidad.model.js';
import { Op } from 'sequelize';

const findAllUnitKeys = async (req, res) => {
	let page = Number(req.params.page);
	if (!Number.isInteger(page) || page <= 0) {
		return res.status(400).json({
			error: 'El número de página debe ser un número entero mayor que 1',
		});
	}

	page = page || 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	if (offset < 0) {
		return res.status(400).json({
			error: 'El número de página debe ser un número entero mayor que 1',
		});
	}

	try {
		const { count, rows } = await UnitKey.findAndCountAll({
			limit,
			offset,
		});

		const totalPages = Math.ceil(count / limit);

		return res.status(200).json({
			info: {
				totalPages,
				currentPage: page,
				totalItems: count,
			},
			items: rows,
		});
	} catch (error) {
		console.error('Error al obtener las claves de unidades', error.message);
		return res
			.status(500)
			.json({ error: 'Error al obtener las claves de unidades' });
	}
};

const findUnitKeysByKey = async (req, res) => {
	const key = req.params.key;

	try {
		const data = await UnitKey.findAll({
			where: {
				ClaveUnidadSat: { [Op.like]: `%${key}%` },
				Activo: 1,
			},
		});

		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}

		return res.status(200).json({ response: data });
	} catch (error) {
		console.error(
			'Error al obtener los datos de la clave de unidad',
			error.message,
		);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const createUnitKey = async (req, res) => {
	const unitKeyBody = req.body;
	try {
		const validateUnitKey = await UnitKey.findOne({
			where: {
				ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
				Activo: 1,
			},
		});

		if (validateUnitKey) {
			return res.status(409).json({ error: 'La clave de unidad ya existe' });
		}

		const unitKeyAdd = await UnitKey.create(unitKeyBody);

		return res
			.status(200)
			.json({ success: true, message: 'Clave de unidad creada', unitKeyAdd });
	} catch (error) {
		console.error('Error al crear la clave de unidad', error);
		return res.status(500).json({ error: 'Error al crear la clave de unidad' });
	}
};

const updateUnitKey = async (req, res) => {
	const unitKeyBody = req.body;
	try {
		const validateUnitKey = await UnitKey.findOne({
			where: {
				ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
				Activo: 1,
			},
		});

		if (!validateUnitKey) {
			return res.status(404).json({ error: 'La clave de unidad no existe' });
		}

		await UnitKey.update(unitKeyBody, {
			where: {
				ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
				Activo: 1,
			},
		});

		return res
			.status(200)
			.json({ success: true, message: 'Clave de unidad actualizada' });
	} catch (error) {
		console.error('Error al actualizar la clave de unidad', error);
		return res
			.status(500)
			.json({ error: 'Error al actualizar la clave de unidad' });
	}
};

const deleteUnitKey = async (req, res) => {
	const { ClaveUnidadSat } = req.body;

	try {
		const unitKey = await UnitKey.findOne({
			where: { ClaveUnidadSat, Activo: 1 },
		});

		if (!unitKey) {
			return res.status(404).json({ error: 'Clave de unidad no encontrada' });
		}

		await UnitKey.update({ Activo: false }, { where: { ClaveUnidadSat } });

		return res
			.status(200)
			.json({ success: true, message: 'Clave de unidad borrada' });
	} catch (error) {
		console.error('Error al borrar la clave de unidad', error.message);
		return res
			.status(500)
			.json({ error: 'Error al borrar la clave de unidad' });
	}
};

export const methods = {
	findAllUnitKeys,
	findUnitKeysByKey,
	createUnitKey,
	updateUnitKey,
	deleteUnitKey,
};
