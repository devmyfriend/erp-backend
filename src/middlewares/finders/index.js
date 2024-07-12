import {
	EmpresaEmails,
	Email,
	FormaDePago,
	MetodoDePago,
	ClaveUnidad,
	ProductosServicios,
} from '../../models/index.js';

// Manejador de errores de base de datos
const manejadorDBError = error => {
	console.error(error);
	return {
		mensaje: 'Error interno en el servidor',
	};
};

// Función genérica para buscar un ítem
const buscarItem = async (modelo, condiciones) => {
	try {
		const item = await modelo.findOne({ where: condiciones });
		return item ? { existe: true, data: item.dataValues } : { existe: false };
	} catch (error) {
		return manejadorDBError(error);
	}
};

// Middleware genérico para búsqueda y verificación
const crearMiddlewareBusqueda = (
	modelo,
	condiciones,
	errorMsg,
	nextMsg = null,
) => {
	return async (req, res, next) => {
		const resultado = await buscarItem(modelo, condiciones(req));
		if (resultado.existe) {
			if (nextMsg) {
				req[nextMsg] = resultado.data;
				next();
			} else {
				return res.status(400).json({ error: errorMsg });
			}
		} else {
			if (nextMsg) {
				return res.status(404).json({ error: errorMsg });
			} else {
				next();
			}
		}
	};
};

// Helpers específicos usando el middleware genérico
export const findEmpresaEmail = crearMiddlewareBusqueda(
	EmpresaEmails,
	req => ({ EmailId: req.body.EmailId }),
	'El email no existe',
	'empresaEmail',
);

export const findEmail = crearMiddlewareBusqueda(
	Email,
	req => ({ EmailId: req.body.EmailId }),
	'El email no existe',
	'email',
);

export const findFormaDePago = crearMiddlewareBusqueda(
	FormaDePago,
	req => ({ ClaveFormaPago: req.body.ClaveFormaPago, Activo: 1 }),
	'Ya existe un método de pago con esa clave',
);

export const findMetodoDePago = crearMiddlewareBusqueda(
	MetodoDePago,
	req => ({ ClaveMetodoPago: req.body.ClaveMetodoPago, Activo: 1 }),
	'Ya existe un tipo de pago con esa clave',
);

export const findClaveUnidad = crearMiddlewareBusqueda(
	ClaveUnidad,
	req => ({ ClaveUnidadSat: req.body.ClaveUnidadSat, Activo: 1 }),
	'La clave de unidad ya existe',
);

export const findProductServicesByCode = crearMiddlewareBusqueda(
	ProductosServicios,
	req => ({ ClaveProductoServicio: req.body.ClaveProductoServicio, Activo: 1 }),
	'Ya existe un producto o servicio con esa clave',
);
