import * as finders from '../middlewares/finders/index.js';
import { OwnTax } from '../models/impuesto.propio.model.js';
import { Connection as sequelize } from '../database/mariadb.database.js';

const findAll = async (req, res) => {
	try {
		const data = await sequelize.query('CALL sp_impuesto_propio_nombre()', {
			type: sequelize.QueryTypes.RAW,
		});

		return res.status(200).json(data);
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

const findByName = async (req, res) => {
	const name = req.body.NombreImpuesto;
	try {
		const data = await sequelize.query('CALL sp_impuesto_propio_nombre()', {
			type: sequelize.QueryTypes.RAW,
		});
		const taxFound = data.filter(tax => tax.NombreImpuesto.toLowerCase().includes(name.toLowerCase()));
		
		console.log('La long es: ' + JSON.stringify(taxFound));
		if (taxFound.length === 0) {
			return res.status(404).json({
				status: 404,
				error: 'No se encontraron valores',
			});
		}

		return res
			.status(200)
			.json({ message: 'Impuestos encontrados', response: taxFound });
	} catch (error) {
		console.error(
			'Error al obtener los datos del impuesto propio',
			error.message,
		);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};
/* const findByName = async (req, res) => {
	const name = req.body.NombreImpuesto;
	try {
		const data = await finders.findAllOwnTaxByName(name);
		if (!data.exist) {
			return res.status(404).json({
				status: 404,
				error: 'No se encontraron valores',
			});
		}

		return res
			.status(200)
			.json({ message: 'Impuestos encontrados', response: data.data });
	} catch (error) {
		console.error(
			'Error al obtener los datos del impuesto propio',
			error.message,
		);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
}; */

const create = async (req, res) => {
	try {
		const data = req.body;

		const taxNameFound = await finders.findAllOwnTaxByName(data.NombreImpuesto);
		if (taxNameFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El nombre del impuesto propio ya existe',
			});
		}

		const taxSATFound = await finders.findTaxById(data.ClaveImpuesto);
		if (!taxSATFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto SAT no existe',
			});
		}

		const newOwnTax = await OwnTax.create(data);
		return res
			.status(200)
			.json({
				message: 'Impuesto propio creado correctamente',
				cfgImpuestoId: newOwnTax.dataValues.cfgImpuestoId,
			});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

const updateById = async (req, res) => {
	try {
		const data = req.body;

		const taxFound = await finders.findOwnTaxById(data.cfgImpuestoId);
		if (!taxFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto propio no existe',
			});
		}

		const taxNameFound = await finders.findAllOwnTaxByName(data.NombreImpuesto);

		if (taxNameFound.exist && taxNameFound.data[0].cfgImpuestoId !== data.cfgImpuestoId) 
		{
			console.log('taxNameFound.data.cfgImpuestoId: ' + JSON.stringify(taxNameFound.data[0]) + ' y el recibido es: ' + data.cfgImpuestoId);
			return res.status(404).json({
				status: 404,
				error: 'El nombre del impuesto propio ya existe',
			});
		}
		const taxSATFound = await finders.findTaxById(data.ClaveImpuesto);
		if (!taxSATFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto SAT no existe',
			});
		}

		await OwnTax.update(
			Object.assign(data, {
				ActualizadoEn: new Date(),
			}),
			{
				where: {
					cfgImpuestoId: data.cfgImpuestoId,
				},
			},
		);

		return res
			.status(200)
			.json({ message: 'Impuesto propio actualizado correctamente' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

const deleteById = async (req, res) => {
	try {
		const { cfgImpuestoId, BorradoPor } = req.body;

		const taxFound = await finders.findOwnTaxById(cfgImpuestoId);
		if (!taxFound.exist) {
			return res.status(404).json({
				status: 404,
				error: 'El impuesto propio no existe',
			});
		}

		await OwnTax.update(
			{
				Borrado: 1,
				BorradoEn: new Date(),
				BorradoPor,
			},
			{
				where: {
					cfgImpuestoId,
				},
			},
		);

		return res
			.status(200)
			.json({ message: 'Impuesto propio eliminado correctamente' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: 500,
			error: 'Error interno del servidor',
		});
	}
};

export const methods = {
	findAll,
	findByName,
	create,
	updateById,
	deleteById,
};
