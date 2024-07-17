import { Op } from 'sequelize';
import { 
  VwFormaDePago, 
  VwMetodoDePago, 
  VwClaveUnidad, 
  VwProductosServicios, 
  VwEmpresaEmails, 
  VwEmail 
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
  return searchItems(VwClaveUnidad, condicion, pagina);
};

export const buscarFormaDePago = async (descripcion, pagina) => {
  const condicion = {
    Descripcion: { [Op.like]: `%${descripcion}%` },
  };
  return searchItems(VwFormaDePago, condicion, pagina);
};

export const buscarMetodoDePago = async (descripcion, pagina) => {
  const condicion = {
    Descripcion: { [Op.like]: `%${descripcion}%` },
  };
  return searchItems(VwMetodoDePago, condicion, pagina);
};

export const buscarProducto = async (descripcion, pagina) => {
  const condicion = {
    Descripcion: { [Op.like]: `%${descripcion}%` },
  };
  return searchItems(VwProductosServicios, condicion, pagina);
};

export const buscarEmpresaEmail = async (email, pagina) => {
  const condicion = {
    VwEmail: { [Op.like]: `%${email}%` },
  };
  return searchItems(VwEmpresaEmails, condicion, pagina);
};

export const buscarEmail = async (email, pagina) => {
  const condicion = {
    VwEmail: { [Op.like]: `%${email}%` },
  };
  return searchItems(VwEmail, condicion, pagina);
};
