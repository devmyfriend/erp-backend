import { Connection as sequelize } from '../database/mariadb.database.js';
import { EntidadNegocio } from '../models/orgEntidadesNegocio.model.js';
import { Domicilio } from '../models/orgDomicilios.model.js';
import { EmpresaDomicilio } from '../models/empresa.domicilio.model.js';
import { regimenFiscal } from '../models/sat.regimen.fiscal.model.js';

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

export const  methods = {
    obtenerIdEmpresa,
    buscarIdEmpresa,
    crearIdEmpresa,
    editarIdEmpresa,
	obtenerRegimenesFiscales,
    desactivarIdEmpresa,
};