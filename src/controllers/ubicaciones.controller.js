import { Ubicaciones } from '../models/ubicaciones.model.js';
import { buscadorUbicacionesPorNombre } from '../helpers/buscadores.js';
import { validaUbicacion, validaUbicacionPorNombre } from '../middlewares/finders/index.js';
import { Bitacora } from '../helpers/logs/log.js';

const obtenerUbicaciones = async (req, res) => {
	try {
		const page = Number(req.query.page) || 1;
		const paginado = parseInt(process.env.RegistrosPorPagina) || 10;
		const datos = await Ubicaciones.findAndCountAll({
			limit: paginado,
			offset: (page - 1) * paginado,
		});

		const TotalPaginas = Math.ceil(datos.count / paginado);
		if (page > TotalPaginas) {
			return res.status(404).send({
				status: "Error",
				message: 'No se encontraron ubicaciones',
			});
		}

		res.status(200).send({
			status: "OK",
			message: "Ubicaciones encontradas",
			ubicaciones: {
				TotalRegistros: datos.count,
				PaginaActual: page,
				TotalPaginas: Math.ceil(datos.count / parseInt(process.env.RegistrosPorPagina)),
				Datos: datos.rows,
			}
		});
	}
	catch (error) {
		console.error(error);
		Bitacora('obtenerUbicaciones', error);
		res.status(500).send({
			status: "Error",
			message: "Error al obtener las ubicaciones",
			Error: error
		});
	}
};

const buscarUbicacionesPorNombre = async (req, res) => {
	try{
		const { Nombre } = req.params;
		const page = Number(req.query.page) || 1;
	
		const resultado = await buscadorUbicacionesPorNombre (Nombre, page);
	
		if (!resultado.existe) {
			return res.status(404).send({
				status: "Error",
				message: "No se encontraron ubicaciones",
			})
		}
	
		res.status(200).send({
			status:  "OK",
			message: `Ubicaciones encontradas con el nombre ${Nombre}`,
			ubicaciones: resultado 
		});
	}catch(error){
		console.error(error);
		Bitacora('buscarUbicacionesPorNombre', error);
		res.status(500).send({
			status: "Error",
			message: "Error al buscar la ubicación",
		});
	}
};

const crearUbicacion = async (req, res) => {
	try{
		const ubicacionBody = req.body;
		const nombreExistente = await validaUbicacionPorNombre(ubicacionBody.Nombre);
	
		if (nombreExistente.existe) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre de la ubicación ya existe',
			});
		}
	
		return res
			.status(200)
			.send({ 
				status: "OK",
				message: "Ubicación creada correctamente",
				ubicacion: await Ubicaciones.create(ubicacionBody),
			});
	}catch(error){
		console.error(error);
		Bitacora('crearUbicacion', error);
		res.status(500).send({
			status: "Error",
			message: "Error al crear la ubicación",
		});
	}
};

const actualizarUbicaciones = async (req, res) => {
	try{
		const ubicacionBody = await req.body;
		const idExistente = await validaUbicacion(ubicacionBody.UbicacionId);
		const nombreExistente = await validaUbicacionPorNombre(ubicacionBody.Nombre);
	
		if (!idExistente.existe) {
			return res.status(404).json({
				status: 404,
				error: 'La ubicación no existe',
			});
		}
	
		if (nombreExistente.existe) {
			return res.status(409).json({
				status: 409,
				error: 'El nombre de la ubicación ya existe',
			});
		}
	
		await Ubicaciones.update(ubicacionBody, {
			where: { UbicacionId: ubicacionBody.UbicacionId },
		})
	
		return res
			.status(200)
			.send({ 
				status: "OK",
				message: "Ubicación actualizada correctamente",
				ubicacion: ubicacionBody,
			});
	}catch(error){
		console.error(error);
		Bitacora('actualizarUbicaciones', error);
		res.status(500).send({
			status: "Error",
			message: "Error al actualizar la ubicación",
		});
	}
};

const borrarUbicaciones = async (req, res) => {
	try{
		const id = req.body.UbicacionId;
		const idExistente = await validaUbicacion(id);
	
		if (!idExistente.existe) {
			return res.status(404).json({
				status: 404,
				error: 'La ubicación no existe',
			});
		}
	
		await Ubicaciones.update({ Borrado: 1 }, {
			where: { UbicacionId: id },
		})
	
		return res
			.status(200)
			.send({ 
				status: "OK",
				message: "Ubicación borrada correctamente",
				ubicacion: id,
			});	
	}catch(error){
		console.error(error);
		Bitacora('borrarUbicaciones', error);
		res.status(500).send({
			status: "Error",
			message: "Error al borrar la ubicación",
		});
	}
};

export const methods = {
	obtenerUbicaciones,
	buscarUbicacionesPorNombre,
	crearUbicacion,
	actualizarUbicaciones,
	borrarUbicaciones,
};
