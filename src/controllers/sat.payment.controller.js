import { VwFormaDePago, VwMetodoDePago } from '../models/index.js';
import { handleDBOperation, messages } from '../middlewares/finders/index.js';
import { helpers } from '../helpers/buscador.js';
import { Op } from 'sequelize';

const createPaymentMethods = async (req, res) => {
  const paymentBody = req.body;
  await handleDBOperation(
    async () => {
      const existingPaymentMethod = await helpers.buscarVwFormaDePagoPorClave(paymentBody.ClaveFormaPago);
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
      const payment = await helpers.buscarVwFormaDePagoPorClave(paymentBody.ClaveFormaPago);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      return await payment.data.update(paymentBody);
    },
    res,
    messages.success.updated
  );
};

const deletePaymentMethods = async (req, res) => {
  const id = req.params.ClaveFormaPago;
  await handleDBOperation(
    async () => {
      const payment = await helpers.buscarVwFormaDePagoPorClave(id);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      payment.data.Activo = 0;
      await payment.data.save();
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
      const existingPaymentType = await helpers.buscarVwMetodoDePagoPorClave(paymentTypeBody.ClaveMetodoPago);
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
      const payment = await helpers.buscarVwMetodoDePagoPorClave(paymentBody.ClaveMetodoPago);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      return await payment.data.update(paymentBody);
    },
    res,
    messages.success.updated
  );
};

const deletePaymentType = async (req, res) => {
  const id = req.params.ClaveMetodoPago;
  await handleDBOperation(
    async () => {
      const payment = await helpers.buscarVwMetodoDePagoPorClave(id);
      if (!payment.existe) {
        return { error: messages.errors.notFound };
      }
      payment.data.Activo = 0;
      await payment.data.save();
      return payment.data;
    },
    res,
    messages.success.deleted
  );
};

// Esta función parece no estar definida en tu código proporcionado
const searchPaymentTypeByDescription = async (req, res) => {
  const description = req.params.Descripcion;
  await handleDBOperation(
    async () => {
      const data = await VwMetodoDePago.findAll({
        where: {
          Descripcion: { [Op.like]: `%${description}%` },
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

export const methods = {
  createPaymentMethods,
  updatePaymentMethods,
  deletePaymentMethods,
  createPaymentType,
  updatedPaymentType,
  deletePaymentType,
  searchPaymentTypeByDescription
};
