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
import { ContactosPorEntidadNegocio } from '../models/vwContactosPorEntidadnegocioModel.js';
import { EmailsPorEntidadNegocio } from '../models/vwEmailsPorEntidadNegocioModel.js';
import { TelefonosPorEntidadNegocio } from '../models/vwTelefonosPorEntidadNegocioModel.js';
import { ValidarEntidadNegocio } from '../models/vwValidarEntidadNegocioModel.js';
import { VistaContactos } from '../models/vwContactosPorNombreYEntidadModel.js';
import { 
	validarRelacionEmpresaTelefono, 
	validarEntidad, 
	validarTelefono, 
	validarContacto, 
	validarRelacionEmpresaContacto,
	validarEmail,
	validarRelacionEmpresaEmail 
} from '../middlewares/finders/index.js'

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

const buscarContactosPorEntidadNegocioId = async (req, res) => {
    const entidadId = req.params.id;
    try {
        const contactos = await ContactosPorEntidadNegocio.findAll({
            where: { EntidadNegocioId: entidadId },
        });

        if (!contactos || contactos.length === 0) {
            return res.status(404).json({ message: 'No hay contactos disponibles' });
        }

        return res.status(200).json(contactos);
    } catch (error) {
        console.error('Error al obtener los contactos:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const crearEmpresaContacto = async (req, res) => {
    const { EmpresaId: EntidadNegocioId, ...restoDelCuerpo } = req.body;

    try {
        const validarEmpresa = await validarEntidad(EntidadNegocioId, res);
        if (!validarEmpresa) return;

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
            message: 'Contacto creado: ' + datosContacto.ContactoId,
            Id: datosContacto.ContactoId,
        });
    } catch (error) {
        console.error('Error al crear el contacto:', error);
        return res.status(500).json({ error: 'Error al crear el contacto' });
    }
};


