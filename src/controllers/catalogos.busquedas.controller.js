import { Connection as sequelize } from '../database/mariadb.database.js';
import { Op } from 'sequelize';
import { Colonias } from '../models/colonia.model.js';
import { regimenFiscal } from '../models/sat.regimen.fiscal.model.js';

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

const findColByName = async (req, res) => {
	const { cp, colonia } = req.body;
	try {
		const data = await Colonias.findAll({
			where: {
				CodigoPostal: cp,
				Nombre: { [Op.like]: `%${colonia}%` },
			},
		});

		if (data.length < 1) {
			return res.status(404).json({ message: 'No hay datos dispobles' });
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos de la colinia', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findSatRF = async (req, res) => {
	try {
		const data = await regimenFiscal.findAll();

		const detail = await Promise.all(
			data.map(async rg => {
				const result = await sequelize.query(
					'CALL Sp_sat_regimen_fiscal(?, ?)',
					{
						replacements: [1, rg.ClaveRegimenFiscal],
						type: sequelize.QueryTypes.RAW,
					},
				);

				return { regimen: rg, cfdi: result };
			}),
		);

		return res.status(200).json(detail);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

export const methods = {
	getPostalCodes,
	findPostalCodes,
	findCol,
	findColByName,
	findSatRF,
};
