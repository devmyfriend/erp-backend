import { handleDBOperation, messages, buscarClaveUnidadPorClave } from '../middlewares/finders/index.js';
import { buscarUnidadMedida } from '../helpers/buscador.js';
import { VwClaveUnidad } from '../models/index.js';

const findAllUnitKeys = async (req, res) => {
  const page = req.params.pagina ? Number(req.params.pagina) : 1;
  const result = await buscarUnidadMedida('', page);

  if (!result.existe) {
    return res.status(400).json({ error: 'La página solicitada no existe' });
  }

  const totalPages = Math.ceil(result.data.count / 10);
  if (page > totalPages) {
    return res.status(400).json({ error: 'La página solicitada no existe' });
  }

  res.status(200).json({
    message: messages.success.found,
    data: {
      info: {
        totalPages,
        currentPage: page,
        totalItems: result.data.count,
      },
      items: result.data.rows,
    },
  });
};

const findUnitKeysByKey = async (req, res) => {
  const key = req.params.clave;
  const result = await buscarUnidadMedida(key, 1);

  if (!result.existe || !result.data.rows.length) {
    return res.status(400).json({ error: 'No hay datos disponibles' });
  }

  res.status(200).json({ message: messages.success.found, data: result.data.rows });
};

const findUnitKeysByName = async (req, res) => {
  const name = req.params.nombre;
  const result = await buscarUnidadMedida(name, 1);

  if (!result.existe || !result.data.rows.length) {
    return res.status(400).json({ error: 'No hay datos disponibles' });
  }

  res.status(200).json({ message: messages.success.found, data: result.data.rows });
};

const createUnitKey = async (req, res) => {
  const unitKeyBody = req.body;
  await handleDBOperation(
    async () => {
      const validateUnitKey = await buscarClaveUnidadPorClave(unitKeyBody.VwClaveUnidadSat);

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
      const validateUnitKey = await buscarClaveUnidadPorClave(unitKeyBody.VwClaveUnidadSat);

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
      const unitKey = await buscarClaveUnidadPorClave(UnitSATKey);

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
