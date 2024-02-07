import UnitKey from '../models/sat.clave.unidad.model.js';

const findAllUnitKeys = async (req, res) => {
	const page = Number(req.params.page) || 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	try {
		const { count, rows } = await UnitKey.findAndCountAll({
			limit,
			offset,
		});

		const totalPages = Math.ceil(count / limit);

		return res.status(200).json({
			totalPages,
			currentPage: page,
			totalItems: count,
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
	const { key } = req.params;
	try {
		const data = await UnitKey.findAll({
			where: {
				ClaveUnidadSat: key,
				Activo: 1
			},
		});

		if (data.length < 1) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}

		return res.status(200).json(data);
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
				Activo: 0,
			},
		});

		if (validateUnitKey) {
			return res
				.status(409)
				.json({ error: 'La clave de unidad ya esta en uso ' });
		}

		const validateUnitKeyName = await UnitKey.findOne({
			where: {
				NombreUnidadSat: unitKeyBody.NombreUnidadSat,
				Activo: 0,
			}
		})

		if (validateUnitKeyName) {
			return res
				.status(409)
				.json({ error: 'El nombre de la unidad ya esta en uso ' });
		}

		const unitKeyAdd = await UnitKey.create(unitKeyBody);

		return res.status(200).json({ success: true, message: 'Clave de unidad creada', unitKeyAdd });
	} catch (error) {
		console.error('Error al crear la clave de unidad', error.message);
		return res.status(500).json({ error: 'Error al crear la clave de unidad' });
	}
};

const updateUnitKey = async (req, res) => {
	const unitKeyBody = req.body;
	try {
		const [updated] = await UnitKey.update(unitKeyBody, {
			where: {
				ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
				Activo: 1,
			},
		});

		if (!updated) {
			return res.status(404).json({ error: 'Clave de unidad no encontrada' });
		}

		return res
			.status(200)
			.json({ success: true, message: 'Clave de unidad actualizada' });
	} catch (error) {
		console.error('Error al actualizar la clave de unidad', error.message);
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
