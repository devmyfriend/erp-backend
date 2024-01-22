import { Connection as sequelize } from '../database/mariadb.database.js';
import { EntidadNegocio } from '../models/empresa.model.js';
import { Domicilio } from '../models/domicilios.model.js';
import { EmpresaDomicilio } from '../models/empresa.domicilio.model.js';
import { regimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { Telefono } from '../models/telefono.model.js';
import { Contacto } from '../models/contacto.model.js';
import { EmpresaContacto } from '../models/empresa.contacto.model.js';
import { EmpresaTelefono } from '../models/empresa.telefono.model.js';
import { Email } from '../models/email.model.js';
import { EmpresaEmails } from '../models/empresa.emails.model.js';

const obtenerEmpresas = async (req, res) => {
	try {
		const empresas = await sequelize.query(
			'CALL ObtenerEmpresasDomicilioListado()',
			{ type: sequelize.QueryTypes.RAW },
		);

		if (empresas.length === 0) {
			return res.status(404).json({ message: 'No se encontraron empresas' });
		}

		return res.status(200).json(empresas);
	} catch (error) {
		console.error('Error al obtener las empresas:', error.message);
		return res.status(500).json({ error: 'Error al obtener las empresas' });
	}
};

const buscarPorNombreOficial = async (req, res) => {
	const nombreOficial = req.params.nombre;
	try {
		const empresas = await sequelize.query(
			'CALL BuscarEmpresasPorNombreOficial(?)',
			{
				replacements: [nombreOficial],
				type: sequelize.QueryTypes.RAW,
			},
		);

		if (empresas.length === 0) {
            return res
				.status(404)
				.json({ message: 'No se encontraron empresas con ese nombre oficial' });
		} else {
			return res
				.status(200)
				.json({ message: 'Empresas obtenidas con éxito', empresas });
		}
	} catch (error) {
		console.error('Error al buscar las empresas:', error.message);
		return res.status(500).json({ error: 'Error al buscar las empresas' });
	}
};

const buscarIdEmpresa = async (req, res) => {
	const entidadId = req.params.id;
	try {
		console.log(entidadId);
		const entidad = await sequelize.query('CALL BuscarEntidadNegocio(?)', {
			replacements: [entidadId],
			type: sequelize.QueryTypes.RAW,
		});

		if (entidad.length === 0) {
			return res.status(404).json({ message: 'No se encontró la empresa' });
		} else {
			return res.status(200).json({ message: 'Empresa obtenida con éxito', entidad });
		}
	} catch (error) {
		console.error('Error al obtener la entidad:', error.message);
		return res.status(500).json({ error: 'Error al obtener la empresa' });
	}
};

const crearIdEmpresa = async (req, res) => {
	const { entidad, domicilio, CreadoPor: creadoPor } = req.body;

	try {
		const validarRFC = await EntidadNegocio.findOne({
			where: {
				RFC: entidad[0].RFC,
			},
		});

		const validarNombreOficial = await EntidadNegocio.findOne({
			where: {
				NombreOficial: entidad[0].NombreOficial,
			},
		});

		if (validarRFC) {
			return res.status(409).json({
				status: 409,
				error: 'El RFC ingresado ya existe',
			});
		}

		if (validarNombreOficial) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre oficial ingresado ya existe',
			});
		}

		const crearEntidad = await EntidadNegocio.create({
			CreadoPor: creadoPor,
			EsPropietaria: 1,
			...entidad[0],
		});

		const crearDomicilio = await Domicilio.create({
			...domicilio[0],
			EntidadNegocioId: entidad[0].EntidadNegocioId,
			CreadoPor: creadoPor,
		});

		await EmpresaDomicilio.create({
			EntidadNegocioId: crearEntidad._previousDataValues.EntidadNegocioId,
			DomicilioId: crearDomicilio._previousDataValues.DomicilioId,
		});

		console.log(crearEntidad.EntidadNegocioId);
		return res.status(200).json({
			status: 200,
			message: 'Se ha creado la empresa',
		});
	} catch (error) {
		console.error('Error al crear la empresa:', error);
		return res.status(500).json({ error: 'Error al crear la empresa' });
	}
};

