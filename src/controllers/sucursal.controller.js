import { Connection as sequelize } from '../database/mariadb.database.js';
// import { Sucursal } from '../models/sucursal.model.js';

// import { Domicilio } from '../models/domicilios.model.js';

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

const crearSucursal = async (req, res) => {
	// const { empresa, datos } = req.body;
	try {
		// const validarNombre = await Sucursal.findOne({
		// 	where: {
		// 		Nombre: empresa[0].Nombre,
		// 	},
		// });

		// if (validarNombre) {
		// 	return res.status(409).json({
		// 		status: 409,
		// 		error: 'El nombre de la sucursal ya esta en uso',
		// 	});
		// }

		// // const sucursal = await Sucursal.create({ CreadoPor, ...empresa[0] });

		// const sucursalDatos = await Domicilio.create({
		// 	EntidadNegocioId: empresa[0].EntidadNegocioId,
		// 	CreadoPor: empresa[0].CreadoPor,
		// 	SucursalId: 111,
		// 	...datos[0],
		// });

		// res.json(sucursalDatos);

		res.json('{}');
	} catch (error) {
		console.error('Error al obtener las sucursales:', error.message);
		res.status(500).json({ error: 'Error al obtener las sucursales' });
	}
};

export const methods = {
	obtenerSucursales,
	crearSucursal,
};
