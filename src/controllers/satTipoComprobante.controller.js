import { TiposComprobantes } from '../models/satTipoComprobante.model.js';
import { validaTiposComprobantes } from '../middlewares/finders/index.js';

const obtenerTiposComprobantes = async (req, res) => {
    try {
        const datos = await TiposComprobantes.findAll();

        if (datos.length < 1) {
            return res.status(404).send({
                status: "Error",
                message: 'No se encontraron tipos de comprobante',
            });
        }

		res.status(200).send({
			status: "OK",
			message: "Tipos de comprobante encontrados",
			data: datos
		});
    } catch (error) {
		console.error(error);
		res.status(500).send({
			status: "Error",
			message: "Error al obtener los tipos de comprobante",
			Error: error
		});
    }
};

const crearTiposComprobantes = async (req, res) => {
	const tiposComprobantesBody = req.body;
	const idExistente = await validaTiposComprobantes(tiposComprobantesBody.ClaveTipoDeComprobante);

	if (idExistente.existe) {
		return res.status(409).json({
			status: 409,
			error: 'El tipo de comprobante ya existe',
		});
	}

	return res
		.status(200)
		.send({ 
			status: "OK",
			message: "Tipo de comprobante creado correctamente",
			data: await TiposComprobantes.create(tiposComprobantesBody),
		});
};

const actualizarTiposComprobantes = async (req, res) => {
	const tiposComprobantesBody = await req.body;
	const idExistente = await validaTiposComprobantes(tiposComprobantesBody.ClaveTipoDeComprobante)

	if (!idExistente.existe) {
		return res.status(404).json({
			status: 404,
			error: 'El tipo de comprobante no existe',
		});
	}

	await TiposComprobantes.update(tiposComprobantesBody, {
		where: { ClaveTipoDeComprobante: tiposComprobantesBody.ClaveTipoDeComprobante },
	})

	return res
		.status(200)
		.send({ 
			status: "OK",
			message: "Tipo de comprobante actualizado correctamente",
			data: tiposComprobantesBody,
		});
};

const borrarTiposComprobantes = async (req, res) => {
	const id = req.body.ClaveTipoDeComprobante;
	const idExistente = await validaTiposComprobantes(id);

	if (!idExistente.existe) {
		return res.status(404).json({
			status: 404,
			error: 'El tipo de comprobante no existe',
		});
	}

	await TiposComprobantes.update({ Borrado: 1 }, {
		where: { ClaveTipoDeComprobante: id },
	})

	return res
		.status(200)
		.send({ 
			status: "OK",
			message: "Tipo de comprobante eliminado correctamente",
			data: id,
		});
};

export const methods = {
	obtenerTiposComprobantes,
	crearTiposComprobantes,
	actualizarTiposComprobantes,
	borrarTiposComprobantes,
};
