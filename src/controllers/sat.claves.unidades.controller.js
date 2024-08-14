import { messages, buscarClaveUnidadPorClave } from '../middlewares/finders/index.js';
import { buscarUnidadMedida } from '../helpers/buscador.js';
import { VwClaveUnidad } from '../models/index.js';
import { Bitacora } from '../helpers/logs/log.js'; // Importar Bitacora

const findAllUnitKeys = (req, res) => {
  const page = req.params.pagina ? Number(req.params.pagina) : 1;
  
  buscarUnidadMedida('', page)
    .then(result => {
      if (!result.existe) {
        return res.status(400).send({ error: 'El resultado solicitado no existe' });
      }

      const totalPages = Math.ceil(result.data.count / 10);
      if (page > totalPages) {
        return res.status(400).send({ error: 'La página solicitada no existe' });
      }

      return res.status(200).send({
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
    })
    .catch(error => {
      console.error(error);
      Bitacora('findAllUnitKeys', error.message || error); 
      return res.status(500).send({ message: 'Error al obtener las claves de unidad' });
    });
};

const findUnitKeysByKey = (req, res) => {
  const key = req.params.clave;
  
  buscarUnidadMedida(key, 1)
    .then(result => {
      if (!result.existe || !result.data.rows.length) {
        return res.status(400).send({ error: 'No hay datos disponibles' });
      }

      return res.status(200).send({ message: messages.success.found, data: result.data.rows });
    })
    .catch(error => {
      console.error(error);
      Bitacora('findUnitKeysByKey', error.message || error); 
      return res.status(500).send({ message: `Error al buscar la clave de unidad con el código: ${key}` });
    });
};

const findUnitKeysByName = (req, res) => {
  const name = req.params.nombre;
  
  buscarUnidadMedida(name, 1)
    .then(result => {
      if (!result.existe || !result.data.rows.length) {
        return res.status(400).send({ error: 'No hay datos disponibles' });
      }

      return res.status(200).send({ message: messages.success.found, data: result.data.rows });
    })
    .catch(error => {
      console.error(error);
      Bitacora('findUnitKeysByName', error.message || error); 
      return res.status(500).send({ message: `Error al buscar la clave de unidad con el nombre: ${name}` });
    });
};

const createUnitKey = (req, res) => {
  const unitKeyBody = req.body;
  
  buscarClaveUnidadPorClave(unitKeyBody.VwClaveUnidadSat)
    .then(validateUnitKey => {
      if (validateUnitKey.existe) {
        return res.status(409).send({ error: 'La clave de unidad ya existe' });
      }

      return VwClaveUnidad.create(unitKeyBody);
    })
    .then(newUnitKey => {
      return res.status(200).send({ message: messages.success.created, data: newUnitKey });
    })
    .catch(error => {
      console.error(error);
      Bitacora('createUnitKey', error.message || error); 
      return res.status(500).send({ message: 'Error al crear la clave de unidad' });
    });
};

const updateUnitKey = (req, res) => {
  const unitKeyBody = req.body;

  buscarClaveUnidadPorClave(unitKeyBody.VwClaveUnidadSat)
    .then(validateUnitKey => {
      if (!validateUnitKey.existe) {
        return res.status(404).send({ error: 'La clave de unidad no existe' });
      }

      return VwClaveUnidad.update(unitKeyBody, {
        where: {
          VwClaveUnidadSat: unitKeyBody.VwClaveUnidadSat,
          Activo: 1,
        },
      }).then(() => validateUnitKey.data);
    })
    .then(updatedUnitKey => {
      return res.status(200).send({ message: messages.success.updated, data: updatedUnitKey });
    })
    .catch(error => {
      console.error(error);
      Bitacora('updateUnitKey', error.message || error); 
      return res.status(500).send({ message: `Error al actualizar la clave de unidad con el código: ${unitKeyBody.VwClaveUnidadSat}` });
    });
};

const deleteUnitKey = (req, res) => {
  const UnitSATKey = req.body.VwClaveUnidadSat;

  buscarClaveUnidadPorClave(UnitSATKey)
    .then(unitKey => {
      if (!unitKey.existe) {
        return res.status(404).send({ error: 'La clave de unidad no existe' });
      }

      return VwClaveUnidad.update({ Activo: false }, { where: { VwClaveUnidadSat: UnitSATKey } })
        .then(() => unitKey.data);
    })
    .then(deletedUnitKey => {
      return res.status(200).send({ message: messages.success.deleted, data: deletedUnitKey });
    })
    .catch(error => {
      console.error(error);
      Bitacora('deleteUnitKey', error.message || error); 
      return res.status(500).send({ message: `Error al eliminar la clave de unidad con el código: ${UnitSATKey}` });
    });
};

export const methods = {
  findAllUnitKeys,
  findUnitKeysByKey,
  findUnitKeysByName,
  createUnitKey,
  updateUnitKey,
  deleteUnitKey,
};
