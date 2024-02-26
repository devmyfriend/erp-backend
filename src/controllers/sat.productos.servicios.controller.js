import { Op, Sequelize } from 'sequelize';
import { ProductosServicios } from '../models/sat.productos.servicios.model.js';

const findProductServicesByCode = async (req, res) => {
	const code = req.params.code;
	try {
		const data = await ProductosServicios.findAll({
			where: { ClaveProductoServicio: { [Op.like]: code }, Activo: 1 },
		});
		if (!data) {
			return res.status(404).json({ error: 'No hay datos isponibles' });
		}

		return res.status(200).json({ response: data });
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findProductServicesByDescription = async (req, res) => {
	const descripcion = req.params.descripcion;

	try {
		const data = await ProductosServicios.findAll({
			where: { Descripcion: { [Op.like]: `%${descripcion}%` }, Activo: 1 },
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

const findProductServicesByMatchWord = async (req, res) => {
	const { palabra } = req.params;
	try {
		const data = await ProductosServicios.findAll({
			where: Sequelize.where(
				Sequelize.fn('lower', Sequelize.col('PalabrasSimilares')),
				{
					[Op.like]: `%${palabra.toLowerCase()}%`,
				},
			),
			Activo: 1,
		});
		if (!data) {
			return res.status(404).json({ error: 'No hay datos disponibles' });
		}
		return res.status(200).json({ response: data });
	} catch (error) {
		console.error('Error al obtener los datos del producto', error);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const createProductServices = async (req, res) => {
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

const updateProductServices = async (req, res) => {
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

const deleteProductServices = async (req, res) => {
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
	findProductServicesByCode,
	findProductServicesByDescription,
	findProductServicesByMatchWord,
	createProductServices,
	updateProductServices,
	deleteProductServices,
};
