import { Connection as sequelize } from '../database/mariadb.database.js';
import { EntidadNegocio } from '../models/empresa.model.js';
import { Domicilio } from '../models/domicilios.model.js';
import { EmpresaDomicilio } from '../models/empresa.domicilio.model.js';
import { Telefono } from '../models/telefono.model.js';
import { Contacto } from '../models/contacto.model.js';
import { EmpresaContacto } from '../models/empresa.contacto.model.js';
import { EmpresaTelefono } from '../models/empresa.telefono.model.js';
import { Email } from '../models/email.model.js';
import { EmpresaEmails } from '../models/empresa.emails.model.js';
import { ContactosPorEntidadNegocio } from '../models/vw.contactos.por.entidad.negocio.model.js';
import { EmailsPorEntidadNegocio } from '../models/vw.emails.por.entidad.negocio.model.js';
import { TelefonosPorEntidadNegocio } from '../models/vw.telefonos.por.entidad.negocio.model.js';
import { ValidarEntidadNegocio } from '../models/vw.validar.entidad.negocio.model.js';
import { VistaContactos } from '../models/vw.contactos.por.nombre.entidad.model.js';
import { Bitacora } from '../helpers/logs/log.js';
import {
	validarRelacionEmpresaTelefono,
	validarEntidad,
	validarTelefono,
	validarContacto,
	validarRelacionEmpresaContacto,
	validarEmail,
	validarRelacionEmpresaEmail,
} from '../middlewares/finders/index.js';

// EMPRESA
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
		}

		return res.status(200).json(empresas);
	} catch (error) {
		console.error('Error al buscar las empresas:', error.message);
		return res.status(500).json({ error: 'Error al buscar las empresas' });
	}
};

const buscarIdEmpresa = async (req, res) => {
	const entidadId = req.params.id;
	try {
		const entidad = await sequelize.query('CALL BuscarEntidadNegocio(?)', {
			replacements: [entidadId],
			type: sequelize.QueryTypes.RAW,
		});

		if (entidad.length === 0) {
			return res.status(404).json({ message: 'No se encontró la empresa' });
		}

		return res.status(200).json(entidad);
	} catch (error) {
		console.error('Error al obtener la entidad:', error.message);
		return res.status(500).json({ error: 'Error al obtener la empresa' });
	}
};

