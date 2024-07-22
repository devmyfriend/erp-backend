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
	validarRegimenFiscalActivoPorClave,
	validarRegimenFiscalConUsoCFDIPorClave
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
            return res.status(409).send({ status: "Error", message: "La clave de la moneda ya está en uso" });
        }

        await Moneda.create(coinBody);

        return res.status(200).send({ status: "OK", message: "Moneda creada correctamente", data: coinBody });
    } catch (error) {
        console.error('Error al crear la moneda:', error.message);
        return res.status(500).send({ status: "Error", message: "Error al crear la moneda", Error: error });
    }
};

const updateTypeCoin = async (req, res) => {
    const { ClaveMoneda, Descripcion } = req.body;

    try {
        const { existe } = await validarMoneda(ClaveMoneda, 1);

        if (!existe) {
            return res.status(404).send({ status: "Error", message: "Moneda no encontrada" });
        }

        await Moneda.update({ Descripcion }, { where: { ClaveMoneda } });

        return res.status(200).send({ status: "OK", message: "Moneda actualizada correctamente", data: { ClaveMoneda, Descripcion } });
    } catch (error) {
        console.error('Error al actualizar la moneda:', error.message);
        return res.status(500).send({ status: "Error", message: "Error al actualizar la moneda", Error: error });
    }
};

const deleteTypeCoin = async (req, res) => {
    const { ClaveMoneda } = req.body;

    try {
        const { existe } = await validarMoneda(ClaveMoneda, 1);

        if (!existe) {
            return res.status(404).send({ status: "Error", message: "Moneda no encontrada" });
        }

        await Moneda.update({ Activo: false }, { where: { ClaveMoneda } });

        return res.status(200).send({ status: "OK", message: "Moneda desactivada correctamente" });
    } catch (error) {
        console.error('Error al desactivar la moneda:', error.message);
        return res.status(500).send({ status: "Error", message: "Error al desactivar la moneda", Error: error });
    }
};

// REGIMEN FISCAL
const findSatRF = async (req, res) => {
	try {
		const data = await vwRegimenFiscal.findAll();
		if (data.length === 0) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'No existen registros' });
		}
		return res.status(200).send({
			status: 'OK',
			message: 'Lista de regímenes fiscales obtenida correctamente',
			data,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al obtener la lista de regímenes fiscales',
			Error: error,
		});
	}
};

const createRegimenFiscal = async (req, res) => {
	const satFKBody = req.body;
	try {
		const { existe } = await validarRegimenFiscalPorClave(
			satFKBody.ClaveRegimenFiscal,
		);

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
			data: satFKBody,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al crear el regimen fiscal',
			Error: error,
		});
	}
};

const updateRegimenFiscal = async (req, res) => {
	const satFKBody = req.body;

	try {
		const { existe } = await validarRegimenFiscalPorClave(
			satFKBody.ClaveRegimenFiscal,
		);

		if (!existe) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'El regimen fiscal no existe' });
		}

		await vwRegimenFiscal.update(satFKBody, {
			where: { ClaveRegimenFiscal: satFKBody.ClaveRegimenFiscal },
		});

		return res.status(200).send({
			status: 'OK',
			message: 'Régimen Fiscal actualizado correctamente',
			data: satFKBody,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al actualizar el regimen fiscal',
			Error: error,
		});
	}
};

const deleteRegimenFiscal = async (req, res) => {
	const { ClaveRegimenFiscal } = req.body;

	try {
		const { existe } =
			await validarRegimenFiscalActivoPorClave(ClaveRegimenFiscal);

		if (!existe) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'El regimen fiscal no existe' });
		}

		await vwRegimenFiscal.update(
			{ Activo: false },
			{ where: { ClaveRegimenFiscal } },
		);

		return res
			.status(200)
			.send({ status: 'OK', message: 'Régimen Fiscal borrado correctamente' });
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al eliminar el regimen fiscal',
			Error: error,
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
			return res
				.status(404)
				.send({ status: 'Error', message: 'No existen registros' });
		}
		return res.status(200).send({
			status: 'OK',
			message: 'Lista de CFDIs obtenida correctamente',
			data,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al obtener la lista de usos de CFDi',
			Error: error,
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
			data: cfdiBody,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al crear el uso de CFDi',
			Error: error,
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
			data: cfdiBody,
		});
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al actualizar el uso de CFDi',
			Error: error,
		});
	}
};

