import { handleDBOperation, messages } from '../middlewares/finders/index.js';
import { helpers } from '../helpers/buscador.js';
import { VwClaveUnidad } from '../models/vw.Sat.Clave.Unidad.model.js';
import { Op } from 'sequelize';

const findAllUnitKeys = async (req, res) => {
  const page = req.params.pagina ? Number(req.params.pagina) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  await handleDBOperation(
    async () => {
      const { count, rows } = await VwClaveUnidad.findAndCountAll({
        limit,
        offset,
      });

      const totalPages = Math.ceil(count / limit);

      if (page > totalPages) {
        return { error: 'La página solicitada no existe' };
      }

      return {
        info: {
          totalPages,
          currentPage: page,
          totalItems: count,
        },
        items: rows,
      };
    },
    res,
    messages.success.found
  );
};

const findUnitKeysByKey = async (req, res) => {
  const key = req.params.clave;
  await handleDBOperation(
    async () => {
      const data = await VwClaveUnidad.findAll({
        where: {
          VwClaveUnidadSat: { [Op.like]: `%${key}%` },
        },
      });

      if (!data.length) {
        return { error: 'No hay datos disponibles' };
      }

      return data;
    },
    res,
    messages.success.found
  );
};

const findUnitKeysByName = async (req, res) => {
  const name = req.params.nombre;
  await handleDBOperation(
    async () => {
      const data = await VwClaveUnidad.findAll({
        where: {
          NombreUnidadSat: { [Op.like]: `%${name}%` },
        },
      });

      if (!data.length) {
        return { error: 'No hay datos disponibles' };
      }

      return data;
    },
    res,
    messages.success.found
  );
};

const createUnitKey = async (req, res) => {
  const unitKeyBody = req.body;
  await handleDBOperation(
    async () => {
      const validateUnitKey = await helpers.buscarClaveUnidadPorClave(unitKeyBody.VwClaveUnidadSat);

      if (validateUnitKey.existe) {
        return { error: messages.errors.alreadyExists };
      }

      return await VwClaveUnidad.create(unitKeyBody);
    },
    res,
    messages.success.created
  );
};

const updateUnitKey = async (req, res) => {
  const unitKeyBody = req.body;
  await handleDBOperation(
    async () => {
      const validateUnitKey = await helpers.buscarClaveUnidadPorClave(unitKeyBody.VwClaveUnidadSat);

      if (!validateUnitKey.existe) {
        return { error: messages.errors.notFound };
      }

      await VwClaveUnidad.update(unitKeyBody, {
        where: {
          VwClaveUnidadSat: unitKeyBody.VwClaveUnidadSat,
          Activo: 1,
        },
      });

      return validateUnitKey.data;
    },
    res,
    messages.success.updated
  );
};

const deleteUnitKey = async (req, res) => {
  const UnitSATKey = req.body.VwClaveUnidadSat;

  await handleDBOperation(
    async () => {
      const unitKey = await helpers.buscarClaveUnidadPorClave(UnitSATKey);

      if (!unitKey.existe) {
        return { error: messages.errors.notFound };
      }

      await VwClaveUnidad.update({ Activo: false }, { where: { VwClaveUnidadSat: UnitSATKey } });

      return unitKey.data;
    },
    res,
    messages.success.deleted
  );
};

export const methods = {
  findAllUnitKeys,
  findUnitKeysByKey,
  findUnitKeysByName,
  createUnitKey,
  updateUnitKey,
  deleteUnitKey,
};