const editarEmpresaContacto = async (req, res) => {
    const contactoBody = req.body;
    try {
        const validarEmpresa = await validarEntidad(contactoBody.EntidadNegocioId, res);
        if (!validarEmpresa) return;

        const validarContactoExistente = await validarContacto(contactoBody.ContactoId, res);
        if (!validarContactoExistente) return;

        const validarRelacion = await validarRelacionEmpresaContacto(
            contactoBody.EntidadNegocioId,
            contactoBody.ContactoId,
            res
        );
        if (!validarRelacion) return;

        await Contacto.update(contactoBody, {
            where: {
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

const obtenerEmpresaTelefono = async (req, res) => {
    const entidadId = req.params.id;
    try {
        const telefonos = await TelefonosPorEntidadNegocio.findAll({
            where: { EntidadNegocioId: entidadId },
        });

        if (!telefonos || telefonos.length === 0) {
            return res.status(404).json({ message: 'No hay teléfonos disponibles' });
        }

        return res.status(200).json(telefonos);
    } catch (error) {
        console.error('Error al obtener los teléfonos:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const crearEmpresaTelefono = async (req, res) => {
    const telefonoBody = req.body;

    try {
        const validarEmpresa = await validarEntidad(telefonoBody.EntidadNegocioId, res);
        if (!validarEmpresa) return;

        const datosTelefono = await Telefono.create({
            NumeroTelefonico: telefonoBody.NumeroTelefonico,
            CreadoPor: telefonoBody.CreadoPor,
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
    const telefonoUpdateBody = req.body;

    try {
        const validarEmpresa = await validarEntidad(telefonoUpdateBody.EntidadNegocioId, res);
        if (!validarEmpresa) return;

        const validatePhoneId = await validarTelefono(telefonoUpdateBody.TelefonoId, res);
        if (!validatePhoneId) return;

        const validarRelacion = await validarRelacionEmpresaTelefono(
            telefonoUpdateBody.EntidadNegocioId,
            telefonoUpdateBody.TelefonoId,
            res
        );
        if (!validarRelacion) return;

        await Telefono.update(telefonoUpdateBody, {
            where: {
                TelefonoId: telefonoUpdateBody.TelefonoId,
            },
        });

        return res.status(200).json({
            message: 'Se ha actualizado el telefono ' + telefonoUpdateBody.TelefonoId,
        });
    } catch (error) {
        console.error('Error al actualizar el telefono:', error);
        return res.status(500).json({ error: 'Error al actualizar el telefono' });
    }
};


const desactivarEmpresaTelefono = async (req, res) => {
    const { EntidadNegocioId, TelefonoId, BorradoPor } = req.body;

    try {
        const empresa = await validarEntidad(EntidadNegocioId, res);
        if (!empresa) return;

        const telefono = await validarTelefono(TelefonoId, res);
        if (!telefono) return;

        const empresaTelefono = await validarRelacionEmpresaTelefono(
            EntidadNegocioId,
            TelefonoId,
            res
        );
        if (!empresaTelefono) return;

        await Telefono.update(
            {
                Borrado: true,
                BorradoPor,
                BorradoEn: new Date(),
            },
            {
                where: {
                    TelefonoId,
                },
            },
        );

        return res.status(200).json({
            message: 'Se ha eliminado el telefono: ' + empresaTelefono.TelefonoId,
        });
    } catch (error) {
        console.error('Error al desactivar el telefono', error.message);
        return res.status(500).json({ error: 'Error al desactivar el telefono' });
    }
};


const buscarEmailsPorEmpresa = async (req, res) => {
    const entidadId = req.params.id;
    try {
        const emails = await EmailsPorEntidadNegocio.findAll({
            where: { EntidadNegocioId: entidadId },
        });

        if (!emails || emails.length === 0) {
            return res.status(404).json({ message: 'No existen emails relacionados con esta empresa' });
        }

        return res.status(200).json(emails);
    } catch (error) {
        console.error('Error al obtener los emails:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const crearEmailEmpresa = async (req, res) => {
    const emailsBody = req.body;

    try {
		const empresaExiste = await validarEntidad(emailsBody.EntidadNegocioId, EntidadNegocio, res);
        if (!empresaExiste) return;

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
            message: `Se ha creado el correo ${datosEmail.EmailId} para la empresa ${emailsBody.EntidadNegocioId}`,
        });
    } catch (error) {
        console.error('Error al crear el correo:', error);
        return res.status(500).json({ error: 'Error al crear el correo' });
    }
};


const editarEmpresaEmails = async (req, res) => {
    const emailsBody = req.body;

    try {
		const empresaExiste = await validarEntidad(emailsBody.EntidadNegocioId, EntidadNegocio, res);
        if (!empresaExiste) return;
		
        const { existe: emailExiste } = await validarEmail(emailsBody.EmailId);

        if (!emailExiste) return;

        const { existe: relacionExiste } = await validarRelacionEmpresaEmail(emailsBody.EntidadNegocioId, emailsBody.EmailId);

        if (!relacionExiste) {
            return res.status(404).json({
                status: 404,
                error: 'El correo no pertenece a la empresa',
            });
        }

        await Email.update(
            {
                Email: emailsBody.Email,
                ActualizadoPor: emailsBody.ActualizadoPor,
                ActualizadoEn: new Date(),
            },
            {
                where: {
                    EmailId: emailsBody.EmailId,
                },
            },
        );

        return res.status(200).json({
            status: 200,
            message: 'Se ha actualizado el correo',
        });
    } catch (error) {
        console.error('Error al actualizar el email:', error);
        return res.status(500).json({ error: 'Error al actualizar el email' });
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

const buscarContactosPorNombreYEntidad = async (req, res) => {
    const { Nombre, EntidadNegocioId } = req.body;
    try {
        const contactos = await VistaContactos.findAll({
            where: {
                NombreContacto: Nombre,
                EntidadNegocioId: EntidadNegocioId
            }
        });

        if (!contactos || contactos.length === 0) {
            return res.status(404).json({ message: 'No hay contactos disponibles' });
        }

        return res.status(200).json(contactos);
    } catch (error) {
        console.error('Error al obtener los contactos:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
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
