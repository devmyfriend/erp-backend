import { Connection as sequelize } from '../database/mariadb.database.js';
import { Op } from 'sequelize';
import { Colonias } from '../models/colonia.model.js';
import { vwRegimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { CFDIRegimen } from '../models/sat.uso.cfdi.regimen.fiscal.model.js';
import { Moneda } from '../models/sat.moneda.js';
import { vwSatCFDI } from '../models/sat.uso.cfdi.model.js';
import { ProductosServicios } from '../models/sat.productos.servicios.model.js';
import { ClaveUnidad } from '../models/sat.clave.unidad.model.js';
import { 
	validarMoneda, 
	validarCFDIActivoPorClave, 
	validarCFDIPorClave,
	validarRegimenFiscalPorClave,
	validarRegimenFiscalActivoPorClave 
} from '../middlewares/finders/index.js'

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
        const validateCoin = await Moneda.findOne({
            where: { ClaveMoneda: coinBody.ClaveMoneda, Activo: 1 },
        });

        if (validateCoin) {
            return res.status(409).json({ error: 'La clave de la moneda ya esta en uso' });
        }

        await Moneda.create(coinBody);

        return res.status(200).json({ success: true, message: 'Moneda creada' });
    } catch (error) {
        console.error('Error al crear la moneda', error);
        return res.status(500).json({ error: 'Error al crear la moneda' });
    }
};

const updateTypeCoin = async (req, res) => {
    const { ClaveMoneda, Descripcion } = req.body;

    try {
        const validateCoin = await validarMoneda(ClaveMoneda, 1, res);
        if (!validateCoin) return;

        const [updated] = await Moneda.update(
            { Descripcion },
            { where: { ClaveMoneda } },
        );

        if (!updated) {
            return res.status(404).json({ error: 'Moneda no encontrada' });
        }

        return res.status(200).json({ success: true, message: 'Moneda actualizada' });
    } catch (error) {
        console.error('Error al actualizar la moneda', error.message);
        return res.status(500).json({ error: 'Error al actualizar la moneda' });
    }
};

const deleteTypeCoin = async (req, res) => {
    const { ClaveMoneda } = req.body;

    try {
        const coin = await validarMoneda(ClaveMoneda, 1, res);
        if (!coin) return;

        await Moneda.update({ Activo: false }, { where: { ClaveMoneda } });

        return res.status(200).json({ success: true, message: 'Moneda borrada' });
    } catch (error) {
        console.error('Error al desactivar la moneda', error.message);
        return res.status(500).json({ error: 'Error al desactivar la moneda' });
    }
};

