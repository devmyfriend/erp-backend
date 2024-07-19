import { Op } from 'sequelize';
import { ProductosServicios } from '../models/satProductosServicios.model.js';
import { buscadorProductosServiciosPorDescripcion, buscadorProductosServiciosPorPalabra } from '../helpers/buscadores.js';
import { validaClaveProductoServicio } from '../middlewares/finders/index.js';

const buscarProductosServiciosPorClave = async (req, res) => {
	const code = req.params.code;
	try {
		const data = await ProductosServicios.findAll({
			where: { ClaveProductoServicio: { [Op.like]: code }, Activo: 1 },
		});
		if (!data) {
			return res.status(404).json({ error: 'No hay datos disponibles' });
		}

		return res.status(200).json({ response: data });
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const buscarProductosServiciosPorDescripcion= async (req, res) => {
	const { descripcion } = req.params;
	const Page = parseInt(req.query.page) || 1;	
	const resultado = await buscadorProductosServiciosPorDescripcion(descripcion, Page);

	if (!resultado.existe) {
		return res.status(404).send({
			status: "Error",
			message: "No se encontraron productos/servicios",
		})
	}

	res.status(200).send({
		status:  "OK",
		message: "Productos/Servicios encontrados con la descripción " + descripcion,
		data: resultado 
	});
};

const buscarProductosServiciosPorPalabra = async (req, res) => {
	const { palabra } = req.params;
	const Page = parseInt(req.query.page) || 1;	
	const resultado = await buscadorProductosServiciosPorPalabra(palabra, Page);

	if (!resultado.existe) {
		return res.status(404).send({
			status: "Error",
			message: "No se encontraron productos/servicios",
		})
	}

	res.status(200).send({
		status:  "OK",
		message: "Productos/Servicios encontrados con la palabra " + palabra,
		data: resultado 
	});
};

const crearProductosServicios = async (req, res) => {
	const productosServiciosBody = req.body;
	console.log('ClaveProductoServicio: ', productosServiciosBody.ClaveProductoServicio);
	const idExistente = await validaClaveProductoServicio(productosServiciosBody.ClaveProductoServicio);

	if (idExistente.existe) {
		return res
			.status(409)
			.send({ 
				status: "OK",
				message: "La clave del producto/servicio ya esta en uso", 
			});
	}

	return res
		.status(200)
		.send({ 
			status: "OK",
			message: "Producto/Servicio creado",
			data: await ProductosServicios.create(productosServiciosBody),
		});
};

const actualizarProductosServicios = async (req, res) => {
	const productosServiciosBody = req.body;
	const idExistente = await validaClaveProductoServicio(productosServiciosBody.ClaveProductoServicio);

	if (!idExistente.existe) {
		return res
			.status(404)
			.send({ 
				status: "Error",
				message: "Producto/Servicio no encontrado", 
			});
	}

	await ProductosServicios.update(productosServiciosBody, {
		where: {
			ClaveProductoServicio: productosServiciosBody.ClaveProductoServicio,
		},
	});

	return res
		.status(200)
		.send({ 
			status: "OK",
			message: "Producto/Servicio actualizado",
			data: productosServiciosBody,
		});
};

const borrarProductosServicios = async (req, res) => {
	const productosServiciosBody = req.body;
	const idExistente = await validaClaveProductoServicio(productosServiciosBody.ClaveProductoServicio);

	if (!idExistente.existe) {
		return res
			.status(404)
			.send({ 
				status: "Error",
				message: "Producto/Servicio no encontrado", 
			});
	}

	return res
		.status(200)
		.send({ 
			status: "OK",
			message: "Producto/Servicio borrado",
			data: await ProductosServicios.update({ Activo: 0 }, {
				where: {
					ClaveProductoServicio: productosServiciosBody.ClaveProductoServicio,
				},
			}),
		});
};

export const methods = {
	buscarProductosServiciosPorClave,
	buscarProductosServiciosPorDescripcion,
	buscarProductosServiciosPorPalabra,
	crearProductosServicios,
	actualizarProductosServicios,
	borrarProductosServicios,
};