const deleteCFDI = async (req, res) => {
	const { ClaveUsoCFDI } = req.body;

	try {
		const { existe, data: cfdi } =
			await validarCFDIActivoPorClave(ClaveUsoCFDI);

		if (!existe.existe) return;

		if (!cfdi.Activo) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'El CFDI no existe' });
		}

		await vwSatCFDI.update({ Activo: false }, { where: { ClaveUsoCFDI } });

		return res
			.status(200)
			.send({ status: 'OK', message: 'CFDI borrado correctamente' });
	} catch (error) {
		return res.status(500).send({
			status: 'Error',
			message: 'Error al eliminar el uso de CFDi',
			Error: error,
		});
	}
};

// REGIMEN FISCAL CON USOS CFDI
export const findRegimenesFiscalesConUsoCFDI = async (req, res) => {
    const { claveRegimenFiscal } = req.query;

    try {
        const regimenConCFDIS = await vwRegimenFiscal.findOne({
            where: { ClaveRegimenFiscal: claveRegimenFiscal },
            include: [
                {
                    model: vwSatCFDI,
                    where: { Activo: true },
                    through: {
                        attributes: []
                    },
                    as: 'vwSatCFDIs'
                }
            ]
        });

        if (!regimenConCFDIS) {
            return res.status(404).send({
                status: 'Error',
                message: `No existen registros para la clave de régimen fiscal ${claveRegimenFiscal}`,
            });
        }

        const cfdisSeleccionados = regimenConCFDIS.vwSatCFDIs.map((cfdi) => ({
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
        console.error('Error al obtener los Usos de CFDIs por régimen fiscal', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al obtener los Usos de CFDIs por régimen fiscal',
            error: error.message,
        });
    }
};

export const linkRegimenesFiscalesConUsoCFDI = async (req, res) => {
    const { claveRegimenFiscal, usosCfdis } = req.body;

    try {
        const { existe: regimenExiste } = await validarRegimenFiscalActivoPorClave(claveRegimenFiscal);
        if (!regimenExiste) {
            return res.status(404).send({
                status: 'Error',
                message: 'La clave del régimen fiscal no existe o no está activa',
            });
        }

        const responses = [];

        for (const claveUsoCFDI of usosCfdis) {
            const { existe: cfdiExiste } = await validarCFDIActivoPorClave(claveUsoCFDI);
            if (!cfdiExiste) {
                return res.status(404).send({
                    status: 'Error',
                    message: `La clave del CFDI ${claveUsoCFDI} no existe o no está activa`,
                });
            }

            const { existe: relacionExiste } = await validarRegimenFiscalConUsoCFDIPorClave(claveRegimenFiscal, claveUsoCFDI);
            if (relacionExiste) {
                return res.status(409).send({
                    status: 'Error',
                    message: `La relación entre el régimen fiscal ${claveRegimenFiscal} y el CFDI ${claveUsoCFDI} ya existe`,
                });
            }

            const [result] = await CFDIRegimen.findOrCreate({
                where: { ClaveUsoCFDI: claveUsoCFDI, ClaveRegimenFiscal: claveRegimenFiscal }
            });
            responses.push(result);
        }

        return res.status(200).send({
            status: 'OK',
            message: 'CFDI relacionado con los regímenes exitosamente',
            results: responses,
        });
    } catch (error) {
        console.error('Error al relacionar el CFDI con los regímenes', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al relacionar el CFDI con los regímenes',
            error: error.message,
        });
    }
};

export const unlinkRegimenesFiscalesConUsoCFDI = async (req, res) => {
    const { claveRegimenFiscal, usosCfdis } = req.body;

    try {
        const { existe: regimenExiste } = await validarRegimenFiscalActivoPorClave(claveRegimenFiscal);
        if (!regimenExiste) {
            return res.status(404).send({
                status: 'Error',
                message: 'La clave del régimen fiscal no existe o no está activa',
            });
        }

        for (const claveUsoCFDI of usosCfdis) {
            const { existe: cfdiExiste } = await validarCFDIActivoPorClave(claveUsoCFDI);
            if (!cfdiExiste) {
                return res.status(404).send({
                    status: 'Error',
                    message: `La clave del CFDI ${claveUsoCFDI} no existe o no está activa`,
                });
            }

            await CFDIRegimen.destroy({
                where: {
                    ClaveUsoCFDI: claveUsoCFDI,
                    ClaveRegimenFiscal: claveRegimenFiscal,
                },
            });
        }

        return res.status(200).send({
            status: 'OK',
            message: 'CFDI desvinculado de los regímenes exitosamente',
        });
    } catch (error) {
        console.error('Error al desvincular el CFDI de los regímenes', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al desvincular el CFDI de los regímenes',
            error: error.message,
        });
    }
};

