import { VwFormaDePago, VwMetodoDePago } from '../models/index.js';
import { handleDBOperation, messages } from '../middlewares/finders/index.js';
import { buscarFormaDePago, buscarMetodoDePago } from '../helpers/buscador.js';

const createPaymentMethods = async (req, res) => {
  const paymentBody = req.body;
  await handleDBOperation(
    async () => {
      const existingPaymentMethod = await buscarFormaDePago(paymentBody.ClaveFormaPago);
      if (existingPaymentMethod.existe) {
        return { error: messages.errors.alreadyExists };
      }
      return await VwFormaDePago.create(paymentBody);
    },
    res,
    messages.success.created
  );
};

const updatePaymentMethods = async (req, res) => {
  const paymentBody = req.body;
  await handleDBOperation(
    async () => {
      const payment = await buscarFormaDePago(paymentBody.ClaveFormaPago);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      return await VwFormaDePago.update(paymentBody, { where: { ClaveFormaPago: paymentBody.ClaveFormaPago } });
    },
    res,
    messages.success.updated
  );
};

const deletePaymentMethods = async (req, res) => {
  const id = req.params.ClaveFormaPago;
  await handleDBOperation(
    async () => {
      const payment = await buscarFormaDePago(id);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      await VwFormaDePago.update({ Activo: 0 }, { where: { ClaveFormaPago: id } });
      return payment.data;
    },
    res,
    messages.success.deleted
  );
};

const createPaymentType = async (req, res) => {
  const paymentTypeBody = req.body;
  await handleDBOperation(
    async () => {
      const existingPaymentType = await buscarMetodoDePago(paymentTypeBody.ClaveMetodoPago);
      if (existingPaymentType.existe) {
        return { error: messages.errors.alreadyExists };
      }
      return await VwMetodoDePago.create(paymentTypeBody);
    },
    res,
    messages.success.created
  );
};

const updatedPaymentType = async (req, res) => {
  const paymentBody = req.body;
  await handleDBOperation(
    async () => {
      const payment = await buscarMetodoDePago(paymentBody.ClaveMetodoPago);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      return await VwMetodoDePago.update(paymentBody, { where: { ClaveMetodoPago: paymentBody.ClaveMetodoPago } });
    },
    res,
    messages.success.updated
  );
};

const deletePaymentType = async (req, res) => {
  const id = req.params.ClaveMetodoPago;
  await handleDBOperation(
    async () => {
      const payment = await buscarMetodoDePago(id);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      await VwMetodoDePago.update({ Activo: 0 }, { where: { ClaveMetodoPago: id } });
      return payment.data;
    },
    res,
    messages.success.deleted
  );
};

const searchPaymentTypeByDescription = async (req, res) => {
  const description = req.params.Descripcion;
  const result = await buscarMetodoDePago(description, 1);

  if (!result.existe || !result.data.rows.length) {
    return res.status(400).json({ error: 'No hay datos disponibles' });
  }

  res.status(200).json({ message: messages.success.found, data: result.data.rows });
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
