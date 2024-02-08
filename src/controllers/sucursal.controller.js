import { Connection as sequelize } from '../database/mariadb.database.js';
import { Sucursal } from '../models/sucursal.model.js';
import { SucursalDomicilio } from '../models/sucursal.domicilio.model.js';
import { Domicilio } from '../models/domicilios.model.js';
import { EntidadNegocio } from '../models/empresa.model.js';
import { EmpresaSucursal } from '../models/empresa.sucursalmodel.js';

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

		if (sucursales.length < 1) {

			return res.status(404).json({
				status: 404,
				message: 'La empresa no tiene sucursales',
			});
		}

		res.json(sucursales);
	} catch (error) {
		console.error('Error al obtener las sucursales:', error.message);
		res.status(500).json({ error: 'Error al obtener las sucursales' });
	}
};

const crearSucursal = async (req, res) => {
	const { sucursal, datos } = req.body;

	const empresa =  await EntidadNegocio.findOne({ where:{
		EntidadNegocioId: sucursal[0].EntidadNegocioId
	}})

	if(!empresa){
		return res.status(404).json({
			status: 404,
			message: 'No se ha encontrado la empresa',
		});
	}

	try {
		const validarNombre = await Sucursal.findOne({
			where: {
				Nombre: sucursal[0].Nombre,
			},
		});

		if (validarNombre) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre de la sucursal ya esta en uso',
			});
		}

		const crearSucursal = await Sucursal.create(sucursal[0]);

		const sucursalDatos = await Domicilio.create({
			CreadoPor: sucursal[0].CreadoPor,
			...datos[0],
		});

		await SucursalDomicilio.create({
			SucursalId: crearSucursal._previousDataValues.SucursalId,
			DomicilioId: sucursalDatos._previousDataValues.DomicilioId,
		});

		await EmpresaSucursal.create({
			SucursalId: crearSucursal._previousDataValues.SucursalId,
			EntidadNegocioId: sucursal[0].EntidadNegocioId
		})


		res.status(200).json({
			status: 200,
			message: 'Se ha creado la sucursal ',
			sucursalId: crearSucursal.SucursalId
		});
	} catch (error) {
		console.error('Error al crear la sucursal:', error);
		res.status(500).json({ error: 'Error al crear la sucursal' });
	}
};

const editarSucursal = async (req, res) => {
	const { sucursal, datos } = req.body;

	try {
		const validarsucursal = await Sucursal.findOne({
			where: {
				SucursalId: sucursal[0].SucursalId,
				Borrado: 0,
			},
		});

		if (!validarsucursal) {
			return res.status(404).json({
				status: 404,
				error: 'No se ha encontrado la sucursal solicitada',
			});
		}

		const validarNombre = await Sucursal.findOne({
			where: {
				Nombre: sucursal[0].Nombre ? sucursal[0].Nombre : 'nill',
			},
		});

		if (validarNombre) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre de la sucursal ya esta en uso',
			});
		}

		const sucursalActual = await Sucursal.findByPk(sucursal[0].SucursalId);

		const actualizacionSucursal = {
			...sucursalActual.dataValues,
			...sucursal[0],
			...{ ActualizadoPor: sucursal[0].ActualizadoPor },
		};

		const buscarDomicilio = await SucursalDomicilio.findOne({
			where: {
				SucursalId: sucursal[0].SucursalId,
			},
		});

		if (!buscarDomicilio) {
			return res.status(400).json({
				status: 400,
				error:
					'El domicilio nos fue asignado correctamete, contacta al administrador',
			});
		}

		await Sucursal.update(actualizacionSucursal, {
			where: {
				SucursalId: actualizacionSucursal.SucursalId,
			},
		});

		const domicilioActual = await Domicilio.findByPk(
			buscarDomicilio.dataValues.DomicilioId,
		);

		const actualizacionDomicilio = {
			...domicilioActual.dataValues,
			...datos[0],
			...{ ActaulizadoPor: sucursal[0].ActualizadoPor },
		};

		await Domicilio.update(actualizacionDomicilio, {
			where: {
				DomicilioId: actualizacionDomicilio.DomicilioId,
			},
		});
		return res.status(200).json({
			message: 'Sucursal actualizada',
		});
	} catch (error) {
		console.error('Error al crear la sucursal:', error);
		res.status(500).json({ error: 'Error al actualizar la sucursal' });
	}
};

export const desactivarSucursal = async (req, res) => {
	try {
		const sucursal = await Sucursal.findOne({
			where: {
				SucursalId: req.body.SucursalId,
				Borrado: 0,
			},
		});

		if (!sucursal) {
			console.log('hola');
			return res
				.status(404)
				.json({ starus: 404, message: 'La sucursal no existe' });
		}

		sucursal.Borrado = true;
		sucursal.BorradoPor = req.body.BorradoPor;

		await sucursal.save();
		res
			.status(200)
			.json({ message: 'Sucursal desactivada: ' + sucursal.SucursalId });
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

export const methods = {
	obtenerSucursales,
	crearSucursal,
	desactivarSucursal,
	editarSucursal,
};
