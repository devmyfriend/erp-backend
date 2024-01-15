import { Contacto } from '../models/contacto.model.js';
import { Email } from '../models/email.model.js';
import { Telefono } from '../models/telefono.model.js';
import { Connection as sequelize } from '../database/mariadb.database.js';
import { Op } from 'sequelize';

const obtenerContactos = async (req, res) => {
	try {
		const idSucursal = req.params.id;

		const contactos = await sequelize.query(' CALL sp_contacto_sucursal(?)', {
			replacements: [idSucursal],
			type: sequelize.QueryTypes.RAW,
		});

		res.json(contactos);
	} catch (error) {
		console.error('Error al obtener contactos:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const buscarContacto = async (req, res) => {
	try {
		const data = req.body;

		const result = await Contacto.findAll({
			where: {
				Nombres: {
					[Op.like]: `%${data.Nombre}%`,
				},
				SucursalId: data.SucursalId,
				Borrado: 0,
			},
		});
		res.status(201).json({ success: true, data: result });
	} catch (error) {
		console.error('Error al obtener datos de contacto:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const obtenerDatosContacto = async (req, res) => {
	try {
		const idContacto = req.params.id;

		const email = await Email.findAll({
			where: {
				ContactoId: idContacto,
				Borrado: 0,
			},
		});

		const tel = await Telefono.findAll({
			where: {
				ContactoId: idContacto,
				Borrado: 0,
			},
		});

		res.json({ email, telefono: tel });
	} catch (error) {
		console.error('Error al obtener datos de contacto:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const crearContacto = async (req, res) => {
	try {
		const data = req.body;
		const contactoCreado = await Contacto.create(data);
		res.json({ success: true, data: contactoCreado.toJSON() });
	} catch (error) {
		console.error('Error al crear contacto:', error.message);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

const agregarDetalleContacto = async (req, res) => {
	try {
		const data = req.body;

		const contacto = await Contacto.findByPk(data.ContactoId);
		if (!contacto) {
			return res.status(404).json({ error: 'Contacto no encontrado' });
		}

		const correosCreados = await Promise.all(
			data.Correos.map(async correo => {
				return await Email.create({
					Email: correo.correo,
					ContactoId: data.ContactoId,
					CreadoPor: data.CreadoPor,
				});
			}),
		);

		const telefonosCreados = await Promise.all(
			data.Telefonos.map(async telefono => {
				return await Telefono.create({
					NumeroTelefonico: telefono.telefono,
					ContactoId: data.ContactoId,
					CreadoPor: data.CreadoPor,
				});
			}),
		);

		res.status(201).json({
			success: true,
			data: {
				correos: correosCreados.map(correo => correo.toJSON()),
				telefonos: telefonosCreados.map(telefono => telefono.toJSON()),
			},
		});
	} catch (error) {
		console.error('Error al agregar detalles de contacto:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
};

const editarContacto = async (req, res) => {
	try {
		const data = req.body;

		const { ContactoId, ...actualizacion } = data;

		const contacto = await Contacto.findByPk(ContactoId);

		if (!contacto) {
			return res.status(404).json({ error: 'Contacto no encontrado' });
		}

		await contacto.update(actualizacion);

		console.log('Contacto editado con éxito');
		return res.json({ success: true, data: contacto.toJSON() });
	} catch (error) {
		console.error('Error al editar contacto:', error.message);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

const desactivarContacto = async (req, res) => {
	try {
		const data = req.body;

		const contacto = await Contacto.findByPk(data.ContactoId);

		if (!contacto) {
			return res.status(404).json({ error: 'Contacto no encontrado' });
		}

		contacto.Borrado = true;
		contacto.BorradoPor = data.BorradoPor;

		await contacto.save();

		console.log('Contacto desactivado con éxito');

		return res.json({ message: 'Contacto desactivado: ' + data.ContactoId });
	} catch (error) {
		console.error('Error al desactivar contacto:', error.message);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

const crearCorreo = async (req, res) => {
	try {
		const data = req.body;

		const contacto = await Contacto.findByPk(req.body.ContactoId);

		if (!contacto) {
			return res.status(404).json({ error: 'Contacto no encontrado' });
		}
		const correoCreado = await Email.create(data);

		res.status(201).json({ success: true, data: correoCreado.toJSON() });
	} catch (error) {
		console.error('Error al crear correo:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
};

const editarCorreo = async (req, res) => {
	try {
		const dta = req.body;

		const { EmailId, ...actualizacion } = dta;

		const correo = await Email.findByPk(EmailId);

		if (!correo) {
			return res.status(404).json({ error: 'Correo no encontrado' });
		}

		await correo.update(actualizacion);

		console.log('Correo editado con éxito');

		return res.status(200).json({ success: true, data: dta });
	} catch (error) {
		console.error('Error al editar el correo:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
};

const desactivarCorreo = async (req, res) => {
	try {
		const data = req.body;

		const correo = await Email.findByPk(data.EmailId);

		if (!correo) {
			return res.status(404).json({ error: 'Correo no encontrado' });
		}

		correo.Borrado = true;
		correo.BorradoPor = data.BorradoPor;

		await correo.save();

		console.log('Correo desactivado con éxito');

		return res
			.status(200)
			.json({ message: 'Correo desactivado: ' + data.EmailId });
	} catch (error) {
		console.error('Error al desactivar el Correo:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
};

const crearTelefono = async (req, res) => {
	try {
		const data = req.body;

		const contacto = await Contacto.findByPk(req.body.ContactoId);

		if (!contacto) {
			return res.status(404).json({ error: 'Contacto no encontrado' });
		}
		const telefonoCreado = await Telefono.create(data);
		return res.status(200).json(telefonoCreado.toJSON());
	} catch (error) {
		console.error('Error al agregar el telefono:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
};

const editarTelefono = async (req, res) => {
	try {
		const data = req.body;

		const { TelefonoId, ...actualizacion } = data;

		const tel = await Telefono.findByPk(TelefonoId);

		if (!tel) {
			return res.status(404).json({ error: 'Telefono no encontrado' });
		}

		await tel.update(actualizacion);

		console.log('Telefono editado con éxito');
		return res.status(200).json(tel.toJSON());
	} catch (error) {
		console.error('Error al editar el Telefono:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
	}
};

const desactivarTelefono = async (req, res) => {
	try {
		const data = req.body;

		const telefono = await Telefono.findByPk(data.TelefonoId);

		if (!telefono) {
			return res.status(404).json({ error: 'Telefono no encontrado' });
		}

		telefono.Borrado = true;
		telefono.BorradoPor = data.BorradoPor;

		await telefono.save();

		console.log('Telefono desactivado con éxito');
		res
			.status(200)
			.json({ message: 'Telefono desactivado: ' + data.TelefonoId });
	} catch (error) {
		console.error('Error al desactivar el Telefono:', error.message);
		return res
			.status(500)
			.json({ success: false, error: 'Internal Server Error' });
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
