import { TiposComprobantes } from '../models/satTipoComprobante.model.js';
import { validaTiposComprobantes } from '../middlewares/finders/index.js';
import { Bitacora } from '../helpers/logs/log.js';

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
			comprobantes: datos
		});
    } catch (error) {
		console.error(error);
		Bitacora('obtenerTiposComprobantes', error);
		res.status(500).send({
			status: "Error",
			message: "Error al obtener los tipos de comprobante",
		});
    }
};

const crearTiposComprobantes = async (req, res) => {
	try{
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
				comprobante: await TiposComprobantes.create(tiposComprobantesBody),
			});
	}catch(error){
		Bitacora('crearTiposComprobantes', error);
		res.status(500).send({
			status: "Error",
			message: "Error al crear el tipo de comprobante",
		});
	}
};

const actualizarTiposComprobantes = async (req, res) => {
	try{
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
				comprobante: tiposComprobantesBody,
			});
	}catch(error){
		Bitacora('actualizarTiposComprobantes', error);
		res.status(500).send({
			status: "Error",
			message: "Error al actualizar el tipo de comprobante",
		});
	}
};

const borrarTiposComprobantes = async (req, res) => {
	try{
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
				comprobante: id,
			});
	}catch(error){
		Bitacora('borrarTiposComprobantes', error);
		res.status(500).send({
			status: "Error",
			message: "Error al borrar el tipo de comprobante",
		});
	}
};

export const methods = {
	obtenerTiposComprobantes,
	crearTiposComprobantes,
	actualizarTiposComprobantes,
	borrarTiposComprobantes,
};
