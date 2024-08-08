import { Connection as sequelize } from '../database/mariadb.database.js';
import { Op } from 'sequelize';
import { Colonias } from '../models/colonia.model.js';
import { vwRegimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { CFDIRegimen } from '../models/sat.uso.cfdi.regimen.fiscal.model.js';
import { Moneda } from '../models/sat.moneda.js';
import { vwSatCFDI } from '../models/sat.uso.cfdi.model.js';
import { ProductosServicios } from '../models/sat.productos.servicios.model.js';
import { ClaveUnidad } from '../models/sat.clave.unidad.model.js';
import { Bitacora } from '../helpers/logs/log.js';

import {
	validarMoneda,
	validarCFDIActivoPorClave,
	validarCFDIPorClave,
	validarRegimenFiscalPorClave,
	validarRegimenFiscalActivoPorClave,
} from '../middlewares/finders/index.js';

// POSTAL CODES
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

// TYPE COIN
const getTypeCoin = async (req, res) => {
	try {
		const data = await Moneda.findAll({
			where: {
				Activo: 1,
			},
		});
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos de la moneda', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findTypeCoin = async (req, res) => {
	const name = req.params.id;
	try {
		const data = await Moneda.findAll({
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
		const { existe } = await validarMoneda(coinBody.ClaveMoneda, 1);

		if (existe) {
			return res.status(409).send({
				status: 'Error',
				message: 'La clave de la moneda ya está en uso',
			});
		}

		await Moneda.create(coinBody);

		return res.status(200).send({
			status: 'OK',
			message: 'Moneda creada correctamente',
			moneda: coinBody,
		});
	} catch (error) {
		Bitacora('createTypeCoin', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const updateTypeCoin = async (req, res) => {
	const { ClaveMoneda, Descripcion } = req.body;

	try {
		const { existe } = await validarMoneda(ClaveMoneda, 1);

		if (!existe) {
			return res.status(404).send({ status: 'Error', message: 'Moneda no encontrada' });
		}

		await Moneda.update({ Descripcion }, { where: { ClaveMoneda } });

		return res.status(200).send({
			status: 'OK',
			message: 'Moneda actualizada correctamente',
			moneda: {
			ClaveMoneda,
			Descripcion,
			}
		});
	} catch (error) {
		Bitacora('updateTypeCoin', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const deleteTypeCoin = async (req, res) => {
	const { ClaveMoneda } = req.body;

	try {
		const { existe } = await validarMoneda(ClaveMoneda, 1);

		if (!existe) {
			return res.status(404).send({ status: 'Error', message: 'Moneda no encontrada' });
		}

		await Moneda.update({ Activo: false }, { where: { ClaveMoneda } });

		return res.status(200).send({ 
			status: 'OK', 
			message: 'Moneda desactivada correctamente' 
		});
	} catch (error) {
		Bitacora('deleteTypeCoin', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

// REGIMEN FISCAL
const findSatRF = async (req, res) => {
	try {
		const data = await vwRegimenFiscal.findAll();
		if (data.length === 0) {
			return res.status(404).send({ status: 'Error', message: 'No existen registros' });
		}
		return res.status(200).send({
			status: 'OK',
			message: 'Lista de regímenes fiscales obtenida correctamente',
			regimenfiscal: data,
		});
	} catch (error) {
		Bitacora('findSatRF', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const createRegimenFiscal = async (req, res) => {
	const satFKBody = req.body;
	try {
		const { existe } = await validarRegimenFiscalPorClave(satFKBody.ClaveRegimenFiscal);

		if (existe) {
			return res.status(409).send({
				status: 'Error',
				message: 'La clave del régimen fiscal ya está en uso',
			});
		}

		await vwRegimenFiscal.create(satFKBody);
		return res.status(200).send({
			status: 'OK',
			message: 'Régimen Fiscal creado correctamente',
			regimenfiscal: satFKBody,
		});
	} catch (error) {
		Bitacora('createRegimenFiscal', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const updateRegimenFiscal = async (req, res) => {
	const satFKBody = req.body;

	try {
		const { existe } = await validarRegimenFiscalPorClave(satFKBody.ClaveRegimenFiscal);

		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'El regimen fiscal no existe',
			});
		}

		await vwRegimenFiscal.update(satFKBody, {
			where: { ClaveRegimenFiscal: satFKBody.ClaveRegimenFiscal },
		});

		return res.status(200).send({
			status: 'OK',
			message: 'Régimen Fiscal actualizado correctamente',
			regimenfiscal: satFKBody,
		});
	} catch (error) {
		Bitacora('updateRegimenFiscal', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const deleteRegimenFiscal = async (req, res) => {
	const { ClaveRegimenFiscal } = req.body;

	try {
		const { existe } = await validarRegimenFiscalActivoPorClave(ClaveRegimenFiscal);

		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'El regimen fiscal no existe',
			});
		}

		await vwRegimenFiscal.update(
			{ Activo: false },
			{ where: { ClaveRegimenFiscal } },
		);

		return res.status(200).send({
			status: 'OK',
			message: 'Régimen Fiscal borrado correctamente',
		});
	} catch (error) {
		Bitacora('deleteRegimenFiscal', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

// CFDI
const findCFDI = async (req, res) => {
	try {
		const data = await vwSatCFDI.findAll({
			where: { Activo: true },
		});

		if (data.length === 0) {
			return res.status(404).send({
				status: 'Error',
				message: 'No existen registros',
			});
		}

		return res.status(200).send({
			status: 'OK',
			message: 'Lista de CFDIs obtenida correctamente',
			cfdi: data,
		});
	} catch (error) {
		Bitacora('findCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const createUsoCFDI = async (req, res) => {
	const cfdiBody = req.body;

	try {
		const { existe } = await validarCFDIPorClave(cfdiBody.ClaveUsoCFDI);

		if (existe) {
			return res
				.status(409)
				.send({ status: 'Error', message: 'La clave del CFDI ya está en uso' });
		}

		await vwSatCFDI.create(cfdiBody);

		return res.status(200).send({
			status: 'OK',
			message: 'CFDI creado correctamente',
			cfdi: cfdiBody,
		});
	} catch (error) {
		Bitacora('createUsoCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const updateUsoCFDI = async (req, res) => {
	const cfdiBody = req.body;

	try {
		const { existe } = await validarCFDIPorClave(cfdiBody.ClaveUsoCFDI);

		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'La clave de uso de CFDi no existe',
			});
		}

		await vwSatCFDI.update(cfdiBody, {
			where: { ClaveUsoCFDI: cfdiBody.ClaveUsoCFDI },
		});

		return res.status(200).send({
			status: 'OK',
			message: 'Se actualizó el uso de CFDi',
			cfdi: cfdiBody,
		});
	} catch (error) {
		Bitacora('updateUsoCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const deleteCFDI = async (req, res) => {
	const { ClaveUsoCFDI } = req.body;

	try {
		const { existe } = await validarCFDIActivoPorClave(ClaveUsoCFDI);

		if (!existe) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'El uso de CFDi no existe' });
		}

		await vwSatCFDI.update({ Activo: false }, { where: { ClaveUsoCFDI } });

		return res
			.status(200)
			.send({ status: 'OK', message: 'CFDI borrado correctamente' });
	} catch (error) {
		Bitacora('deleteCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

// REGIMEN FISCAL CON USOS CFDI
const findRegimenesFiscalesConUsoCFDI = async (req, res) => {
	const { claveRegimenFiscal } = req.query;

	try {
		const regimenConCFDIS = await vwRegimenFiscal.findOne({
			where: { ClaveRegimenFiscal: claveRegimenFiscal, Activo: true },
			include: [
				{
					model: vwSatCFDI,
					where: { Activo: true },
					required: false,
					through: {
						attributes: [],
					},
					as: 'vwSatCFDIs',
				},
			],
		});

		if (!regimenConCFDIS) {
			return res.status(404).send({
				status: 'Error',
				message: `No existen registros para la clave de régimen fiscal ${claveRegimenFiscal}`,
			});
		}

		const cfdisSeleccionados = regimenConCFDIS.vwSatCFDIs.map(cfdi => ({
			ClaveUsoCFDI: cfdi.ClaveUsoCFDI,
			Descripcion: cfdi.Descripcion,
		}));

		return res.status(200).send({
			status: 'OK',
			message: 'Usos de CFDIs obtenidos correctamente',
			regimen: {
				ClaveRegimenFiscal: regimenConCFDIS.ClaveRegimenFiscal,
				Descripcion: regimenConCFDIS.Descripcion,
				cfdis: cfdisSeleccionados,
			},
		});
	} catch (error) {
		Bitacora('findRegimenesFiscalesConUsoCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const linkRegimenesFiscalesConUsoCFDI = async (req, res) => {
	const { claveRegimenFiscal, usosCfdis } = req.body;

	try {
		const { existe } = await validarRegimenFiscalActivoPorClave(claveRegimenFiscal);
		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'La clave del régimen fiscal no existe o no está activa',
			});
		}

		const cfdisValidos = await vwSatCFDI.findAll({
			where: {
				ClaveUsoCFDI: usosCfdis,
				Activo: true,
			},
			attributes: ['ClaveUsoCFDI'],
		});

		if (cfdisValidos.length !== usosCfdis.length) {
			return res.status(404).send({
				status: 'Error',
				message: 'Algunas claves de CFDIs no existen o no están activas',
			});
		}

		const relacionesExistentes = await CFDIRegimen.findAll({
			where: {
				ClaveUsoCFDI: usosCfdis,
				ClaveRegimenFiscal: claveRegimenFiscal,
			},
			attributes: ['ClaveUsoCFDI'],
		});

		const relacionesNuevas = usosCfdis
			.filter(
				cfdi => !relacionesExistentes.some(rel => rel.ClaveUsoCFDI === cfdi),
			)
			.map(cfdi => ({
				ClaveUsoCFDI: cfdi,
				ClaveRegimenFiscal: claveRegimenFiscal,
			}));

		await CFDIRegimen.bulkCreate(relacionesNuevas);

		return res.status(200).send({
			status: 'OK',
			message: 'CFDI relacionado con los regímenes exitosamente',
			...relacionesNuevas,
		});
	} catch (error) {
		Bitacora('linkRegimenesFiscalesConUsoCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error al relacionar el CFDI con los regímenes',
		});
	}
};

const unlinkRegimenesFiscalesConUsoCFDI = async (req, res) => {
	const { claveRegimenFiscal, usosCfdis } = req.body;

	try {
		const { existe } = await validarRegimenFiscalActivoPorClave(claveRegimenFiscal);
		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'La clave del régimen fiscal no existe o no está activa',
			});
		}

		await CFDIRegimen.destroy({
			where: {
				ClaveUsoCFDI: usosCfdis,
				ClaveRegimenFiscal: claveRegimenFiscal,
			},
		});

		return res.status(200).send({
			status: 'OK',
			message: 'CFDI desvinculado de los regímenes exitosamente',
		});
	} catch (error) {
		Bitacora('unlinkRegimenesFiscalesConUsoCFDI', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error al desvincular el CFDI de los regímenes',
		});
	}
};

// USOS CFDI CON REGÍMENES FISCALES
const findCfdiConRegimenesFiscales = async (req, res) => {
	const { claveUsoCFDI } = req.query;

	try {
		const cfdiConRegimenes = await vwSatCFDI.findOne({
			where: { ClaveUsoCFDI: claveUsoCFDI, Activo: true },
			include: [
				{
					model: vwRegimenFiscal,
					where: { Activo: true },
					required: false,
					through: {
						attributes: [],
					},
					as: 'vwSatRegimenFiscals',
				},
			],
		});

		if (!cfdiConRegimenes) {
			return res.status(404).send({
				status: 'Error',
				message: `No existen registros para la clave de uso CFDI ${claveUsoCFDI}`,
			});
		}

		const regimenesSeleccionados = cfdiConRegimenes.vwSatRegimenFiscals.map(
			regimen => ({
				ClaveRegimenFiscal: regimen.ClaveRegimenFiscal,
				Descripcion: regimen.Descripcion,
			}),
		);

		return res.status(200).send({
			status: 'OK',
			message: 'Regímenes obtenidos correctamente',
			cfdi: {
				ClaveUsoCFDI: cfdiConRegimenes.ClaveUsoCFDI,
				Descripcion: cfdiConRegimenes.Descripcion,
				regimenes: regimenesSeleccionados,
			},
		});
	} catch (error) {
		Bitacora('findCfdiConRegimenesFiscales', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error al obtener los regímenes por CFDI',
		});
	}
};

const linkCfdiConRegimenesFiscales = async (req, res) => {
	const { claveUsoCFDI, regimenes } = req.body;

	try {
		const { existe } = await validarCFDIActivoPorClave(claveUsoCFDI);
		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'La clave del uso de CFDI no existe o no está activa',
			});
		}

		const regimenesValidos = await vwRegimenFiscal.findAll({
			where: {
				ClaveRegimenFiscal: regimenes,
				Activo: true,
			},
			attributes: ['ClaveRegimenFiscal'],
		});

		if (regimenesValidos.length !== regimenes.length) {
			return res.status(404).send({
				status: 'Error',
				message: 'Algunas claves de regímenes fiscales no existen o no están activas',
			});
		}

		const relacionesExistentes = await CFDIRegimen.findAll({
			where: {
				ClaveUsoCFDI: claveUsoCFDI,
				ClaveRegimenFiscal: regimenes,
			},
			attributes: ['ClaveRegimenFiscal'],
		});

		const relacionesNuevas = regimenes
			.filter(
				regimen => !relacionesExistentes.some(rel => rel.ClaveRegimenFiscal === regimen),
			)
			.map(regimen => ({
				ClaveUsoCFDI: claveUsoCFDI,
				ClaveRegimenFiscal: regimen,
			}));

		await CFDIRegimen.bulkCreate(relacionesNuevas);

		return res.status(200).send({
			status: 'OK',
			message: 'Regímenes fiscales relacionados con el uso de CFDI exitosamente',
			...relacionesNuevas,
		});
	} catch (error) {
		Bitacora('linkCfdiConRegimenesFiscales', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error al relacionar el uso de CFDI con los regímenes fiscales',
		});
	}
};

const unlinkCfdiConRegimenesFiscales = async (req, res) => {
	const { claveUsoCFDI, regimenes } = req.body;

	try {
		const { existe } = await validarCFDIActivoPorClave(claveUsoCFDI);
		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'La clave del uso de CFDI no existe o no está activa',
			});
		}

		await CFDIRegimen.destroy({
			where: {
				ClaveUsoCFDI: claveUsoCFDI,
				ClaveRegimenFiscal: regimenes,
			},
		});

		return res.status(200).send({
			status: 'OK',
			message: 'Regímenes fiscales desvinculados del uso de CFDI exitosamente',
		});
	} catch (error) {
		Bitacora('unlinkCfdiConRegimenesFiscales', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error al desvincular el uso de CFDI de los regímenes fiscales',
		});
	}
};

// PRODUCT SERVICES
const findProductServicesByCode = async (req, res) => {
	const code = req.params.code;
	try {
		const data = await ProductosServicios.findAll({
			where: { ClaveProductsServices: { [Op.like]: code }, Activo: 1 },
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
	const descripcion = req.params.descripcion;

	try {
		const data = await ProductosServicios.findAll({
			where: { Descripcion: { [Op.like]: `%${descripcion}%` }, Activo: 1 },
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

const findProductServicesByMatchWord = async (req, res) => {
	const { palabra } = req.params;
	try {
		const data = await ProductosServicios.findAll({
			where: { PalabrasSimilares: { [Op.like]: palabra }, Activo: 1 },
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

const createProductServices = async (req, res) => {
	const productServicesBody = req.body;
	try {
		const validateProductServices = await ProductosServicios.findOne({
			where: {
				ClaveProductsServices: productServicesBody.ClaveProductsServices,
				Activo: 1,
			},
		});

		if (validateProductServices) {
			return res
				.status(409)
				.json({ error: 'La clave del producto/servicio ya esta en uso ' });
		}

		await ProductosServicios.create(productServicesBody);
		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio creado' });
	} catch (error) {
		console.error('Error al crear el producto/servicio', error.message);
		return res
			.status(500)
			.json({ error: 'Error al crear el producto/servicio' });
	}
};

const updateProductServices = async (req, res) => {
	const productServicesBody = req.body;
	try {
		const validateProductServices = await ProductosServicios.findOne({
			where: {
				ClaveProductsServices: productServicesBody.ClaveProductsServices,
				Activo: 1,
			},
		});

		if (!validateProductServices) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		const [updated] = await ProductosServicios.update(productServicesBody, {
			where: {
				ClaveProductsServices: productServicesBody.ClaveProductsServices,
				Activo: 1,
			},
		});

		if (!updated) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio actualizado' });
	} catch (error) {
		console.error('Error al actualizar el producto/servicio', error.message);
		return res
			.status(500)
			.json({ error: 'Error al actualizar el producto/servicio' });
	}
};

const deleteProductServices = async (req, res) => {
	const { ClaveProductsServices } = req.body;

	try {
		const product = await ProductosServicios.findOne({
			where: { ClaveProductsServices, Activo: 1 },
		});

		if (!product) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		await ProductosServicios.update(
			{ Activo: false },
			{ where: { ClaveProductsServices } },
		);

		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio borrado' });
	} catch (error) {
		console.error('Error al borrar el producto/servicio', error.message);
		return res
			.status(500)
			.json({ error: 'Error al borrar el producto/servicio' });
	}
};

// UNIT KEYS
const findAllUnitKeys = async (req, res) => {
	const page = Number(req.params.page) || 1;
	const limit = 10;
	const offset = (page - 1) * limit;

	try {
		const { count, rows } = await ClaveUnidad.findAndCountAll({
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
		const data = await ClaveUnidad.findAll({
			where: {
				ClaveUnidadSat: key,
			},
		});

		if (data.length < 1) {
			return res.status(404).json({ error: 'No hay datos disponibles' });
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
		const validateUnitKey = await ClaveUnidad.findOne({
			where: {
				ClaveUnidadSat: unitKeyBody.ClaveUnidadSat,
				Activo: 1,
			},
		});

		if (validateUnitKey) {
			return res
				.status(409)
				.json({ error: 'La clave de unidad ya esta en uso ' });
		}

		await ClaveUnidad.create(unitKeyBody);
		return res
			.status(200)
			.json({ success: true, message: 'Clave de unidad creada' });
	} catch (error) {
		console.error('Error al crear la clave de unidad', error);
		return res.status(500).json({ error: 'Error al crear la clave de unidad' });
	}
};

const updateUnitKey = async (req, res) => {
	const unitKeyBody = req.body;
	try {
		const [updated] = await ClaveUnidad.update(unitKeyBody, {
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
		const unitKey = await ClaveUnidad.findOne({
			where: { ClaveUnidadSat, Activo: 1 },
		});

		if (!unitKey) {
			return res.status(404).json({ error: 'Clave de unidad no encontrada' });
		}

		await ClaveUnidad.update({ Activo: false }, { where: { ClaveUnidadSat } });

		return res
			.status(200)
			.json({ success: true, message: 'Clave de unidad borrada' });
	} catch (error) {
		console.error('Error al borrar la clave de unidad', error);
		return res
			.status(500)
			.json({ error: 'Error al borrar la clave de unidad' });
	}
};

export const methods = {
	getPostalCodes,
	findPostalCodes,
	findCol,
	findColByName,
	paymentMethods,
	getTypeCoin,
	findTypeCoin,
	createTypeCoin,
	updateTypeCoin,
	deleteTypeCoin,
	createRegimenFiscal,
	updateRegimenFiscal,
	deleteRegimenFiscal,
	findSatRF,
	createUsoCFDI,
	updateUsoCFDI,
	deleteCFDI,
	findCFDI,
	findRegimenesFiscalesConUsoCFDI,
	linkCfdiConRegimenesFiscales,
	unlinkCfdiConRegimenesFiscales,
	findCfdiConRegimenesFiscales,
	linkRegimenesFiscalesConUsoCFDI,
	unlinkRegimenesFiscalesConUsoCFDI,
	findProductServicesByCode,
	findProductServicesByDescription,
	findProductServicesByMatchWord,
	createProductServices,
	updateProductServices,
	deleteProductServices,
	findAllUnitKeys,
	findUnitKeysByKey,
	createUnitKey,
	updateUnitKey,
	deleteUnitKey,
};
