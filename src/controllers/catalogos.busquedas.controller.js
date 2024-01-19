import { Connection as sequelize } from '../database/mariadb.database.js';

const getPostalCodes = async (req, res) => {
	// TODO ->  VALIDAR SI LA EXPRESA EXISTE
	try {
		// const sucursales = await sequelize.query(`SELECT * FROM SAT_CodigosPostal LIMIT 11`);

		
		res.json(['Hola']);
	} catch (error) {
		console.error('Error al obtener las sucursales:', error.message);
		res.status(500).json({ error: 'Error al obtener las sucursales' });
	}
};

export const methods = {
	getPostalCodes,
};
