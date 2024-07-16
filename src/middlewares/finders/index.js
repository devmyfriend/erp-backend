import {
	VwFormaDePago,
	VwMetodoDePago,
	VwClaveUnidad,
	VwProductosServicios,
	VwEmpresaEmails,
	VwEmail,
} from '../../models/index.js';

// Manejador de errores de base de datos
const manejadorDBError = error => {
	console.error('DB Error:', error);
	return {
		mensaje: 'Error interno en el servidor',
	};
};

// Función genérica para buscar un ítem
const buscarItem = async (modelo, condiciones) => {
	try {
		console.log('Condiciones de búsqueda:', condiciones);
		const item = await modelo.findOne({ where: condiciones });
		return item ? { existe: true, data: item.dataValues } : { existe: false };
	} catch (error) {
		console.error('Error en buscarItem:', error);
		return manejadorDBError(error);
	}
};

// Funciones específicas de búsqueda
export const buscarFormaDePagoPorClave = async clave =>
	buscarItem(VwFormaDePago, { ClaveFormaPago: clave, Activo: 1 });

export const buscarMetodoDePagoPorClave = async clave =>
	buscarItem(VwMetodoDePago, { ClaveMetodoPago: clave, Activo: 1 });

export const buscarClaveUnidadPorClave = async clave =>
	buscarItem(VwClaveUnidad, { VwClaveUnidadSat: clave, Activo: 1 });

export const buscarProductoPorClave = async clave =>
	buscarItem(VwProductosServicios, { ClaveProductoServicio: clave, Activo: 1 });

export const buscarEmpresaEmailPorId = async id =>
	buscarItem(VwEmpresaEmails, { VwEmailId: id, Borrado: false });

export const buscarEmailPorId = async id =>
	buscarItem(VwEmail, { VwEmailId: id, Borrado: false });

// Manejador de operaciones en la base de datos
export const handleDBOperation = async (operation, res, successMessage) => {
	try {
		const result = await operation();
		if (result.error) {
			return res.status(400).json({ error: result.error });
		}
		return res.status(200).json({ message: successMessage, data: result });
	} catch (error) {
		console.log('DB Operation Error:', error);
		return res.status(500).json({ error: 'Error interno del servidor' });
	}
};

// Mensajes de error y éxito
export const messages = {
	errors: {
		alreadyExists: 'Ya existe un registro con esa clave',
		notFound: 'No se encontró el registro',
	},
	success: {
		created: 'Registro creado exitosamente',
		updated: 'Registro actualizado exitosamente',
		deleted: 'Registro eliminado exitosamente',
		found: 'Registros encontrados',
	},
};