const crearIdEmpresa = async (req, res) => {
	const { entidad, domicilio, CreadoPor: creadoPor } = req.body;

	try {
		const validarRFC = await ValidarEntidadNegocio.findOne({
			where: {
				RFC: entidad[0].RFC,
				PersonaMoral: 1,
				Borrado: 0,
			},
		});

		const validarNombreOficial = await ValidarEntidadNegocio.findOne({
			where: {
				NombreOficial: entidad[0].NombreOficial,
				Borrado: 0,
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
			EntidadNegocioId: crearEntidad.EntidadNegocioId,
			CreadoPor: creadoPor,
		});

		await EmpresaDomicilio.create({
			EntidadNegocioId: crearEntidad.EntidadNegocioId,
			DomicilioId: crearDomicilio.DomicilioId,
		});

		return res.status(200).json({
			status: 200,
			message: 'Se ha creado la empresa',
			EmpresaId: crearEntidad.EntidadNegocioId,
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
				Borrado: 0,
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
					Borrado: 0,
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
			ActualizadoEn: new Date(),
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
				EntidadNegocioId: entidad[0].EntidadNegocioId,
			},
		});

		const domicilioActual = await Domicilio.findByPk(
			buscarDomicilio.dataValues.DomicilioId,
		);

		const actualizacionDomicilio = {
			...domicilioActual.dataValues,
			...domicilio[0],
			ActualizadoPor: actualizadoPor,
			ActualizadoEn: new Date(),
			ClavePais: entidad[0].ClavePais,
		};

		await Domicilio.update(actualizacionDomicilio, {
			where: {
				DomicilioId: buscarDomicilio.DomicilioId,
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

const desactivarIdEmpresa = async (req, res) => {
	const { EntidadNegocioId, BorradoPor } = req.body;
	try {
		const entidad = await EntidadNegocio.findOne({
			where: {
				EntidadNegocioId: EntidadNegocioId,
				Borrado: 0,
			},
		});

		if (!entidad) {
			return res
				.status(404)
				.json({ status: 404, message: 'La empresa no existe' });
		}

		entidad.Borrado = true;
		entidad.BorradoPor = BorradoPor;
		entidad.BorradoEn = new Date();
		await entidad.save();

		return res.status(200).json({
			message: 'La empresa ' + entidad.EntidadNegocioId + ' ha sido borrada',
		});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

// EMPRESA-CONTACTO
const buscarContactosPorEntidadNegocioId = async (req, res) => {
	const entidadId = req.params.id;
	try {
		const contactos = await ContactosPorEntidadNegocio.findAll({
			where: { EntidadNegocioId: entidadId },
		});

		if (contactos.length === 0) {
			return res.status(404).send({ status: 'Error', message: 'No hay contactos disponibles' });
		}

		return res.status(200).send({
			status: 'OK',
			message: 'Contactos obtenidos correctamente',
			contacto: contactos,
		});
	} catch (error) {
		Bitacora('buscarContactosPorEntidadNegocioId', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const crearEmpresaContacto = async (req, res) => {
	const { EmpresaId: EntidadNegocioId, ...restoDelCuerpo } = req.body;

	try {
		const { existe } = await validarEntidad(EntidadNegocioId);
		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'Entidad de negocio no encontrada',
			});
		}

		const datosContacto = await Contacto.create({
			EntidadNegocioId,
			...restoDelCuerpo,
		});

		await EmpresaContacto.create({
			EntidadNegocioId,
			ContactoId: datosContacto.ContactoId,
		});

		return res.status(200).send({
			status: 'OK',
			message: 'Contacto creado correctamente',
			contacto: datosContacto,
		});
	} catch (error) {
		Bitacora('crearEmpresaContacto', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const editarEmpresaContacto = async (req, res) => {
	const contactoBody = req.body;
	try {
		const { existe: empresaExiste } = await validarEntidad(contactoBody.EntidadNegocioId);
		if (!empresaExiste) {
			return res.status(404).send({ status: 'Error', message: 'Entidad de negocio no encontrada' });
		}

		const { existe: contactoExiste } = await validarContacto(contactoBody.ContactoId);
		if (!contactoExiste) {
			return res.status(404).send({ status: 'Error', message: 'Contacto no encontrado' });
		}

		const { existe: relacionExiste } = await validarRelacionEmpresaContacto(contactoBody.EntidadNegocioId, contactoBody.ContactoId);
		if (!relacionExiste) {
			return res.status(404).send({
				status: 'Error',
				message: 'Relación entre entidad de negocio y contacto no encontrada',
			});
		}

		await Contacto.update(contactoBody, {
			where: { ContactoId: contactoBody.ContactoId },
		});

		return res.status(200).send({
			status: 'OK',
			message: 'Contacto actualizado correctamente',
			contacto: contactoBody,
		});
	} catch (error) {
		Bitacora('editarEmpresaContacto', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const buscarContactosPorNombreYEntidad = async (req, res) => {
	const { Nombre, EntidadNegocioId } = req.body;
	try {
		const contactos = await VistaContactos.findAll({
			where: {
				NombreContacto: Nombre,
				EntidadNegocioId,
			},
		});

		if (contactos.length === 0) {
			return res.status(404).send({ status: 'Error', message: 'Contactos no encontrados' });
		}

		return res.status(200).send({
			status: 'OK',
			message: 'Contactos encontrados',
			contacto: contactos,
		});
	} catch (error) {
		Bitacora('buscarContactosPorNombreYEntidad', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const empresaDetalle = async (req, res) => {
	const entidadId = req.params.id;
	try {
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

		return res.status(200).json({ telefono, emails });
	} catch (error) {
		console.error('Error al obtener el teléfono:', error.message);
		return res.status(500).json({ error: 'Error al obtener el teléfono' });
	}
};

// EMPRESA TELEFONO
const obtenerEmpresaTelefono = async (req, res) => {
    const entidadId = req.params.id;
    try {
        const data = await TelefonosPorEntidadNegocio.findAll({
            where: { EntidadNegocioId: entidadId },
        });

        if (data.length === 0) {
            return res.status(404).send({ status: 'Error', message: 'No hay teléfonos disponibles' });
        }

        return res.status(200).send({
            status: 'OK',
            message: 'Lista de teléfonos obtenida correctamente',
            telefono: data,
        });
    } catch (error) {
        Bitacora('obtenerEmpresaTelefono', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error interno en el servidor',
        });
    }
};

const crearEmpresaTelefono = async (req, res) => {
    const telefonoBody = req.body;

    try {
        const { existe } = await validarEntidad(telefonoBody.EntidadNegocioId);
        if (!existe) {
            return res.status(404).send({
                status: 'Error',
                message: 'Entidad de negocio no encontrada',
            });
        }

        const datosTelefono = await Telefono.create({
            NumeroTelefonico: telefonoBody.NumeroTelefonico,
            CreadoPor: telefonoBody.CreadoPor,
        });

        await EmpresaTelefono.create({
            EntidadNegocioId: telefonoBody.EntidadNegocioId,
            TelefonoId: datosTelefono.TelefonoId,
        });

        return res.status(200).send({
            status: 'OK',
            message: 'Teléfono creado correctamente',
            telefono: datosTelefono,
        });
    } catch (error) {
        Bitacora('crearEmpresaTelefono', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error interno en el servidor',
        });
    }
};

const editarEmpresaTelefono = async (req, res) => {
    const telefonoUpdateBody = req.body;

    try {
        const { existe: entidadExiste } = await validarEntidad(telefonoUpdateBody.EntidadNegocioId);
        if (!entidadExiste) {
            return res.status(404).send({ status: 'Error', message: 'Entidad de negocio no encontrada' });
        }

        const { existe: telefonoExiste } = await validarTelefono(telefonoUpdateBody.TelefonoId);
        if (!telefonoExiste) {
            return res.status(404).send({ status: 'Error', message: 'Teléfono no encontrado' });
        }

        const { existe: relacionExiste } = await validarRelacionEmpresaTelefono(telefonoUpdateBody.EntidadNegocioId, telefonoUpdateBody.TelefonoId);
        if (!relacionExiste) {
            return res.status(404).send({
                status: 'Error',
                message: 'Relación entre entidad de negocio y teléfono no encontrada',
            });
        }

        await Telefono.update(telefonoUpdateBody, {
            where: { TelefonoId: telefonoUpdateBody.TelefonoId },
        });

        return res.status(200).send({
            status: 'OK',
            message: 'Teléfono actualizado correctamente',
            telefono: telefonoUpdateBody,
        });
    } catch (error) {
        Bitacora('editarEmpresaTelefono', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error interno en el servidor',
        });
    }
};

const desactivarEmpresaTelefono = async (req, res) => {
    const { EntidadNegocioId, TelefonoId, BorradoPor } = req.body;

    try {
        const { existe: entidadExiste } = await validarEntidad(EntidadNegocioId);
        if (!entidadExiste) {
            return res.status(404).send({ status: 'Error', message: 'Entidad de negocio no encontrada' });
        }

        const { existe: telefonoExiste } = await validarTelefono(TelefonoId);
        if (!telefonoExiste) {
            return res.status(404).send({ status: 'Error', message: 'Teléfono no encontrado' });
        }

        const { existe: relacionExiste } = await validarRelacionEmpresaTelefono(EntidadNegocioId, TelefonoId);
        if (!relacionExiste) {
            return res.status(404).send({
                status: 'Error',
                message: 'Relación entre entidad de negocio y teléfono no encontrada',
            });
        }

        await Telefono.update(
            {
                Borrado: true,
                BorradoPor,
                BorradoEn: new Date(),
            },
            {
                where: { TelefonoId },
            },
        );

        return res.status(200).send({
            status: 'OK',
            message: 'Teléfono desactivado correctamente',
            TelefonoId 
        });
    } catch (error) {
        Bitacora('desactivarEmpresaTelefono', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error interno en el servidor',
        });
    }
};

// EMPRESA-EMAIL
const buscarEmailsPorEmpresa = async (req, res) => {
	const entidadId = req.params.id;
	try {
		const data = await EmailsPorEntidadNegocio.findAll({
			where: { EntidadNegocioId: entidadId },
		});

		if (data.length === 0) {
			return res.status(404).send({
				status: 'Error',
				message: 'No existen emails relacionados con esta empresa',
			});
		}

		return res.status(200).send({
			status: 'OK',
			message: 'Lista de emails obtenida correctamente',
			email: data,
		});
	} catch (error) {
		Bitacora('buscarEmailsPorEmpresa', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const crearEmailEmpresa = async (req, res) => {
	const emailsBody = req.body;

	try {
		const { existe } = await validarEntidad(emailsBody.EntidadNegocioId);
		if (!existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'Entidad de negocio no encontrada',
			});
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
			status: 'OK',
			message: 'Correo creado correctamente',
			email: datosEmail,
		});
	} catch (error) {
		Bitacora('crearEmailEmpresa', error);
		return res.status(500).json({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const editarEmpresaEmails = async (req, res) => {
	const emailsBody = req.body;

	try {
		const { existe: empresaExiste } = await validarEntidad(emailsBody.EntidadNegocioId);
		if (!empresaExiste) {
			return res.status(404).send({ status: 'Error', message: 'Entidad de negocio no encontrada' });
		}

		const { existe: emailExiste } = await validarEmail(emailsBody.EmailId);
		if (!emailExiste) {
			return res.status(404).send({ status: 'Error', message: 'Email no encontrado' });
		}

		const { existe: relacionExiste } = await validarRelacionEmpresaEmail(emailsBody.EntidadNegocioId, emailsBody.EmailId);
		if (!relacionExiste) {
			return res.status(404).send({
				status: 'Error',
				message: 'El correo no pertenece a la empresa',
			});
		}

		await Email.update(
			{
				Email: emailsBody.Email,
				ActualizadoPor: emailsBody.ActualizadoPor,
				ActualizadoEn: new Date(),
			},
			{
				where: { EmailId: emailsBody.EmailId },
			},
		);

		return res.status(200).send({
			status: 'OK',
			message: 'Correo actualizado correctamente',
			email: emailsBody,
		});
	} catch (error) {
		Bitacora('editarEmpresaEmails', error);
		return res.status(500).send({
			status: 'Error',
			message: 'Error interno en el servidor',
		});
	}
};

const desactivarEmpresaEmails = async (req, res) => {
	try {
		const empresaEmail = await EmpresaEmails.findOne({
			where: {
				EmailId: req.body.EmailId,
			},
		});

		if (!empresaEmail) {
			return res
				.status(404)
				.json({ status: 404, message: 'El email no existe' });
		}

		await empresaEmail.update({
			Borrado: true,
			BorradoPor: req.body.BorradoPor,
		});

		await Email.update(
			{
				Borrado: true,
				BorradoPor: req.body.BorradoPor,
				BorradoEn: new Date(),
			},
			{
				where: {
					EmailId: req.body.EmailId,
				},
			},
		);

		return res.status(200).json({
			message: 'Se ha descativado el correo: ' + empresaEmail.EmailId,
		});
	} catch (error) {
		return res.status(500).json(error.message);
	}
};

export const methods = {
	buscarIdEmpresa,
	crearIdEmpresa,
	editarIdEmpresa,
	desactivarIdEmpresa,
	empresaDetalle,
	obtenerEmpresaTelefono,
	crearEmpresaTelefono,
	editarEmpresaTelefono,
	desactivarEmpresaTelefono,
	buscarContactosPorEntidadNegocioId,
	crearEmpresaContacto,
	editarEmpresaContacto,
	buscarEmailsPorEmpresa,
	crearEmailEmpresa,
	editarEmpresaEmails,
	desactivarEmpresaEmails,
	obtenerEmpresas,
	buscarPorNombreOficial,
	buscarContactosPorNombreYEntidad,
};
