import { Connection as sequelize } from '../database/mariadb.database.js';

const getPostalCodes = async (req, res) => {
	try {
		const data = await sequelize.query('CALL sp_codigos_postales(1,NULL,NULL )', {
			type: sequelize.QueryTypes.RAW,
		});

		
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del cp', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

export const methods = {
	getPostalCodes,
};
