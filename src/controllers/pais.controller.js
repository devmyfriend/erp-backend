import { Connection as sequelize } from '../database/mariadb.database.js';

const obtenerPaises = async (req, res) => {
	try {
		const paises = await sequelize.query(
			`CALL sp_pais_colonias(1, NUll, NULL, NULL, NULL)`,
			{
				type: sequelize.QueryTypes.RAW,
			},
		);

		res.json(paises);
	} catch (error) {
		console.error('Error al obtener los estados:', error.message);
		res.status(500).json({ error: 'Error al obtener los estados' });
	}
};

const obtenerEstadoPorPais = async (req, res) => {
	const paisId = req.params.id;

	try {
		const estados = await sequelize.query(
			`CALL sp_pais_colonias(2, '${paisId}', NULL, NULL, NULL);`,
			{
				type: sequelize.QueryTypes.RAW,
			},
		);

		res.json(estados);
	} catch (error) {
		console.error('Error al obtener los estados:', error.message);
		res.status(500).json({ error: 'Error al obtener los estados' });
	}
};

const obtenerColonias = async (req, res) => {
	const { cp,  ClaveEstado } = req.body;

	try {
		const colonia = await sequelize.query(
			`CALL sp_pais_colonias(3, NULL, '${cp}', '${ClaveEstado}', NULL)`,
			{
				type: sequelize.QueryTypes.RAW,
			},
		);

		const lol = await filtroLocalidades(
			cp,
			ClaveEstado,
			colonia[0].ClaveColonia,
		);

		res.json({ colonias: colonia, localidades: lol });
	} catch (error) {
		console.error('Error al obtener las colonias', error.message);
		res.status(500).json({ error: 'Error al obtener las colonias' });
	}
};

const filtroLocalidades = async (cp, clavePais, claveColonia) => {
	const localidades = await sequelize.query(
		`CALL sp_pais_colonias(4, NULL,${cp},'${clavePais}','${claveColonia}')`,
		{
			type: sequelize.QueryTypes.RAW,
		},
	);

	return localidades;
};

export const methods = {
	obtenerPaises,
	obtenerEstadoPorPais,
	obtenerColonias,
};
