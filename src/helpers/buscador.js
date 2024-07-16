import { buscarFormaDePagoPorClave, buscarMetodoDePagoPorClave, buscarClaveUnidadPorClave, buscarProductoPorClave, buscarEmpresaEmailPorId, buscarEmailPorId } from '../middlewares/finders/index.js';
import { Op } from 'sequelize';
const paginado = parseInt(process.env.RegistrosPorPagina) || 10;

const manejadorDBError = error => {
  console.error(error);
  return {
    error: 'Error interno en el servidor',
  };
};

const searchItems = async (modelo, condicion, pagina) => {
  try {
    const data = await modelo.findAndCountAll({
      where: condicion,
      limit: paginado,
      offset: (pagina - 1) * paginado,
    });
    return { existe: true, data };
  } catch (error) {
    return manejadorDBError(error);
  }
};

export const buscarUnidadMedida = async (item, pagina) => {
  const condicion = {
    [Op.or]: {
      VwClaveUnidadSat: { [Op.like]: `%${item}%` },
      NombreUnidadSat: { [Op.like]: `%${item}%` },
    },
  };
  return searchItems(buscarClaveUnidadPorClave, condicion, pagina);
};

export const helpers = {
  buscarFormaDePagoPorClave,
  buscarMetodoDePagoPorClave,
  buscarClaveUnidadPorClave,
  buscarProductoPorClave,
  buscarEmpresaEmailPorId,
  buscarEmailPorId,
  buscarUnidadMedida,
};
