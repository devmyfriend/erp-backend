import { Op } from "sequelize";
import { Connection as sequelize } from "../database/mariadb.database.js";
import { ProductsServices } from "../models/sat.product.services.model.js";

const findProductServicesByCode = async (req, res) => {
	const code  = req.params.code;
	try {
		const data = await ProductsServices.findAll({
			where: { ClaveProductoServicio: { [Op.like]: code }, Activo: 1 },
		});
		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findProductServicesByDescription = async (req, res) => {
	const descripcion = req.params.descripcion;

	try {
		const data = await ProductsServices.findAll({
			where: { Descripcion: { [Op.like]: `%${descripcion}%`  }, Activo: 1 },
		});
		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}

		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const findProductServicesByMatchWord = async (req, res) => {
	const { palabra } = req.params;
	try {
		const data = await ProductsServices.findAll({
			where: { PalabrasSimilares: { [Op.like]: palabra  }, Activo: 1 },
		});
		if (!data) {
			return res.status(404).json({ message: 'No hay datos disponibles' });
		}
		return res.status(200).json(data);
	} catch (error) {
		console.error('Error al obtener los datos del producto', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
	}
};

const createProductServices = async (req, res) => {
	const productServicesBody = req.body;
	try {
		const validateProductServices = await ProductsServices.findOne({
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

		await ProductsServices.create(productServicesBody);
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
		const [updated] = await ProductsServices.update(productServicesBody, {
			where: {
				ClaveProductoServicio: productServicesBody.ClaveProductoServicio,
				Activo: 1,
			},
		});

		if (!updated) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio actualizado' });
	} catch (error) {
		console.error('Error al actualizar el producto/servicio', error.message);
		return res
			.status(500)
			.json({ error: 'Error al actualizar el producto/servicio' });
	}
};

const deleteProductServices = async (req, res) => {
	const { ClaveProductsServices } = req.body;

	try {
		const product = await ProductsServices.findOne({
			where: { ClaveProductoServicio, Activo: 1 },
		});

		if (!product) {
			return res.status(404).json({ error: 'Producto/Servicio no encontrado' });
		}

		await ProductsServices.update(
			{ Activo: false },
			{ where: { ClaveProductoServicio } },
		);

		return res
			.status(200)
			.json({ success: true, message: 'Producto/Servicio borrado' });
	} catch (error) {
		console.error('Error al borrar el producto/servicio', error.message);
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