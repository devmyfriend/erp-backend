import { Op } from 'sequelize';
import { 
    ProductosServicios,
    Ubicaciones,
} from '../models/index.js';

const paginado = parseInt(process.env.RegistrosPorPagina) || 10;

const manejadorDBError = error => {
  console.error(error);
  return { error: 'Error interno en el servidor' };
};

const searchItems = async (modelo, condicion, pagina) => {
  try {
    const data = await modelo.findAndCountAll({
      where: condicion,
      limit: paginado,
      offset: (pagina - 1) * paginado,
    });
    const TotalPaginas = Math.ceil(data.count / paginado);
    if (pagina > TotalPaginas) {
        return { existe: false, data: [] };
    }
    return { existe: true, data: {
        TotalRegistros: data.count,
        PaginaActual: pagina,
        TotalPaginas,
        Datos: data.rows,
    } };
  } catch (error) {
    return manejadorDBError(error);
  }
};

export const buscadorProductosServiciosPorDescripcion = async (descripcion, pagina) => {
    const condicion = {
        Descripcion: { [Op.like]: `%${descripcion}%` },
    };
    return searchItems(ProductosServicios, condicion, pagina);
}

export const buscadorProductosServiciosPorPalabra = async (palabra, pagina) => {
    const condicion = {
        PalabrasSimilares: { [Op.like]: `%${palabra}%` },
    };
    return searchItems(ProductosServicios, condicion, pagina);
}

export const buscadorUbicacionesPorNombre = async (nombre, pagina) => {
    const condicion = {
        Nombre: { [Op.like]: `%${nombre}%` },
    };
    return searchItems(Ubicaciones, condicion, pagina);
}