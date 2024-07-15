import { ProductosServicios } from '../models/sat.productos.servicios.model.js';
import { ProductosServiciosPorClave, ProductosServiciosPorDescripcion, ProductosServiciosPorPalabra } from './buscadores.controller.js';

const buscarProductosServiciosPorClave = async (req, res) => {
	const { ClaveProductoServicio } = req.body;
	const Pagina = req.body.Pagina || 1;

	console.log('ClaveProductoServicio', ClaveProductoServicio);
	const resultado = await ProductosServiciosPorClave( ClaveProductoServicio, Pagina);

	if (resultado.existe) {
		return res.status(200).json({ response: resultado.data });
	} else {
		return res.status(404).json({ error: 'No hay datos disponibles' });
	}
};

const buscarProductosServiciosPorDescripcion= async (req, res) => {
	const { Descripcion } = req.body;
	const Pagina = req.body.Pagina || 1;
	const resultado = await ProductosServiciosPorDescripcion(Descripcion, Pagina);

	if (resultado.existe) {
		return res.status(200).json({ response: resultado.data });
	}	else {
		return res.status(404).json({ error: 'No hay datos disponibles' });
	}
};

const buscarProductosServiciosPorPalabra = async (req, res) => {
	const { Palabra } = req.body;
	const Pagina = req.body.Pagina || 1;
	const resultado = await ProductosServiciosPorPalabra(Palabra, Pagina);

	if (resultado.existe) {
		return res.status(200).json({ response: resultado.data });
	} else {
		return res.status(404).json({ error: 'No hay datos disponibles' });
	}
};

const crearProductosServicios = async (req, res) => {
	const productServicesBody = req.body;
	try {
		const validateProductServices = await ProductosServicios.findOne({
			where: {
				ClaveProductoServicio: productServicesBody.ClaveProductoServicio,
				Activo: 1,
			},
		});

		if (validateProductServices) {
			return res
				.status(409)
				.json({ error: 'La clave del producto/servicio ya esta en uso ' });
		}

		await ProductosServicios.create(productServicesBody);
		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio creado' });
	} catch (error) {
		console.error('Error al crear el producto/servicio', error.message);
		return res
			.status(500)
			.json({ error: 'Error al crear el producto/servicio' });
	}
};

const actualizarProductosServicios = async (req, res) => {
	const productServicesBody = req.body;
	try {
		const validateProductServices = await ProductosServicios.findOne({
			where: {
				ClaveProductoServicio: productServicesBody.ClaveProductoServicio,
				Activo: 1,
			},
		});

		if (!validateProductServices) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		await ProductosServicios.update(productServicesBody, {
			where: {
				ClaveProductoServicio: productServicesBody.ClaveProductoServicio,
			},
		});

		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio actualizado' });
	} catch (error) {
		console.error('Error al actualizar el producto/servicio', error);
		return res
			.status(500)
			.json({ error: 'Error al actualizar el producto/servicio' });
	}
};

const borrarProductosServicios = async (req, res) => {
	try {
		const product = await ProductosServicios.findOne({
			where: {
				ClaveProductoServicio: req.body.ClaveProductoServicio,
				Activo: 1,
			},
		});

		if (!product) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		product.Activo = false;
		await product.save();

		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio borrado' });
	} catch (error) {
		console.error('Error al borrar el producto/servicio', error);
		return res
			.status(500)
			.json({ error: 'Error al borrar el producto/servicio' });
	}
};

export const methods = {
	buscarProductosServiciosPorClave,
	buscarProductosServiciosPorDescripcion,
	buscarProductosServiciosPorPalabra,
	crearProductosServicios,
	actualizarProductosServicios,
	borrarProductosServicios,
};
