import { Op } from 'sequelize';
import { ProductosServicios } from './../models/sat.productos.servicios.model.js';

const paginado = parseInt(process.env.RegistrosPorPagina);

const manejadorDBError = error => {
    console.error(error);
    return {
        error: 'Error interno en el servidor',
    };
};

const buscarItems = async (modelo, filtro, pagina) => {
    try {
        const { count: total, rows: datos } = await modelo.findAndCountAll({
            where: {
                [filtro.campo]: { [Op.like]: `%${filtro.valor}%` },
            },
            limit: paginado,
            offset: (pagina - 1) * paginado,
        });

        return total ? 
        { existe: true, data: {
            TotalRegistros: total,
            PaginaActual: pagina,
            TotalPaginas: Math.ceil(total / paginado),
            Datos: datos,
        } } 
        : 
        { existe: false }
    } catch (error) {
        return manejadorDBError(error);
    }
}

export const ProductosServiciosPorClave = async (clave, pagina = 1) => {
    const info = { campo: 'ClaveProductoServicio', valor: clave };
    return buscarItems(ProductosServicios, info, pagina);
}

export const ProductosServiciosPorDescripcion = async (descripcion, pagina = 1) => {
    const info = { campo: 'Descripcion', valor: descripcion };
    return buscarItems(ProductosServicios, info, pagina);
}

export const ProductosServiciosPorPalabra = async (palabra, pagina = 1) => {
    const info = { campo: 'PalabrasSimilares', valor: palabra };
    return buscarItems(ProductosServicios, info, pagina);
}
