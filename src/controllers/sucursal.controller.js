import { Connection as sequelize } from '../database/mariadb.database.js';

const obtenerSucursales = async (req, res) => {
	const empresaId = req.params.id;
	// TODO ->  VALIDAR SI LA EXPRESA EXISTE
	try {
		const sucursales = await sequelize.query(
			`CALL sp_sucursal_entidad(${empresaId}); `,
			{
				type: sequelize.QueryTypes.RAW,
			},
		);

		res.json(sucursales);
	} catch (error) {
		console.error('Error al obtener las sucursales:', error.message);
		res.status(500).json({ error: 'Error al obtener las sucursales' });
	}
};

export const methods = {
	obtenerSucursales,
};
