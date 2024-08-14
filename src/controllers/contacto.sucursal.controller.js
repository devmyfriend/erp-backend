//import { Contacto } from '../models/contacto.model.js';

//import { ContactoSucursal } from '../models/contacto.sucursal.model.js';
import { Bitacora } from '../helpers/logs/log.js';
import {
	Contacto,
	ContactoSucursal,
	vwContactoPorSucursal,
	ContactoCorreo,
	ContactoTelefono,
	Email,
	Telefono,
	vwContactoTelefono,
	vwContactoEmail,
} from '../models/index.js';
import { buscarItem, buscarItemPorId } from '../middlewares/finders/index.js';
import { insertarRegistro } from '../helpers/index.js';
const obtenerContactos = async (req, res) => {
	try {
		const idSucursal = req.params.id;

		const contactos = await vwContactoPorSucursal.findAll({
			where: { SucursalId: idSucursal },
		});
	
		if (!contactos) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'No hay datos disponibles' });
		}
		

		res.status(200).send({
			status: 'Ok',
			message: 'Datos obtenidos',
			contactos: contactos,
		});
	} catch (error) {
		console.error('Error al obtener contactos:', error.message);
		Bitacora('obtenerContactos',error)
		res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al obtener contactos',
				Error: error,
			});
	}
};

const buscarContacto = async (req, res) => {
	try {
		const data = req.body;

		const result = await vwContactoPorSucursal.findAll({
			where: {
				SucursalId: data.SucursalId,
				Nombres: {
					[Op.like]: `%${data.Nombre}%`,
				},
			},
		});

		if (result.length < 1) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'No hay datos disponibles' });
		}

		res.status(200).send({
			status: 'Ok',
			message: 'Datos obtenidos',
			contacto: result,
		});
	} catch (error) {
		console.error('Error al obtener datos de contacto:', error.message);
		Bitacora('buscarContacto',error)
		res.status(500).send({
			status: 'Error',
			message: 'Error al obtener datos de contacto',
			Error: error,
		});
	}
};

const obtenerDatosContacto = async (req, res) => {
	try {
		const idContacto = req.params.id;

		const tel = await buscarItem(vwContactoTelefono, {
			ContactoId: idContacto,
		});
		const email = await buscarItem(vwContactoEmail, { ContactoId: idContacto });

		const datos = {
			email: email,
			telefono: tel,
		};

		if (!datos) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'No hay datos disponibles' });
		}
		res.status(200).send({
			status: 'Ok',
			message: 'Datos obtenidos',
			contacto: datos,
		});
	} catch (error) {
		console.error('Error al obtener datos de contacto:', error.message);
		obtenerContactos('obtenerDatosContacto',error)
		res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al obtener datos de contacto',
				Error: error,
			});
	}
};

const crearContacto = async (req, res) => {
	const sucursalId = req.params.id;

	try {
		const data = req.body;
		const contactoCreado = await Contacto.create(data);

		await ContactoSucursal.create({
			ContactoId: contactoCreado.dataValues.ContactoId,
			SucursalId: sucursalId,
		});
		res.status(201).send({ status: 'Ok', contacto: contactoCreado.toJSON() });
	} catch (error) {
		console.error('Error al crear contacto:', error.message);
		Bitacora('crearContacto',error)
		res
			.status(500)
			.send({
				status: 'Error',
				messager: 'Error al crear al contacto',
				Error: error,
			});
	}
};

