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
            { type: sequelize.QueryTypes.RAW }
        );

        res.json(empresas);
    } catch (error) {
        console.error('Error al obtener las empresas:', error.message);
        res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};


const buscarPorNombreOficial = async (req, res) => {
    const nombreOficial = req.params.nombre;
    try {
        const empresas = await sequelize.query(
            'CALL BuscarEmpresasPorNombreOficial(?)',
            { 
                replacements: [nombreOficial], 
                type: sequelize.QueryTypes.RAW 
            }
        );

        res.json(empresas);
    } catch (error) {
        console.error('Error al buscar las empresas:', error.message);
        res.status(500).json({ error: 'Error al buscar las empresas' });
    }
};


const buscarIdEmpresa = async (req, res) => {
    const entidadId = req.params.id;
    try {
        console.log(entidadId);
        const entidad = await sequelize.query(
            'CALL BuscarEntidadNegocio(?)',
            {
                replacements: [entidadId],
                type: sequelize.QueryTypes.RAW,
            },
        );



        if (!entidad || entidad.Borrado === 1) {
            return res.status(404).json({ message: 'La empresa está eliminada o no existe' });
        }


        res.json(entidad);
    } catch (error) {
        console.error('Error al obtener la entidad:', error.message);
        res.status(500).json({ error: 'Error al obtener la entidad' });
    }
};

const crearIdEmpresa = async (req, res) => {
	const { entidad, domicilio, CreadoPor:creadoPor } = req.body;

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
			
			})
		}

		const crearEntidad = await EntidadNegocio.create({
			CreadoPor: creadoPor,
			EsPropietaria: 1,
			...entidad[0]
		});

		const crearDomicilio = await Domicilio.create({
			...domicilio[0],
			EntidadNegocioId: entidad[0].EntidadNegocioId,
			CreadoPor: creadoPor,
		});

		await EmpresaDomicilio.create({
			EntidadNegocioId: crearEntidad._previousDataValues.EntidadNegocioId,
			DomicilioId: crearDomicilio._previousDataValues.DomicilioId
		});

		console.log(crearEntidad.EntidadNegocioId);
		res.status(200).json({
			status: 200,
			message: 'Se ha creado la empresa',
		});
	} catch (error) {
		console.error('Error al crear la entidad de negocio:', error);
		res.status(500).json({ error: 'Error al crear la entidad de negocio' });
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

		if (entidadExistente.RFC !== entidad[0].RFC) {
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

        const entidadActual = await EntidadNegocio.findByPk(entidad[0].EntidadNegocioId);

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
                error: 'El domicilio no fue asignado correctamente, contacta al administrador',
            });
        }

        await EntidadNegocio.update(actualizacionEntidad, {
            where: {
                EntidadNegocioId: actualizacionEntidad.EntidadNegocioId,
            },
        });

        const domicilioActual = await Domicilio.findByPk(buscarDomicilio.dataValues.DomicilioId);

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
        res.status(500).json({ error: 'Error al actualizar los datos de la empresa' });
    }
};


