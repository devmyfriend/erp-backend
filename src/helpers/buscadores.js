import { Op } from 'sequelize';
import { 
    ProductosServicios,
    Ubicaciones,
    Familia,
    Subfamilia,
    Linea,
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
    if (data.count < 1) {
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

const searchItemsAll = async (modelo, condicion) => {
    try {
        const data = await modelo.findAll({
        where: condicion,
        });
        if (data.length < 1) {
            return { existe: false, data: [] };
        }
        return { existe: true, data };
    } catch (error) {
        return manejadorDBError(error);
    }
}

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

export const buscadorFamiliasPorNombre = async (nombre) => {
    const condicion = {
        NombreFamilia: { [Op.like]: `%${nombre}%` },
    };
    return searchItemsAll(Familia, condicion);
}

export const buscadorSubfamiliasPorNombre = async (nombre) => {
    const condicion = {
        NombreSubFamilia: { [Op.like]: `%${nombre}%` },
    };
    return searchItemsAll(Subfamilia, condicion);
}

export const buscadorLineaPorNombre = async (nombre) => {
    const condicion = {
        NombreLinea: { [Op.like]: `%${nombre}%` },
    };
    return searchItemsAll(Linea, condicion);
}

export const buscadorSubfamiliasPorFamiliaId = async (familiaId) => {
    const condicion = {
        FamiliaId: familiaId,
    };
    return searchItemsAll(Subfamilia, condicion);
}

export const buscadorLineasPorSubFamiliaId = async (subfamiliaId) => {
    const condicion = {
        SubFamiliaId: subfamiliaId,
    };
    return searchItemsAll(Linea, condicion);
}