// USOS CFDI CON REGÍMENES FISCALES
export const findCfdiConRegimenesFiscales = async (req, res) => {
    const { claveUsoCFDI } = req.query;

    try {
        const cfdiConRegimenes = await vwSatCFDI.findOne({
            where: { ClaveUsoCFDI: claveUsoCFDI },
            include: [
                {
                    model: vwRegimenFiscal,
                    where: { Activo: 1 },
                    through: {
                        attributes: []
                    },
                    as: 'vwSatRegimenFiscals'
                }
            ]
        });

        if (!cfdiConRegimenes) {
            return res.status(404).send({
                status: 'Error',
                message: `No existen registros para la clave de uso de CFDI ${claveUsoCFDI}`,
            });
        }

        const regimenesSeleccionados = cfdiConRegimenes.vwSatRegimenFiscals.map((regimen) => ({
            ClaveRegimenFiscal: regimen.ClaveRegimenFiscal,
            Descripcion: regimen.Descripcion,
        }));

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
        console.error('Error al obtener los regímenes por CFDI', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al obtener los regímenes por CFDI',
            error: error.message,
        });
    }
};

export const linkCfdiConRegimenesFiscales = async (req, res) => {
    const { claveUsoCFDI, regimenes } = req.body;

    try {
        const { existe: cfdiExiste } = await validarCFDIActivoPorClave(claveUsoCFDI);
        if (!cfdiExiste) {
            return res.status(404).send({
                status: 'Error',
                message: 'La clave del uso de CFDI no existe o no está activa',
            });
        }

        const responses = [];

        for (const claveRegimenFiscal of regimenes) {
            const { existe: regimenExiste } = await validarRegimenFiscalActivoPorClave(claveRegimenFiscal);
            if (!regimenExiste) {
                return res.status(404).send({
                    status: 'Error',
                    message: `La clave del régimen fiscal ${claveRegimenFiscal} no existe o no está activa`,
                });
            }

            const { existe: relacionExiste } = await validarRegimenFiscalConUsoCFDIPorClave(claveRegimenFiscal, claveUsoCFDI);
            if (relacionExiste) {
                return res.status(409).send({
                    status: 'Error',
                    message: `La relación entre el uso de CFDI ${claveUsoCFDI} y el régimen fiscal ${claveRegimenFiscal} ya existe`,
                });
            }

            const [result] = await CFDIRegimen.findOrCreate({
                where: { ClaveUsoCFDI: claveUsoCFDI, ClaveRegimenFiscal: claveRegimenFiscal }
            });
            responses.push(result);
        }

        return res.status(200).send({
            status: 'OK',
            message: 'Regímenes fiscales relacionados con el uso de CFDI exitosamente',
            results: responses,
        });
    } catch (error) {
        console.error('Error al relacionar el uso de CFDI con los regímenes fiscales', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al relacionar el uso de CFDI con los regímenes fiscales',
            error: error.message,
        });
    }
};

export const unlinkCfdiConRegimenesFiscales = async (req, res) => {
    const { claveUsoCFDI, regimenes } = req.body;

    try {
        const { existe: cfdiExiste } = await validarCFDIActivoPorClave(claveUsoCFDI);
        if (!cfdiExiste) {
            return res.status(404).send({
                status: 'Error',
                message: 'La clave del uso de CFDI no existe o no está activa',
            });
        }

        for (const claveRegimenFiscal of regimenes) {
            const { existe: regimenExiste } = await validarRegimenFiscalActivoPorClave(claveRegimenFiscal);
            if (!regimenExiste) {
                return res.status(404).send({
                    status: 'Error',
                    message: `La clave del régimen fiscal ${claveRegimenFiscal} no existe o no está activa`,
                });
            }

            await CFDIRegimen.destroy({
                where: {
                    ClaveUsoCFDI: claveUsoCFDI,
                    ClaveRegimenFiscal: claveRegimenFiscal,
                },
            });
        }

        return res.status(200).send({
            status: 'OK',
            message: 'Regímenes fiscales desvinculados del uso de CFDI exitosamente',
        });
    } catch (error) {
        console.error('Error al desvincular el uso de CFDI de los regímenes fiscales', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al desvincular el uso de CFDI de los regímenes fiscales',
            error: error.message,
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