export const desactivarIdEmpresa = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json({ status: 400, message: 'id es requerido' });
        }

        const entidad = await EntidadNegocio.findOne({
            where: {
                EntidadNegocioId: req.params.id
            },
        });

        if (!entidad) {
            return res
                .status(404)
                .json({ status: 404, message: 'La empresa no existe' });
        }

        if (entidad.Borrado === 1){
            return res
                .status(404)
                .json({ status: 404, message: 'La empresa ya está desactivada' });
        }

        entidad.Borrado = true;
        entidad.BorradoPor = req.body.BorradoPor;

        await entidad.save();
        res.status(200).json({ message: 'La empresa ' + entidad.EntidadNegocioId + ' ha sido desactivada' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const obtenerRegimenesFiscales = async (req, res) => {
	try {
		const regimenes = await regimenFiscal.findAll();
		res.json(regimenes);
	} catch (error) {
		console.log('Error al obtener los regímenes fiscales', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
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
            res.status(404).json({ message: 'No existen contactos relacionados con esta empresa' });
        } else {
            res.json(contactos);
        }
    } catch (error) {
        console.error('Error al obtener los contactos:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const crearEmpresaContacto = async (req, res) => {
    const { EmpresaId: EntidadNegocioId, ...restoDelCuerpo } = req.body;
    const contactoBody = { EntidadNegocioId, ...restoDelCuerpo };

    try {
        const validarEmpresa = await EntidadNegocio.findOne({
            where: {
                EntidadNegocioId: contactoBody.EntidadNegocioId,
            },
        });

        if (!validarEmpresa){
            return res.status(404).json({ message: 'La empresa ya esta en uso' });
        }
        
        const datosContacto = await Contacto.create(contactoBody)

        await EmpresaContacto.create({
            EntidadNegocioId: contactoBody.EntidadNegocioId,
            ContactoId: datosContacto.ContactoId,
        });

        res.status(200).json({
            status: 200,
            message: 'Contacto creado correctamente: ' + datosContacto.ContactoId,
        });
    } catch (error) {
        console.error('Error al crear la relación EmpresaContacto:', error);
        res.status(500).json({ error: 'Error al crear la relación EmpresaContacto' });
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
                ContactoId: contactoBody.ContactoId
            }
        });

        if (!contactoExistente) {
            return res.status(404).json({
                status: 404,
                error: 'Contacto no encontrado',
            });
        }

        await Contacto.update(contactoBody, {
            where: {
                ContactoId: contactoBody.ContactoId
            }
        });

        await EmpresaContacto.update(contactoBody, {
            where: {
                EntidadNegocioId: contactoBody.EntidadNegocioId,
                ContactoId: contactoBody.ContactoId,
            }
        });

        return res.status(200).json({
            message: 'Se ha actualizado el contacto',
        });
    } catch (error) {
        console.error('Error al actualizar la relación EmpresaContacto:', error);
        res.status(500).json({ error: 'Error al actualizar la relación EmpresaContacto' });
    }
};

export const desactivarEmpresaContacto = async (req, res) => {
    try {
        const empresaContacto = await EmpresaContacto.findOne({
            where: {
                EntidadNegocioId: req.body.EntidadNegocioId,
                ContactoId: req.body.ContactoId,
            },
        });

        if (!empresaContacto) {
            return res
                .status(404)
                .json({ status: 404, message: 'El contacto no existe' });
        }

        await empresaContacto.update({
            Borrado: true,
            BorradoPor: req.body.BorradoPor
        });
        
        await Contacto.update({
            Borrado: true,
            BorradoPor: req.body.BorradoPor
        }, {
            where: {
                ContactoId: req.body.ContactoId
            }
        });

        res
            .status(200)
            .json({ message: 'Se ha desactivado el contacto: ' + empresaContacto.EntidadNegocioId });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// EMPRESA X TELEFONO
const buscarTelefonoPorEntidadNegocioId = async (req, res) => {
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

        if (telefono.length === 0) {
            res.status(404).json({ message: 'No existe un teléfono relacionado con esta empresa' });
        } else {
            res.json(telefono);
        }
    } catch (error) {
        console.error('Error al obtener el teléfono:', error.message);
        res.status(500).json({ error: 'Error al obtener el teléfono' });
    }
};

const crearEmpresaTelefono = async (req, res) => {
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
            CreadoPor: telefonoBody.CreadoPor
        });;

        await EmpresaTelefono.create({
            EntidadNegocioId: telefonoBody.EntidadNegocioId,
            TelefonoId: datosTelefono.TelefonoId,
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha creado el telefono' + datosTelefono.TelefonoId,
        });
    } catch (error) {
        console.error('Error al crear el telefono:', error);
        res.status(500).json({ error: 'Error al crear la relación EmpresaTelefono' });
    }
};