const agregarDetalleContacto = async (req, res) => {
	try {
		const data = req.body;

		const contacto = await buscarItemPorId(Contacto, data.ContactoId);

		if (!contacto) {
			return res
				.status(404)
				.json({ status: 'Error', message: 'Contacto no encontrado' });
		}

		const correosCreados = await insertarRegistro(
			data.Correos.map(correo => ({ Email: correo.correo })),

			Email,
			ContactoCorreo,
			'ContactoId',
			data.ContactoId,
			data.CreadoPor,
		);
		const telefonosCreados = await insertarRegistro(
			data.Telefonos.map(telefono => ({ NumeroTelefonico: telefono.telefono })),

			Telefono,
			ContactoTelefono,
			'ContactoId',

			data.ContactoId,
			data.CreadoPor,
		);

		const datos = {
			correos: correosCreados.map(correo => correo.toJSON()),
			telefonos: telefonosCreados.map(telefono => telefono.toJSON()),
		};

		res.status(201).send({
			status: 'Ok',
			message: 'Datos agregados correctamente',
			contacto: datos,
		});
	} catch (error) {
		console.error('Error al agregar detalles de contacto:', error.message);
		Bitacora('agregarDetalleContacto',error)
		return res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al agregar detalles de contacto',
				Error: error,
			});
	}
};

const editarContacto = async (req, res) => {
	try {
		const data = req.body;

		const { ContactoId, ...actualizacion } = data;

		const contacto = await buscarItemPorId(Contacto, ContactoId);

		if (!contacto) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'Contacto no encontrado' });
		}

		await contacto.update(actualizacion);

		console.log('Contacto editado con éxito');
		return res
			.status(200)
			.send({
				status: 'Ok',
				message: 'Datos actualizados correctamente',
				contacto: contacto.toJSON(),
			});
	} catch (error) {
		console.error('Error al editar contacto:', error.message);
		Bitacora('editarContacto',error)
		res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al editar contacto',
				Error: error,
			});
	}
};

const desactivarContacto = async (req, res) => {
	try {
		const data = req.body;

		const contacto = await buscarItemPorId(Contacto, data.ContactoId);

		if (!contacto) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'Contacto no encontrado' });
		}

		contacto.Borrado = true;
		contacto.BorradoPor = data.BorradoPor;

		await contacto.save();

		console.log('Contacto desactivado con éxito');

		return res
			.status(200)
			.send({
				status: 'Ok',
				message: 'Contacto desactivado ',
				contacto: data.ContactoId,
			});
	} catch (error) {

		console.error('Error al desactivar contacto:', error.message);
		Bitacora('desactivarContacto',error)
		res
			.status(500)
			.send({
				status: 'Ok',
				message: 'Error al desactivar contacto',
				Error: error,
			});
	}
};

const crearCorreo = async (req, res) => {
	try {
		const data = req.body;
		const ContactoId = req.body.ContactoId;
		const contacto = await buscarItemPorId(Contacto, ContactoId);

		if (!contacto) {
			return res
				.status(404)
				.send({ status: 'Ok', message: 'Contacto no encontrado' });
		}
		//formatea correo para utilizar la funcion insertarRegistro
		let correos = [
			{
				correo: data.Email,
			},
		];

		const correosCreados = await insertarRegistro(
			correos.map(correo => ({ Email: correo.correo })),
			Email,
			ContactoCorreo,
			'ContactoId',
			data.ContactoId,
			data.CreadoPor,
		);

		res
			.status(201)
			.send({ status: 'Ok', message: 'Correo creado', correo: correosCreados });
	} catch (error) {
		console.error('Error al crear correo:', error.message);
		Bitacora('crearCorreo',error)
		return res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al crear correo',
				Error: error,
			});
	}
};

const editarCorreo = async (req, res) => {
	try {
		const data = req.body;

		const { EmailId, ...actualizacion } = data;

		const correo = await buscarItemPorId(Email, EmailId);

		if (!correo) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'Correo no encontrado' });
		}

		await correo.update(actualizacion);

		console.log('Correo editado con éxito');

		return res
			.status(200)
			.send({ status: 'Ok', message: 'Correo actualizado', correo: data });
	} catch (error) {
		console.error('Error al editar el correo:', error.message);
		Bitacora('editarCorreo',error)
		return res
			.status(500)
			.send({ status: 'Ok', message: 'Error al editar correo', Error: error });
	}
};