const editarIdEmpresa = async (req, res) => {
	const { entidad, domicilio, ActualizadoPor: actualizadoPor } = req.body;

	try {
		const entidadExistente = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: entidad[0].EntidadNegocioId,
			},
		});

		if (!entidadExistente) {
			return res.status(404).json({
				status: 404,
				error: 'No se ha encontrado la empresa solicitada',
			});
		}

		if (entidad[0].NombreOficial) {
			const entidadExistente = await EntidadNegocio.findOne({
				where: {
					NombreOficial: entidad[0].NombreOficial,
				},
			});

			if (entidadExistente) {
				return res.status(409).json({
					status: 409,
					error: 'El nombre oficial ingresado ya existe',
				});
			}
		}

		if (entidad[0].RFC) {
			const validarRFC = await EntidadNegocio.findOne({
				where: {
					RFC: entidad[0].RFC,
				},
			});

			if (validarRFC) {
				return res.status(409).json({
					status: 409,
					error: 'El RFC ingresado ya existe',
				});
			}
		}

		const entidadActual = await EntidadNegocio.findByPk(
			entidad[0].EntidadNegocioId,
		);

		const actualizacionEntidad = {
			...entidadActual.dataValues,
			...entidad[0],
			ActualizadoPor: actualizadoPor,
		};

		const buscarDomicilio = await EmpresaDomicilio.findOne({
			where: {
				EntidadNegocioId: entidad[0].EntidadNegocioId,
			},
		});

		if (!buscarDomicilio) {
			return res.status(400).json({
				status: 400,
				error:
					'El domicilio no fue asignado correctamente, contacta al administrador',
			});
		}

		await EntidadNegocio.update(actualizacionEntidad, {
			where: {
				EntidadNegocioId: actualizacionEntidad.EntidadNegocioId,
			},
		});

		const domicilioActual = await Domicilio.findByPk(
			buscarDomicilio.dataValues.DomicilioId,
		);

		const actualizacionDomicilio = {
			...domicilioActual.dataValues,
			...domicilio[0],
			ActualizadoPor: actualizadoPor,
			ClavePais: actualizacionEntidad.ClavePais,
		};

		await Domicilio.update(actualizacionDomicilio, {
			where: {
				DomicilioId: actualizacionDomicilio.DomicilioId,
			},
		});

		return res.status(200).json({
			message: 'Empresa actualizada',
		});
	} catch (error) {
		console.error('Error al actualizar los datos de la empresa:', error);
		return res
			.status(500)
			.json({ error: 'Error al actualizar los datos de la empresa' });
	}
};

export const desactivarIdEmpresa = async (req, res) => {
	try {
		const entidad = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: req.params.id,
				Borrado: 0,
			},
		});

		if (!entidad) {
			return res
				.status(404)
				.json({ status: 404, message: 'La empresa no existe' });
		}

		entidad.Borrado = true;
		entidad.BorradoPor = req.body.BorradoPor;

		await entidad.save();
		return res.status(200).json({
			message:
				'La empresa ' + entidad.EntidadNegocioId + ' ha sido desactivada',
		});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

const obtenerRegimenesFiscales = async (req, res) => {
	try {
		const regimenes = await regimenFiscal.findAll();
		return res.json(regimenes);
	} catch (error) {
		console.log('Error al obtener los regímenes fiscales', error.message);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

// EMPRESA X CONTACTO

const buscarContactosPorEntidadNegocioId = async (req, res) => {
	const entidadId = req.params.id;
	try {
		const contactos = await sequelize.query(
			'CALL BuscarContactosPorEntidadNegocioId(?)',
			{
				replacements: [entidadId],
				type: sequelize.QueryTypes.RAW,
			},
		);

		if (contactos.length === 0) {
			return res.status(404).json({ message: 'No hay contactos disponibles' });
		} else {
			return res.json(contactos);
		}
	} catch (error) {
		console.error('Error al obtener los contactos:', error.message);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const crearEmpresaContacto = async (req, res) => {
	const { EmpresaId: EntidadNegocioId, ...restoDelCuerpo } = req.body;

	try {
		const validarEmpresa = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId,
			},
		});

		if (!validarEmpresa) {
			return res.status(404).json({ message: 'La empresa ya esta en uso' });
		}

		const datosContacto = await Contacto.create({
			EntidadNegocioId,
			...restoDelCuerpo,
		});

		await EmpresaContacto.create({
			EntidadNegocioId,
			ContactoId: datosContacto.ContactoId,
		});

		return res.status(200).json({
			status: 200,
			message: 'Contacto creado correctamente: ' + datosContacto.ContactoId,
		});
	} catch (error) {
		console.error('Error al crear el contacto:', error);
		return res.status(500).json({ error: 'Error al crear el contacto' });
	}
};

const editarEmpresaContacto = async (req, res) => {
	const contactoBody = req.body;
	console.log(contactoBody);
	try {
		const validarEmpresa = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: contactoBody.EntidadNegocioId,
			},
		});

		if (!validarEmpresa) {
			return res.status(404).json({
				status: 404,
				error: 'Empresa no encontrada',
			});
		}

		const contactoExistente = await Contacto.findOne({
			where: {
				ContactoId: contactoBody.ContactoId,
			},
		});

		if (!contactoExistente) {
			return res.status(404).json({
				status: 404,
				error: 'Contacto no encontrado',
			});
		}



		await Contacto.update(contactoBody, {
			where: {
				ContactoId: contactoBody.ContactoId,
			},
		});

		await EmpresaContacto.update(contactoBody, {
			where: {
				EntidadNegocioId: contactoBody.EntidadNegocioId,
				ContactoId: contactoBody.ContactoId,
			},
		});

		return res.status(200).json({
			message: 'Se ha actualizado el contacto',
		});
	} catch (error) {
		console.error('Error al actualizar el contacto:', error);
        return res.status(500).json({ error: 'Error al actualizar el contacto' });
	}
};