// REGIMEN FISCAL
const findSatRF = async (req, res) => {
    try {
        const data = await vwRegimenFiscal.findAll();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error al obtener los regímenes fiscales:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createRegimenFiscal = async (req, res) => {
    const satFKBody = req.body;
    try {
        const { existe } = await validarRegimenFiscalPorClave(satFKBody.ClaveRegimenFiscal);

        if (existe) {
            return res.status(409).send({ status: "Error", message: "La clave del régimen fiscal ya está en uso" });
        }

        await vwRegimenFiscal.create(satFKBody);
        return res.status(200).send({ status: "OK", message: "Régimen Fiscal creado correctamente", data: satFKBody });
    } catch (error) {
        console.error('Error al crear régimen fiscal', error.message);
        return res.status(500).send({ errors: "Error al crear régimen fiscal" });
    }
};

const updateRegimenFiscal = async (req, res) => {
    const satFKBody = req.body;

    try {
        const { existe } = await validarRegimenFiscalPorClave(satFKBody.ClaveRegimenFiscal);

        if (!existe) {
            return res.status(404).send({ status: "Error", message: "Régimen Fiscal no encontrado" });
        }

        await vwRegimenFiscal.update(satFKBody, {
            where: { ClaveRegimenFiscal: satFKBody.ClaveRegimenFiscal }
        });

        return res.status(200).send({ status: "OK", message: "Régimen Fiscal actualizado correctamente", data: satFKBody });
    } catch (error) {
        console.error('Error al actualizar régimen fiscal', error.message);
        return res.status(500).send({ errors: "Error al actualizar régimen fiscal" });
    }
};

const deleteRegimenFiscal = async (req, res) => {
    const { ClaveRegimenFiscal } = req.body;

    try {
        const { existe } = await validarRegimenFiscalActivoPorClave(ClaveRegimenFiscal);

        if (!existe) {
            return res.status(404).send({ status: "Error", message: "Régimen Fiscal no encontrado" });
        }

        await vwRegimenFiscal.update({ Activo: false }, { where: { ClaveRegimenFiscal } });

        return res.status(200).send({ status: "OK", message: "Régimen Fiscal borrado correctamente" });
    } catch (error) {
        console.error('Error al borrar régimen fiscal', error.message);
        return res.status(500).send({ errors: "Error al borrar régimen fiscal" });
    }
};

// CFDI
const findCFDI = async (req, res) => {
    try {
        const result = await vwSatCFDI.findAll({
            where: {
                Activo: true
            }
        });
        return res.status(200).send({ status: "OK", message: "Lista de CFDIs obtenida correctamente", data: result });
    } catch (error) {
        console.error('Error al obtener la lista de CFDIs:', error.message);
        return res.status(500).send({ errors: "Error al obtener la lista de CFDIs" });
    }
};

const createUsoCFDI = async (req, res) => {
    const cfdiBody = req.body;

    try {
        const { existe } = await validarCFDIPorClave(cfdiBody.ClaveUsoCFDI);

        if (existe) {
            return res.status(409).send({ status: "Error", message: "La clave del CFDI ya está en uso" });
        }

        await vwSatCFDI.create(cfdiBody);

        return res.status(200).send({ status: "OK", message: "CFDI creado correctamente", data: cfdiBody });
    } catch (error) {
        console.error('Error al crear CFDI', error.message);
        return res.status(500).send({ errors: "Error al crear CFDI" });
    }
};

const updateUsoCFDI = async (req, res) => {
    const cfdiBody = req.body;

    try {
        const { existe } = await validarCFDIPorClave(cfdiBody.ClaveUsoCFDI);

        if (!existe) {
            return res.status(404).send({ status: "Error", message: "CFDI no encontrado" });
        }

        await vwSatCFDI.update(cfdiBody, {
            where: { ClaveUsoCFDI: cfdiBody.ClaveUsoCFDI }
        });

        return res.status(200).send({ status: "OK", message: "CFDI actualizado correctamente", data: cfdiBody });
    } catch (error) {
        console.error('Error al actualizar CFDI', error.message);
        return res.status(500).send({ errors: "Error al actualizar CFDI" });
    }
};

const deleteCFDI = async (req, res) => {
    const { ClaveUsoCFDI } = req.body;

    try {
        const { existe, data: cfdi } = await validarCFDIActivoPorClave(ClaveUsoCFDI);

        if (!existe.existe) 
            return ;

        if (!cfdi.Activo) {
            return res.status(404).send({ status: "Error", message: "El CFDI no existe" });
        }

        await vwSatCFDI.update({ Activo: false }, { where: { ClaveUsoCFDI } });

        return res.status(200).send({ status: "OK", message: "CFDI borrado correctamente" });
    } catch (error) {
        console.error('Error al borrar el CFDI', error.message);
        return res.status(500).send({ errors: "Error al borrar el CFDI" });
    }
};
;

// REGIMEN FISCAL Y CFDI
const getRegimenByCfdi = async (req, res) => {
    const { claveUsoCFDI } = req.params;

    try {
        const results = await sequelize.query(
            'CALL sp_sat_get_cfdi_to_regimen(:claveUsoCFDI)',
            {
                replacements: { claveUsoCFDI },
                type: sequelize.QueryTypes.RAW
            }
        );

        const regimenesSeleccionados = Array.isArray(results[0]) ? results[0] : [];
        const regimenesDisponibles = Array.isArray(results[1]) ? results[1] : [];

        return res.status(200).json({
            regimenesSeleccionados,
            regimenesDisponibles
        });
    } catch (error) {
        console.error('Error al obtener los regímenes por CFDI', error);
        return res.status(500).json({ error: 'Error al obtener los regímenes por CFDI' });
    }
};

const createSatRegimenCfdi = async (req, res) => {
	const { regimen, cfdi } = req.body;
	const { ClaveRegimenFiscal } = regimen;
  
	try {
	  const regimenEncontrado = await vwRegimenFiscal.findOne({
		where: { ClaveRegimenFiscal, Activo: 1 },
	  });
  
	  if (!regimenEncontrado) {
		return res.status(404).json({ error: 'Régimen Fiscal no encontrado' });
	  }
  
	  for (const cfdiItem of cfdi) {
		const { ClaveUsoCFDI } = cfdiItem;
		const cfdiEncontrado = await vwSatCFDI.findOne({
		  where: { ClaveUsoCFDI }
		});
  
		if (!cfdiEncontrado) {
		  return res.status(400).json({ error: `CFDI ${ClaveUsoCFDI} no encontrado` });
		}
  
		const [result] = await sequelize.query(
		  'CALL sp_sat_cfdi_regimen(:claveRegimen, :claveUsoCFDI)',
		  {
			replacements: {
			  claveRegimen: ClaveRegimenFiscal,
			  claveUsoCFDI: ClaveUsoCFDI
			},
			type: sequelize.QueryTypes.SELECT
		  }
		);
  
		if (result[0].status === 'exists') {
		  return res.status(200).json({ success: false, message: result[0].message });
		}
	  }
  
	  return res.status(200).json({ success: true, message: 'CFDIs enlazados correctamente' });
	} catch (error) {
	  console.error('Error al enlazar Régimen Fiscal y CFDI', error);
	  return res.status(500).json({ error: 'Error al enlazar Régimen Fiscal y CFDI' });
	}
};
  
const deleteSatRegimenCfdi = async (req, res) => {
	const { regimen, cfdi } = req.body;
	const { ClaveRegimenFiscal } = regimen;
  
	try {
	  const regimenEncontrado = await vwRegimenFiscal.findOne({
		where: { ClaveRegimenFiscal, Activo: 1 },
	  });
  
	  if (!regimenEncontrado) {
		return res.status(404).json({ error: 'Régimen Fiscal no encontrado' });
	  }
  
	  for (const cfdiItem of cfdi) {
		const { ClaveUsoCFDI } = cfdiItem;
		const cfdiEncontrado = await vwSatCFDI.findOne({
		  where: { ClaveUsoCFDI }
		});
  
		if (!cfdiEncontrado) {
		  return res.status(400).json({ error: `CFDI ${ClaveUsoCFDI} no encontrado` });
		}
  
		await CFDIRegimen.destroy({
		  where: {
			ClaveRegimenFiscal,
			ClaveUsoCFDI
		  }
		});
	  }
  
	  return res.status(200).json({ success: true, message: 'Régimen Fiscal y CFDIs desvinculados con éxito' });
	} catch (error) {
	  console.error('Error al desvincular Régimen Fiscal y CFDI', error);
	  return res.status(500).json({ error: 'Error al desvincular Régimen Fiscal y CFDI' });
	}
};

const linkCfdiToRegimen = async (req, res) => {
    const { claveUsoCFDI, regimenes } = req.body;

    try {
        const responses = [];
        for (const claveRegimenFiscal of regimenes) {
            const [result] = await sequelize.query(
                'CALL sp_sat_post_cfdi_to_regimen(:claveUsoCFDI, :claveRegimenFiscal)',
                {
                    replacements: { 
                        claveUsoCFDI,
                        claveRegimenFiscal 
                    },
                    type: sequelize.QueryTypes.SELECT
                }
            );
            console.log(`Result for regimen ${claveRegimenFiscal}:`, result);  // Agregar registro para depurar
            responses.push(result[0]);
        }
        return res.status(200).json({ success: true, message: 'CFDI relacionado con los regímenes exitosamente', results: responses });
    } catch (error) {
        console.error('Error al relacionar el CFDI con los regímenes', error);
        return res.status(500).json({ error: 'Error al relacionar el CFDI con los regímenes' });
    }
};

const unlinkCfdiFromRegimen = async (req, res) => {
	const { claveUsoCFDI, regimenes } = req.body;
  
	try {
	  for (const claveRegimenFiscal of regimenes) {
		await CFDIRegimen.destroy({
		  where: {
			ClaveUsoCFDI: claveUsoCFDI,
			ClaveRegimenFiscal: claveRegimenFiscal
		  }
		});
	  }
	  return res.status(200).json({ success: true, message: 'CFDI desvinculado de los regímenes exitosamente' });
	} catch (error) {
	  console.error('Error al desvincular el CFDI de los regímenes', error);
	  return res.status(500).json({ error: 'Error al desvincular el CFDI de los regímenes' });
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
	createSatRegimenCfdi, 
	deleteSatRegimenCfdi,
	getRegimenByCfdi,
	linkCfdiToRegimen,
	unlinkCfdiFromRegimen,
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
