import { Linea } from '../models/index.js';
import { Bitacora } from '../helpers/logs/log.js';
import { buscadorLineaPorNombre, buscadorLineasPorSubFamiliaId } from '../helpers/buscadores.js';
import { validaLineaPorId, validaLineaPorNombre, validaSubfamiliaPorId } from '../middlewares/finders/index.js';

const obtenerLineas = async (req, res) => {
	try {
		const datos = await Linea.findAll();

		if (datos.length < 1) {
			return res.status(404).send({
				status: 'Error',
				message: 'No se encontraron lineas',
			});
		}

		res.status(200).send({
			status: 'OK',
			message: 'Lineas encontradas',
			lineas: datos,
		});
	} catch (error) {
		console.error(error);
		Bitacora('obtenerLineas', error);
		res.status(500).send({
			status: 'Error',
			message: 'Error al obtener las lineas',
		});
	}
};

const buscarLineasPorNombre = async (req, res) => {
	try {
		const { NombreLinea } = req.params;
		const resultado = await buscadorLineaPorNombre(NombreLinea);

		if (!resultado.existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'No se encontraron lineas',
			});
		}

		res.status(200).send({
			status: 'OK',
			message: `Lineas encontradas con el nombre ${NombreLinea}`,
			lineas: resultado.data,
		});
	} catch (error) {
		Bitacora('buscarLineasPorNombre', error);
		res.status(500).send({
			status: 'Error',
			message: 'Error al buscar las lineas',
		});
	}
};

const buscarLineasPorSubFamiliaId = async (req, res) => {
	try {
		const { SubFamiliaId } = req.params;
		const resultado = await buscadorLineasPorSubFamiliaId(SubFamiliaId);

		if (!resultado.existe) {
			return res.status(404).send({
				status: 'Error',
				message: 'No se encontraron lineas',
			});
		}

		res.status(200).send({
			status: 'OK',
			message: `Lineas encontradas con la subfamiliaId ${SubFamiliaId}`,
			lineas: resultado.data,
		});
	} catch (error) {
		Bitacora('buscarLineasPorSubFamiliaId', error);
		res.status(500).send({
			status: 'Error',
			message: 'Error al buscar las lineas',
		});
	}
};

const crearLinea = async (req, res) => {
	try {
		const lineaBody = req.body;
		lineaBody.CreadoEn = new Date();
		const subfamiliaExistente = await validaSubfamiliaPorId(
			lineaBody.SubFamiliaId,
		);
		if (!subfamiliaExistente.existe) {
			return res.status(404).json({
				status: 404,
				error: 'La subfamilia no existe',
			});
		}
		const nombreExistente = await validaLineaPorNombre(lineaBody.NombreLinea);
		if (nombreExistente.existe) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre de la linea ya existe',
			});
		}

		return res.status(200).send({
			status: 'OK',
			message: 'Linea creada correctamente',
			linea: await Linea.create(lineaBody),
		});
	} catch (error) {
		Bitacora('crearLinea', error);
		res.status(500).send({
			status: 'Error',
			message: 'Error al crear la linea',
		});
	}
};

const actualizarLinea = async (req, res) => {
	try {
		const lineaBody = req.body;
		lineaBody.ActualizadoEn = new Date();
		const idExistente = await validaLineaPorId(lineaBody.LineaId);
		if (!idExistente.existe) {
			return res.status(404).json({
				status: 404,
				error: 'La linea no existe',
			});
		}
		const subfamiliaExistente = await validaSubfamiliaPorId(
			lineaBody.SubFamiliaId,
		);
		if (!subfamiliaExistente.existe) {
			return res.status(404).json({
				status: 404,
				error: 'La subfamilia no existe',
			});
		}
		const nombreExistente = await validaLineaPorNombre(lineaBody.NombreLinea);
		if (
			nombreExistente.existe &&
			nombreExistente.data.LineaId !== lineaBody.LineaId
		) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre de la linea ya existe',
			});
		}

		return res.status(200).send({
			status: 'OK',
			message: 'Linea actualizada correctamente',
			linea: await Linea.update(lineaBody, {
				where: { LineaId: lineaBody.LineaId },
			}),
		});
	} catch (error) {
		Bitacora('actualizarLinea', error);
		res.status(500).send({
			status: 'Error',
			message: 'Error al actualizar la linea',
		});
	}
};

const borrarLinea = async (req, res) => {
	try {
		const lineaBody = req.body;
		lineaBody.BorradoEn = new Date();
		const idExistente = await validaLineaPorId(lineaBody.LineaId);
		if (!idExistente.existe) {
			return res.status(404).json({
				status: 404,
				error: 'La linea no existe',
			});
		}
		return res.status(200).send({
			status: 'OK',
			message: 'Linea eliminada correctamente',
			linea: await Linea.update(
				{ Borrado: true },
				{ where: { LineaId: lineaBody.LineaId } },
			),
		});
	} catch (error) {
		Bitacora('borrarLinea', error);
		res.status(500).send({
			status: 'Error',
			message: 'Error al eliminar la linea',
		});
	}
};

export const methods = {
	obtenerLineas,
	buscarLineasPorNombre,
	buscarLineasPorSubFamiliaId,
	crearLinea,
	actualizarLinea,
	borrarLinea,
};