// EMPRESA X TELEFONO
const empresaDetalle = async (req, res) => {
	const entidadId = req.params.id;
	try {
		console.log(entidadId);
		const telefono = await sequelize.query(
			'CALL buscarTelefonoPorEntidadNegocioId(?)',
			{
				replacements: [entidadId],
				type: sequelize.QueryTypes.RAW,
			},
		);

        const emails = await sequelize.query(
			'CALL BuscarEmailsPorEntidadNegocioId(?)',
			{
				replacements: [entidadId],
				type: sequelize.QueryTypes.RAW,
			},
		);

		if (telefono.length === 0) {
			return res.status(404).json({ message: 'No existe el telefono' });
		} else {
			return res.json({telefono, emails});
		}
	} catch (error) {
		console.error('Error al obtener el teléfono:', error.message);
		return res.status(500).json({ error: 'Error al obtener el teléfono' });
	}
};

// TODO
const crearEmpresaTelefono = async (req, res) => {
	console.log(req.body);
	const telefonoBody = req.body;

	try {
		const validarEmpresa = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: telefonoBody.EntidadNegocioId,
			},
		});

		if (!validarEmpresa) {
			return res.status(404).json({ message: 'La empresa no existe' });
		}

		const datosTelefono = await Telefono.create({
			NumeroTelefonico: telefonoBody.NumeroTelefonico,
		});

		await EmpresaTelefono.create({
			EntidadNegocioId: telefonoBody.EntidadNegocioId,
			TelefonoId: datosTelefono.TelefonoId,
		});

		return res.status(200).json({
			status: 200,
			message: 'Se ha creado el telefono ' + datosTelefono.TelefonoId,
		});
	} catch (error) {
		console.error('Error al crear el telefono:', error);
		return res.status(500).json({ error: 'Error al crear el telefono' });
	}
};

const editarEmpresaTelefono = async (req, res) => {
	const { EntidadNegocioId, TelefonoId, NumeroTelefonico, ActualizadoPor } =
		req.body;

	try {
		const validarEmpresa = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId,
			},
		});

		if (!validarEmpresa) {
			return res.status(404).json({
				status: 404,
				error: 'Empresa no encontrada',
			});
		}

		const actualizacionTelefono = {
			TelefonoId,
			NumeroTelefonico,
			ActualizadoPor,
		};

		await Telefono.update(actualizacionTelefono, {
			where: {
				TelefonoId,
			},
		});

		const actualizacionEmpresaTelefono = {
			...validarEmpresa.dataValues,
			EntidadNegocioId,
			ActualizadoPor,
		};

		await EmpresaTelefono.update(actualizacionEmpresaTelefono, {
			where: {
				EntidadNegocioId,
			},
		});

		return res.status(200).json({
			message: 'Se ha actualizado el telefono ' + EntidadNegocioId,
		});
	} catch (error) {
		console.error('Error al actualizar el telefono:', error);
        return res.status(500).json({ error: 'Error al actualizar el telefono' });
	}
};