const editarEmpresaTelefono = async (req, res) => {
    const { empresa, telefono } = req.body;

    try {
        const validarEmpresa = await EntidadNegocio.findOne({
            where: {
                EntidadNegocioId: empresa[0].EntidadNegocioId,
            },
        });

        if (!validarEmpresa) {
            return res.status(404).json({
                status: 404,
                error: 'Empresa no encontrada',
            });
        }

        const actualizacionTelefono = {
            ...telefono[0],
            ActualizadoPor: telefono[0].ActualizadoPor,
        };

        await Telefono.update(actualizacionTelefono, {
            where: {
                TelefonoId: telefono[0].TelefonoId
            }
        });

        const actualizacionEmpresaTelefono = {
            ...validarEmpresa.dataValues,
            ...empresa[0],
            ActualizadoPor: telefono[0].ActualizadoPor,
        };

        await EmpresaTelefono.update(actualizacionEmpresaTelefono, {
            where: {
                EntidadNegocioId: actualizacionEmpresaTelefono.EntidadNegocioId,
            }
        });

        return res.status(200).json({
            message: 'Se ha actualizado el telefono' + actualizacionEmpresaTelefono.EntidadNegocioId,
        });
    } catch (error) {
        console.error('Error al actualizar la relación EmpresaTelefono:', error);
        res.status(500).json({ error: 'Error al actualizar la relación EmpresaTelefono' });
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
                .json({ status: 404, message: 'La relación EmpresaTelefono no existe' });
        }

        await empresaTelefono.update({
            Borrado: true,
            BorradoPor: req.body.BorradoPor
        });
        
        await Telefono.update({
            Borrado: true,
            BorradoPor: req.body.BorradoPor
        }, {
            where: {
                TelefonoId: req.body.TelefonoId
            }
        });

        res
            .status(200)
            .json({ message: 'Se ha desactivado el telefono: ' + empresaTelefono.EntidadNegocioId });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const buscarEmailsPorEmpresa = async (req, res) => {
    const entidadId = req.params.id;
    try {
        const emails = await sequelize.query(
            'CALL BuscarEmailsPorEntidadNegocioId(?)',
            {
                replacements: [entidadId],
                type: sequelize.QueryTypes.RAW,
            },
        );

        if (emails.length === 0) {
            res.status(404).json({ message: 'No existen emails relacionados con esta empresa' });
        } else {
            res.json(emails);
        }
    } catch (error) {
        console.error('Error al obtener los emails:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
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
            CreadoPor: emailsBody.CreadorPor
        });

        await EmpresaEmails.create({
            EntidadNegocioId: emailsBody.EntidadNegocioId,
            EmailId: datosEmail.EmailId,
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha creado el correo ' + datosEmail.EmailId + ' para la empresa ' + emailsBody.EntidadNegocioId,
        });
    } catch (error) {
        console.error('Error al crear el correo para la empresa:', error);
        res.status(500).json({ error: 'Error al crear el correo' });
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

        await Email.update({
            Email: emailsBody.Email,
            CreadoPor: emailsBody.CreadorPor
        }, {
            where: {
                EmailId: emailsBody.EmailId,
            },
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha actualizado el email',
        });
    } catch (error) {
        console.error('Error al actualizar el email:', error);
        res.status(500).json({ error: 'Error al actualizar el email' });
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
            BorradoPor: req.body.BorradoPor
        });
        
        await Email.update({
            Borrado: true,
            BorradoPor: req.body.BorradoPor
        }, {
            where: {
                EmailId: req.body.EmailId
            }
        });

        res
            .status(200)
            .json({ message: 'Se ha descativado el correo: ' + contactoEmail.EntidadNegocioId });
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
    buscarTelefonoPorEntidadNegocioId,
    crearEmpresaTelefono,
    editarEmpresaTelefono,
    desactivarEmpresaTelefono,
    buscarContactosPorEntidadNegocioId,
    crearEmpresaContacto,
    editarEmpresaContacto,
    desactivarEmpresaContacto,
    buscarEmailsPorEmpresa,
    crearEmailEmpresa,
    editarContactoEmails,
    desactivarContactoEmails,
    obtenerEmpresas,
    buscarPorNombreOficial
};