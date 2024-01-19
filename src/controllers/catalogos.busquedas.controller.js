import { Connection as sequelize } from '../database/mariadb.database.js';

import { Colonias } from '../models/colonia.model.js';

const getPostalCodes = async (req, res) => {
	try {
		const data = await sequelize.query(
			'CALL sp_codigos_postales(1,NULL,NULL )',
			{
				type: sequelize.QueryTypes.RAW,
			},
		);

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del cp', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findPostalCodes = async (req, res) => {
	const { cp, municipio } = req.body;
	try {
		const data = await sequelize.query('CALL sp_codigos_postales(?,?,? )', {
			replacements: [2, cp, municipio],
			type: sequelize.QueryTypes.RAW,
		});

		if (data.length < 1) {
			return res.status(404).json({ message: 'No hay datos dispobles' });
		}
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del cp', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findCol = async (req, res) => {
	try {
		const data = await Colonias.findAll({
			limit: 10,
		});

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos de la colinia', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

export const methods = {
	getPostalCodes,
	findPostalCodes,
	findCol,
};