export const desactivarEmpresaTelefono = async (req, res) => {
	try {
		const empresaTelefono = await EmpresaTelefono.findOne({
			where: {
				EntidadNegocioId: req.body.EntidadNegocioId,
				TelefonoId: req.body.TelefonoId,
			},
		});

		if (!empresaTelefono) {
			return res
				.status(404)
				.json({ status: 404, message: 'El telefono no existe' });
		}

		await empresaTelefono.update({
			Borrado: true,
			BorradoPor: req.body.BorradoPor,
		});

		await Telefono.update(
			{
				Borrado: true,
				BorradoPor: req.body.BorradoPor,
			},
			{
				where: {
					TelefonoId: req.body.TelefonoId,
				},
			},
		);

		return res.status(200).json({
			message:
				'Se ha desactivado el telefono: ' + empresaTelefono.EntidadNegocioId,
		});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

const buscarEmailsPorEmpresa = async (req, res) => {
	console.log(req.params);
	const entidadId = parseInt(req.params.id, 10);
	try {
		const emails = await sequelize.query(
			'CALL BuscarEmailsPorEntidadNegocioId(?)',
			{
				replacements: [entidadId],
				type: sequelize.QueryTypes.RAW,
			},
		);

		if (emails.length === 0) {
			return res.status(404).json({ message: 'No existe el email' });
		} else {
			return res.json(emails);
		}
	} catch (error) {
		console.error('Error al obtener los emails:', error.message);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

const crearEmailEmpresa = async (req, res) => {
	const emailsBody = req.body;

	try {
		const validarEmpresa = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: emailsBody.EntidadNegocioId,
			},
		});

		if (!validarEmpresa) {
			return res.status(404).json({ message: 'La empresa no existe' });
		}

		const datosEmail = await Email.create({
			Email: emailsBody.Email,
			CreadoPor: emailsBody.CreadorPor,
		});

		await EmpresaEmails.create({
			EntidadNegocioId: emailsBody.EntidadNegocioId,
			EmailId: datosEmail.EmailId,
		});

		return res.status(200).json({
			status: 200,
			message:
				'Se ha creado el correo ' +
				datosEmail.EmailId +
				' para la empresa ' +
				emailsBody.EntidadNegocioId,
		});
	} catch (error) {
		console.error('Error al crear el correo:', error);
		return res.status(500).json({ error: 'Error al crear el correo' });
	}
};

const editarContactoEmails = async (req, res) => {
	const emailsBody = req.body;

	try {
		const validarEmpresa = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: emailsBody.EntidadNegocioId,
			},
		});

		if (!validarEmpresa) {
			return res.status(404).json({ message: 'La empresa no existe' });
		}

		const emailExistente = await Email.findOne({
			where: {
				EmailId: emailsBody.EmailId,
			},
		});

		if (!emailExistente) {
			return res.status(404).json({ message: 'El email no existe' });
		}

		await Email.update(
			{
				Email: emailsBody.Email,
				CreadoPor: emailsBody.CreadorPor,
			},
			{
				where: {
					EmailId: emailsBody.EmailId,
				},
			},
		);

		return res.status(200).json({
			status: 200,
			message: 'Se ha actualizado el email',
		});
	} catch (error) {
		console.error('Error al actualizar el email:', error);
		return res.status(500).json({ error: 'Error al actualizar el email' });
	}
};

const desactivarContactoEmails = async (req, res) => {
	try {
		const contactoEmail = await EmpresaEmails.findOne({
			where: {
				EntidadNegocioId: req.body.EntidadNegocioId,
				EmailId: req.body.EmailId,
			},
		});

		if (!contactoEmail) {
			return res
				.status(404)
				.json({ status: 404, message: 'El email no existe' });
		}

		await contactoEmail.update({
			Borrado: true,
			BorradoPor: req.body.BorradoPor,
		});

		await Email.update(
			{
				Borrado: true,
				BorradoPor: req.body.BorradoPor,
			},
			{
				where: {
					EmailId: req.body.EmailId,
				},
			},
		);

		return res.status(200).json({
			message: 'Se ha descativado el correo: ' + contactoEmail.EntidadNegocioId,
		});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

export const methods = {
	obtenerRegimenesFiscales,
	buscarIdEmpresa,
	crearIdEmpresa,
	editarIdEmpresa,
	desactivarIdEmpresa,
	empresaDetalle,
	crearEmpresaTelefono,
	editarEmpresaTelefono,
	desactivarEmpresaTelefono,
	buscarContactosPorEntidadNegocioId,
	crearEmpresaContacto,
	editarEmpresaContacto,
	buscarEmailsPorEmpresa,
	crearEmailEmpresa,
	editarContactoEmails,
	desactivarContactoEmails,
	obtenerEmpresas,
	buscarPorNombreOficial,
};