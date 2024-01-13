import { Connection as sequelize } from '../database/mariadb.database.js';
import { EntidadNegocio } from '../models/orgEntidadesNegocio.model.js';
import { Domicilio } from '../models/orgDomicilios.model.js';
import { EmpresaDomicilio } from '../models/empresa.domicilio.model.js';
import { regimenFiscal } from '../models/sat.regimen.fiscal.model.js';
import { Telefono } from '../models/telefono.model.js';
import { Contacto } from '../models/contacto.model.js';
import { EmpresaContacto } from '../models/empresa.contacto.model.js';
import { EmpresaTelefono } from '../models/empresa.telefono.model.js';

const obtenerIdEmpresa = async (req, res) => {
	try {
		const id = req.params.id; 
		const empresa = await EntidadNegocio.findByPk(id, {
			attributes: [
				'EntidadNegocioId',
				'EsPropietaria',
				'RFC',
				'NombreComercial',
				'ClavePais',
				'TaxId',
				'ClaveRegimenFisca;',
				'PersonaFisica',
				'PersonaMoral',
				'NombreOficial',
				'Estatus',
			],
			include: [
				{
					model: Domicilio,
					as: 'domicilio',
					attributes: [
						'DomicilioId',
						'Calle',
						'NumeroExt',
						'NumeroInt',
						'CodigoPostal',
						'ClaveEstado',
						'ClaveMunicipio',
						'ClaveLocalidad',
						'ClaveColonia',
						'ClavePais',
					],
				},
			],
		});
		console.log(empresa);
		if (!empresa) {
			return res
				.status(404)
				.json({ error: 'No se encontró la empresa con el ID proporcionado' });
		}

		res.json(empresa);
	} catch (error) {
		console.log('Error al obtener el id de la empresa', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
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
			message: 'Se ha creado la entidad de negocio',
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
                error: 'No se ha encontrado la entidad de negocio solicitada',
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
            message: 'Entidad de negocio actualizada',
        });
    } catch (error) {
        console.error('Error al actualizar la entidad de negocio:', error);
        res.status(500).json({ error: 'Error al actualizar la entidad de negocio' });
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
                .json({ status: 404, message: 'La entidad de negocio no existe' });
        }

        if (entidad.Borrado === 1){
            return res
                .status(404)
                .json({ status: 404, message: 'La entidad de negocio ya está desactivada' });
        }

        entidad.Borrado = true;
        entidad.BorradoPor = req.body.BorradoPor;

        await entidad.save();
        res.status(200).json({ message: 'Entidad de negocio desactivada: ' + entidad.EntidadNegocioId });
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

//// ADICION DE DATOS A LA TABLA UNICAMENTE

// const crearEmpresaContacto = async (req, res) => {
//     const { EntidadNegocioId, ContactoId, CreadoPor } = req.body;

//     try {
//         const nuevoEmpresaContacto = await EmpresaContacto.create({
//             EntidadNegocioId,
//             ContactoId,
//             CreadoPor
//         });

//         res.status(201).json({
//             message: 'Relación creada exitosamente',
//             empresaContacto: nuevoEmpresaContacto
//         });
//     } catch (error) {
//         console.error('Error al crear la relación:', error.message);
//         res.status(500).json({ error: 'Error al crear la relación' });
//     }
// };

//// ADICION DE DATOS A LA TABLA UNICAMENTE

const crearEmpresaContacto = async (req, res) => {
    const { empresa, contacto } = req.body;

    try {
        const validarEmpresa = await EntidadNegocio.findOne({
            where: {
                EntidadNegocioId: empresa[0].EntidadNegocioId,
            },
        });

        const { ContactoId, ...contactoData } = contacto[0];

        const datosContacto = await Contacto.create({
            CreadoPor: contactoData.CreadoPor,
            ...contactoData
        })

        await EmpresaContacto.create({
            EntidadNegocioId: empresa[0].EntidadNegocioId,
            ContactoId: datosContacto.ContactoId,
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha creado la relación EmpresaContacto',
        });
    } catch (error) {
        console.error('Error al crear la relación EmpresaContacto:', error);
        res.status(500).json({ error: 'Error al crear la relación EmpresaContacto' });
    }
};


const editarEmpresaContacto = async (req, res) => {
    const { empresa, contacto } = req.body;

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

        const { ContactoId, ...contactoData } = contacto[0];

        const contactoExistente = await Contacto.findOne({
            where: {
                ContactoId: ContactoId
            }
        });

        if (!contactoExistente) {
            return res.status(404).json({
                status: 404,
                error: 'Contacto no encontrado',
            });
        }

        const actualizacionContacto = {
            ...contactoExistente.dataValues,
            ...contactoData,
            ...{ ActualizadoPor: contacto[0].ActualizadoPor },
        };

        await Contacto.update(actualizacionContacto, {
            where: {
                ContactoId: actualizacionContacto.ContactoId
            }
        });

        const actualizacionEmpresaContacto = {
            ...validarEmpresa.dataValues,
            ...empresa[0],
            ...{ ActualizadoPor: contacto[0].ActualizadoPor },
        };

        await EmpresaContacto.update(actualizacionEmpresaContacto, {
            where: {
                EntidadNegocioId: actualizacionEmpresaContacto.EntidadNegocioId,
                ContactoId: ContactoId,
            }
        });

        return res.status(200).json({
            message: 'Se ha actualizado la relación EmpresaContacto',
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
                .json({ status: 404, message: 'La relación EmpresaContacto no existe' });
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
            .json({ message: 'Relación EmpresaContacto desactivada: ' + empresaContacto.EntidadNegocioId });
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

const crearTelefonoEmpresa = async (req, res) => {
    const { NumeroTelefonico, ContactoId, CreadoPor: creadoPor, EntidadNegocioId } = req.body;

    try {
        const nuevoTelefono = await Telefono.create({
            NumeroTelefonico,
            ContactoId,
            CreadoPor: creadoPor
        });

        const nuevoTelefonoEmpresa = await EmpresaTelefono.create({
            EntidadNegocioId,
            CreadoPor: creadoPor
        });

        res.status(200).json({
            status: 200,
            message: 'Se ha creado el teléfono de la empresa',
            telefono: nuevoTelefono,
            telefonoEmpresa: nuevoTelefonoEmpresa
        });
    } catch (error) {
        console.log('Error al crear el teléfono de la empresa', error.message);
        res.status(500).json({ error: 'Error al crear el teléfono de la empresa' });
    }
};


export const  methods = {
    obtenerIdEmpresa,
    buscarIdEmpresa,
    crearIdEmpresa,
    editarIdEmpresa,
	obtenerRegimenesFiscales,
    desactivarIdEmpresa,
	buscarTelefonoPorEntidadNegocioId,
	crearTelefonoEmpresa,
	buscarContactosPorEntidadNegocioId,
	crearEmpresaContacto,
	editarEmpresaContacto,
    desactivarEmpresaContacto
};