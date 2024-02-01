import { Connection as sequelize } from '../database/mariadb.database.js';
import { Op } from 'sequelize';
import { Colonias } from '../models/colonia.model.js';
import { regimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { Coin } from '../models/sat.type.coin.js';
import { UsoCFDI } from '../models/sat.uso.cfdi.model.js';
import ProductoServicio from '../models/sat.product.services.model.js';

const getPostalCodes = async (req, res) => {
	try {
		const data = await sequelize.query('CALL sp_codigos_postales(1,NULL )', {
			type: sequelize.QueryTypes.RAW,
		});

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del cp', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findPostalCodes = async (req, res) => {
	const { cp } = req.body;
	try {
		const data = await sequelize.query('CALL sp_codigos_postales(?,? )', {
			replacements: [2, cp],
			type: sequelize.QueryTypes.RAW,
		});

		if (data.length < 1) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
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
		console.error('Error al obtener los datos de la colonia', error.message);
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
		console.error('Error al obtener los datos de la moneda', error.message);
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

const paymentMethods = async (req, res) => {
	try {
		const data0 = await sequelize.query('CALL sp_formas_metodo_pago(1)', {
			type: sequelize.QueryTypes.RAW,
		});
		const data1 = await sequelize.query('CALL sp_formas_metodo_pago(2)', {
			type: sequelize.QueryTypes.RAW,
		});

		return res.status(200).send([{ metodos: data1, formas: data0 }]);
	} catch (error) {
		console.error('Error al obtener los datos de la moneda', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const getTypeCoin = async (req, res) => {
	try {
		const data = await Coin.findAll({ limit: 15 });
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos de la moneda', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findTypeCoin = async (req, res) => {
	const name = req.params.id;
	try {
		const data = await Coin.findAll({
			where: {
				Descripcion: { [Op.like]: `%${name}%` },
			},
		});
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos de la moneda', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const createTypeCoin = async (req, res) => {
	const coinBody = req.body;

	try {

		const validateCoin = await Coin.findOne({
			where: { ClaveMoneda: coinBody.ClaveMoneda, Activo: 1 },
		});

		if (validateCoin) {
			return res
				.status(409)
				.json({ error: 'La clave de la moneda ya esta en uso ' });
		}

		await Coin.create(coinBody);

		return res.status(200).json({ success: true, message: 'Moneda creada' });

	} catch (error) {
		console.error('Error al crear la moneda', error);
		return res.status(500).json({ error: 'Error al crear la moneda' });
	}
};

const updateTypeCoin = async (req, res) => {
	const { ClaveMoneda, Descripcion } = req.body;

	try {
		const [updated] = await Coin.update(
			{ Descripcion },
			{ where: { ClaveMoneda } },
		);

		if (!updated) {
			return res.status(404).json({ error: 'Moneda no encontrada' });
		}

		return res
			.status(200)
			.json({ success: true, message: 'Moneda actualizada' });
	} catch (error) {
		console.error('Error al actualizar la moneda', error.message);
		return res.status(500).json({ error: 'Error al actualizar la moneda' });
	}
};

const deleteTypeCoin = async (req, res) => {
	const { ClaveMoneda } = req.body;

	try {
		const [updated] = await Coin.update(
			{ Activo: false },
			{ where: { ClaveMoneda } },
		);

		if (!updated) {
			return res.status(404).json({ error: 'Moneda no encontrada' });
		}

		return res.status(200).json({ success: true, message: 'Moneda borrada' });
	} catch (error) {
		console.error('Error al desactivar la moneda', error.message);
		return res.status(500).json({ error: 'Error al desactivar la moneda' });
	}
};

const createRegimenFiscal = async (req, res) => {
	const satFKBody = req.body;
	try {

		const validateRegimenFiscal = await regimenFiscal.findOne({
			where: { ClaveRegimenFiscal: satFKBody.ClaveRegimenFiscal, Activo: 1 },
		});

		if (validateRegimenFiscal) {
			return res
				.status(409)
				.json({ error: 'La clave del regimen fiscal ya esta en uso ' });
		}


		await regimenFiscal.create(satFKBody);
		return res
			.status(200)
			.json({ success: true, message: 'Régimen Fiscal creado' });
	} catch (error) {
		console.error('Error al crear SatFK', error);
		return res.status(500).json({ error: 'Error al crear régimen fiscal' });
	}
};

const updateRegimenFiscal = async (req, res) => {
	const satFKBody = req.body;

	try {
		const [updated] = await regimenFiscal.update(satFKBody, {
			where: { ClaveRegimenFiscal: satFKBody.ClaveRegimenFiscal, Activo: 1},
		});

		if (!updated) {
			return res.status(404).json({ error: 'Regimen Fiscal no encontrado' });
		}

		return res
			.status(200)
			.json({ success: true, message: 'Regimen Fiscal actualizado' });
	} catch (error) {
		console.error('Error al actualizar el regimen fiscal', error.message);
		return res
			.status(500)
			.json({ error: 'Error al actualizar el regimen fiscal' });
	}
};

const deleteRegimenFiscal = async (req, res) => {
	const { ClaveRegimenFiscal } = req.body;

	try {
		const regimen = await regimenFiscal.findOne({
			where: { ClaveRegimenFiscal, Activo: 0 },
		});

		if (!regimen) {
			return res.status(404).json({ error: 'Regimen Fiscal no encontrado' });
		}
		
		await regimenFiscal.update(
			{ Activo: false },
			{ where: { ClaveRegimenFiscal } },
		);

		return res
			.status(200)
			.json({ success: true, message: 'Régimen fiscal borrado' });
	} catch (error) {
		console.error('Error al borrar el regimen fiscal', error.message);
		return res.status(500).json({ error: 'Error al borrar el regimen fiscal' });
	}
};

const createUsoCFDI = async (req, res) => {
	const cfdiBody = req.body;

	try {
		await UsoCFDI.create(cfdiBody);

		return res.status(200).json({ success: true, message: 'CFDI creado' });
	} catch (error) {
		console.error('Error al crear CFDI', error.message);
		return res.status(500).json({ error: 'Error al crear CFDI' });
	}
};

const updateUsoCFDI = async (req, res) => {
	const cfdiBody = req.body;

	try {
		const cfdi = await UsoCFDI.findOne({
			where: { ClaveUsoCFDI: cfdiBody.ClaveUsoCFDI },
		});

		if (!cfdi) {
			return res.status(404).json({ error: 'CFDI no encontrado' });
		}

		const updatedCFDI = await cfdi.update(cfdiBody);

		return res
			.status(200)
			.json({ success: true, message: 'CFDI actualizado', data: updatedCFDI });
	} catch (error) {
		console.error('Error al actualizar CFDI', error.message);
		return res.status(500).json({ error: 'Error al actualizar CFDI' });
	}
};

const deleteCFDI = async (req, res) => {
	const { ClaveUsoCFDI } = req.body;

	try {
		const cfdi = await UsoCFDI.findOne({ where: { ClaveUsoCFDI } });

		if (!cfdi) {
			return res.status(404).json({ error: 'CFDI no encontrado' });
		}

		if (!cfdi.Activo) {
			return res.status(400).json({ error: 'El CFDI no existe' });
		}

		await UsoCFDI.update({ Activo: false }, { where: { ClaveUsoCFDI } });

		return res.status(200).json({ success: true, message: 'CFDI borrado' });
	} catch (error) {
		console.error('Error al borrar el CFDI', error.message);
		return res.status(500).json({ error: 'Error al borrar el CFDI' });
	}
};


const findCFDI = async (req, res) => {
	const result = await sequelize.query('CALL sp_lista_cfdi()', {
		type: sequelize.QueryTypes.RAW,
	});
	return res.status(200).json(result);
};

const findProductServicesByCode = async (req, res) => {
	const { code } = req.params;
	try {
		const data = await ProductoServicio.findAll({
            where: { ClaveProductoServicio: { [Op.like]: '%' + code + '%' } },
		});
		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findProductServicesByDescription = async (req, res) => {
	const { descripcion } = req.params;

	try {
		const data = await ProductoServicio.findAll({
			where: { Descripcion: { [Op.like]: descripcion + '%'} },
		});
		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	} 
}

const findProductServicesByMatchWord = async (req, res) => {
	const { palabra } = req.params;
	try {
		const data = await ProductoServicio.findAll({
			where: { PalabrasSimilares: { [Op.like]: '%' + palabra + '%' } },
		});
		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
}

const createProductServices = async (req, res) => {
	const productServicesBody = req.body;
	try {

		const validateProductServices = await ProductoServicio.findOne({
			where: { ClaveProductoServicio: productServicesBody.ClaveProductoServicio, Activo: 1 },
		});

		if (validateProductServices) {
			return res
				.status(409)
				.json({ error: 'La clave del producto/servicio ya esta en uso ' });
		}

		await ProductoServicio.create(productServicesBody);
		return res.status(200).json({ success: true, message: 'Producto/Servicio creado' });
	} catch (error) {
		console.error('Error al crear el producto/servicio', error.message);
		return res.status(500).json({ error: 'Error al crear el producto/servicio' });
	}
}

const updateProductServices = async (req, res) => {
	const productServicesBody = req.body;
	try {
		const [updated] = await ProductoServicio.update(productServicesBody, {
			where: { ClaveProductoServicio: productServicesBody.ClaveProductoServicio, Activo: 1 },
		});

		if (!updated) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		return res.status(200).json({ success: true, message: 'Producto/Servicio actualizado' });
	} catch (error) {
		console.error('Error al actualizar el producto/servicio', error.message);
		return res.status(500).json({ error: 'Error al actualizar el producto/servicio' });
	}
}

const deleteProductServices = async (req, res) => {
	const { ClaveProductoServicio } = req.body;

	try {
		const product = await ProductoServicio.findOne({
			where: { ClaveProductoServicio, Activo: 1 },
		});

		if (!product) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		await ProductoServicio.update({ Activo: false }, { where: { ClaveProductoServicio } });

		return res.status(200).json({ success: true, message: 'Producto/Servicio borrado' });
	} catch (error) {
		console.error('Error al borrar el producto/servicio', error.message);
		return res.status(500).json({ error: 'Error al borrar el producto/servicio' });
	}
}


export const methods = {
	getPostalCodes,
	findPostalCodes,
	findCol,
	findColByName,
	findSatRF,
	paymentMethods,
	getTypeCoin,
	findTypeCoin,
	createTypeCoin,
	updateTypeCoin,
	deleteTypeCoin,
	createRegimenFiscal,
	updateRegimenFiscal,
	deleteRegimenFiscal,
	createUsoCFDI,
	updateUsoCFDI,
	deleteCFDI,
	findCFDI,
	findProductServicesByCode,
	findProductServicesByDescription,
	findProductServicesByMatchWord,
	createProductServices,
	updateProductServices,
	deleteProductServices
};