const desactivarCorreo = async (req, res) => {
	try {
		const data = req.body;

		const correo = await buscarItemPorId(Email, data.EmailId);

		if (!correo) {
			return res
				.status(404)
				.send({ status: 'Ok', message: 'Correo no encontrado' });
		}

		correo.Borrado = true;
		correo.BorradoPor = data.BorradoPor;

		await correo.save();

		console.log('Correo desactivado con éxito');

		return res
			.status(200)
			.json({
				status: 'Ok',
				message: 'Correo desactivado ',
				correo: data.EmailId,
			});
	} catch (error) {
		console.error('Error al desactivar el Correo:', error);
		Bitacora('desactivarCorreo',error)
		return res
			.status(500)
			.json({
				status: 'Error',
				message: 'Error al eliminar correo',
				Error: error,
			});
	}
};

const crearTelefono = async (req, res) => {
	try {
		const data = req.body;
		const ContactoId = req.body.ContactoId;

		const contacto = await buscarItemPorId(Contacto, ContactoId);

		if (!contacto) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'Contacto no encontreado' });
		}

		let telefonos = [
			{
				telefono: data.NumeroTelefonico,
			},
		];

		const telefonoCreado = await insertarRegistro(
			telefonos.map(telefono => ({ NumeroTelefonico: telefono.telefono })),
			Telefono,
			ContactoTelefono,
			'ContactoId',
			data.ContactoId,
			data.CreadoPor,
		);

		return res
			.status(201)
			.send({
				status: 'Ok',
				message: 'Telefono creado',
				telefono: telefonoCreado,
			});
	} catch (error) {
		console.error('Error al agregar el telefono:', error);
		Bitacora('crearTelefono',error)
		return res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al crear telefono',
				Error: error,
			});
	}
};

const editarTelefono = async (req, res) => {
	try {
		const data = req.body;

		const { TelefonoId, ...actualizacion } = data;

		const tel = await buscarItemPorId(Telefono, TelefonoId);

		if (!tel) {
			return res
				.status(404)
				.send({ status: 'Error', message: 'Telefono no encontrado' });
		}

		await tel.update(actualizacion);

		console.log('Telefono editado con éxito');
		return res.status(200).send({
			status: 'Ok',
			message: 'Telefono actualizado cpm exito',
			telefono: tel.toJSON(),
		});
	} catch (error) {
		console.error('Error al editar el Telefono:', error.message);
		Bitacora('editarTelefono',error)
		return res.status(500).message({
			status: 'Ok',
			message: 'Error al editar el telefono',
			Error: error,
		});
	}
};

const desactivarTelefono = async (req, res) => {
	try {
		const data = req.body;

		const telefono = await buscarItemPorId(Telefono, data.TelefonoId);

		if (!telefono) {
			return res.status(404).send({
				status: 'Error',
				message: 'Telefono no encontrado',
			});
		}

		telefono.Borrado = true;
		telefono.BorradoPor = data.BorradoPor;

		await telefono.save();

		console.log('Telefono desactivado con éxito');
		res
			.status(200)
			.json({
				status: 'Ok',
				message: 'Telefono desactivado ',
				telefono: data.TelefonoId,
			});
	} catch (error) {
		console.error('Error al desactivar el Telefono:', error.message);
		Bitacora('desactivarTelefono',error)
		return res
			.status(500)
			.send({
				status: 'Error',
				message: 'Error al eliminar telefono',
				Error: error,
			});
	}
};

export const methods = {
	obtenerContactos,
	obtenerDatosContacto,
	crearContacto,
	editarContacto,
	desactivarContacto,
	crearCorreo,
	editarCorreo,
	crearTelefono,
	editarTelefono,
	desactivarCorreo,
	desactivarTelefono,
	buscarContacto,
	agregarDetalleContacto,
};
