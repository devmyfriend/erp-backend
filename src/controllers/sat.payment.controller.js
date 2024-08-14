import { VwFormaDePago, VwMetodoDePago } from '../models/index.js';
import { handleDBOperation, messages } from '../middlewares/finders/index.js';
import { buscarFormaDePago, buscarMetodoDePago } from '../helpers/buscador.js';
import { Bitacora } from '../helpers/logs/log.js';

const createPaymentMethods = (req, res) => {
  const paymentBody = req.body;

  handleDBOperation(
    () => {
      return buscarFormaDePago(paymentBody.ClaveFormaPago)
        .then(existingPaymentMethod => {
          if (existingPaymentMethod.existe) {
            return { error: messages.errors.alreadyExists };
          }
          return VwFormaDePago.create(paymentBody);
        });
    },
    res,
    messages.success.created
  ).catch(error => {
    console.error(error);
    Bitacora('createPaymentMethods', error.message || error);
    res.status(500).send({ message: 'Error al crear el método de pago' });
  });
};

const updatePaymentMethods = (req, res) => {
  const paymentBody = req.body;

  handleDBOperation(
    () => {
      return buscarFormaDePago(paymentBody.ClaveFormaPago)
        .then(payment => {
          if (!payment.existe) {
            return { error: messages.errors.notFound };
          }
          return VwFormaDePago.update(paymentBody, { where: { ClaveFormaPago: paymentBody.ClaveFormaPago } });
        });
    },
    res,
    messages.success.updated
  ).catch(error => {
    console.error(error);
    Bitacora('updatePaymentMethods', error.message || error);
    res.status(500).send({ message: 'Error al actualizar el método de pago' });
  });
};

const deletePaymentMethods = (req, res) => {
  const id = req.params.ClaveFormaPago;

  handleDBOperation(
    () => {
      return buscarFormaDePago(id)
        .then(payment => {
          if (!payment.existe) {
            return { error: messages.errors.notFound };
          }
          return VwFormaDePago.update({ Activo: 0 }, { where: { ClaveFormaPago: id } })
            .then(() => payment.data);
        });
    },
    res,
    messages.success.deleted
  ).catch(error => {
    console.error(error);
    Bitacora('deletePaymentMethods', error.message || error);
    res.status(500).send({ message: 'Error al eliminar el método de pago' });
  });
};

const createPaymentType = (req, res) => {
  const paymentTypeBody = req.body;

  handleDBOperation(
    () => {
      return buscarMetodoDePago(paymentTypeBody.ClaveMetodoPago)
        .then(existingPaymentType => {
          if (existingPaymentType.existe) {
            return { error: messages.errors.alreadyExists };
          }
          return VwMetodoDePago.create(paymentTypeBody);
        });
    },
    res,
    messages.success.created
  ).catch(error => {
    console.error(error);
    Bitacora('createPaymentType', error.message || error);
    res.status(500).send({ message: 'Error al crear el tipo de pago' });
  });
};

const updatedPaymentType = (req, res) => {
  const paymentBody = req.body;

  handleDBOperation(
    () => {
      return buscarMetodoDePago(paymentBody.ClaveMetodoPago)
        .then(payment => {
          if (!payment.existe) {
            return { error: messages.errors.notFound };
          }
          return VwMetodoDePago.update(paymentBody, { where: { ClaveMetodoPago: paymentBody.ClaveMetodoPago } });
        });
    },
    res,
    messages.success.updated
  ).catch(error => {
    console.error(error);
    Bitacora('updatedPaymentType', error.message || error);
    res.status(500).send({ message: 'Error al actualizar el tipo de pago' });
  });
};

const deletePaymentType = (req, res) => {
  const id = req.params.ClaveMetodoPago;

  handleDBOperation(
    () => {
      return buscarMetodoDePago(id)
        .then(payment => {
          if (!payment.existe) {
            return { error: messages.errors.notFound };
          }
          return VwMetodoDePago.update({ Activo: 0 }, { where: { ClaveMetodoPago: id } })
            .then(() => payment.data);
        });
    },
    res,
    messages.success.deleted
  ).catch(error => {
    console.error(error);
    Bitacora('deletePaymentType', error.message || error);
    res.status(500).send({ message: 'Error al eliminar el tipo de pago' });
  });
};

const searchPaymentTypeByDescription = (req, res) => {
  const description = req.params.Descripcion;

  buscarMetodoDePago(description, 1)
    .then(result => {
      if (!result.existe || !result.data.rows.length) {
        return res.status(400).send({ error: 'No hay datos disponibles' });
      }

      return res.status(200).send({ message: messages.success.found, data: result.data.rows });
    })
    .catch(error => {
      console.error(error);
      Bitacora('searchPaymentTypeByDescription', error.message || error);
      res.status(500).send({ message: 'Error al buscar el tipo de pago por descripción' });
    });
};

export const methods = {
  createPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
  createPaymentType,
  updatedPaymentType,
  deletePaymentType,
  searchPaymentTypeByDescription
};
