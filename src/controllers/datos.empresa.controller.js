import { Connection as sequelize } from '../database/mariadb.database.js';
import {
	EntidadNegocio,
	Domicilio,
} from '../models/datos.entidad.negocio.domicilio.model.js';
import { EmpresaDomicilio } from '../models/empresa.domicilio.model.js';


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

// const buscarIdEmpresa = async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const empresa = await EntidadNegocio.findByPk(id, {
// 			attributes: [
// 				'EntidadNegocioId',
// 				'EsPropietaria',
// 				'RFC',
// 				'NombreComercial',
// 				'ClavePais',
// 				'TaxId',
// 				'ClaveRegimenFiscal',
// 				'PersonaFisica',
// 				'PersonaMoral',
// 				'NombreOficial',
// 				'Estatus',
// 			],
// 		});

// 		if (!empresa) {
// 			return res
// 				.status(404)
// 				.json({ error: 'No se encontró la empresa con el ID proporcionado' });
// 		}

// 		res.json(empresa);
// 	} catch (error) {
// 		console.log('Error al obtener el id de la empresa', error.message);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// };

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


// const crearIdEmpresa = async (req, res) => {
// 	try {
// 		const { entidad, domicilio } = req.body;

// 		const validacionRFC = await EntidadNegocio.findOne({
// 			where: { RFC: entidad.RFC },
// 		});
// 		if (validacionRFC) {
// 			return res.status(409).json({ error: 'El RFC ya existe' });
// 		}

// 		const validacionNombreOficial = await EntidadNegocio.findOne({
// 			where: { NombreOficial: entidad.NombreOficial},
// 		});
// 		if (validacionNombreOficial) {
// 			return res.status(409).json({ error: 'El nombre oficial ya existe' });
// 		}

	
// 		const resultEntidad = await EntidadNegocio.create(entidad);
// 		const resultDomicilio = await Domicilio.create(domicilio);
// 		const { dataValues } = resultEntidad;
// 		console.log('hola soy entidad', dataValues.EntidadNegocioId);

// 		return res.status(200).json({
// 			status: 'Ok',
// 			message: 'Entidad de negocio creada con éxito',
// 			empresa: resultEntidad,
// 			domicilio: resultDomicilio,
// 		});
// 	} catch (error) {
// 		console.error('Error al crear entidad de negocio:', error.stack);
// 		res.status(500).json({ success: false, error: error.stack });
// 	}
// };

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
	try {
		const EntidadNegocioId = req.params.id;
		const { EntidadNegocioId: _, ...datosEmpresa } = req.body.entidad;
		const { SucursalId, ...datosDomicilio } = req.body.domicilio;

		const empresa = await EntidadNegocio.findByPk(EntidadNegocioId);
		if (!empresa) {
			return res
				.status(404)
				.json({ error: 'No se encontró la empresa con el ID proporcionado' });
		}

		const domicilio = await Domicilio.findOne({
			where: { EntidadNegocioId: EntidadNegocioId },
		});
		if (!domicilio) {
			return res
				.status(404)
				.json({ error: 'No se encontró un domicilio asociado con la empresa' });
		}
		console.log(datosEmpresa);
		console.log(datosDomicilio);
		await EntidadNegocio.update(datosEmpresa, {
			where: { EntidadNegocioId: EntidadNegocioId },
		});
		await Domicilio.update(datosDomicilio, {
			where: { EntidadNegocioId: EntidadNegocioId },
		});

		res.json({
			success: true,
			message: 'Empresa y domicilio actualizados con éxito',
		});
	} catch (error) {
		console.log('Error al actualizar la empresa', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const desactivarIdEmpresa = async (req, res) => {
	console.log('aqui estoy desactivar empresa');
	try {
		const { id } = req.params;
		if (!id) {
			return res
				.status(400)
				.json({ error: 'ID de la entidad de negocio no proporcionado' });
		}
		const entidad = await EntidadNegocio.findByPk(id);
		console.log(id);
		if (!entidad) {
			return res
				.status(404)
				.json({ error: 'Entidad de negocio no encontrada' });
		}

		if (entidad.Estatus === 0) {
			return res
				.status(400)
				.json({ error: 'La entidad de negocio ya está desactivada' });
		}

		entidad.Estatus = 0;
		entidad.BorradoPor = req.body.BorradoPor;
		entidad.BorradoEn = new Date();

		await entidad.save();

		console.log('Entidad de negocio desactivada con éxito');
		res.status(200).json({
			success: true,
			message: 'Entidad de negocio desactivada con éxito',
		});
	} catch (error) {
		console.error('Error al desactivar entidad de negocio:', error.message);
		res.status(500).json({ success: false, error: 'Internal Server Error' });
	}
};

export const  methods = {
    obtenerIdEmpresa,
    buscarIdEmpresa,
    crearIdEmpresa,
    editarIdEmpresa,
    desactivarIdEmpresa,
};