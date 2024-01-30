import { Connection as sequelize } from '../database/mariadb.database.js';
import { paymentMethods } from '../models/sat.payment.methods.model.js';

const createPaymentMethods = async (req, res) => {
	const paymentBody = req.body;

	try {
		const validatePaymenthMethod = await paymentMethods.findOne({
			where: {
				ClaveFormaPago: paymentBody.ClaveFormaPago,
				Activo: 1,
			},
		});

		if (validatePaymenthMethod) {
			return res
				.status(400)
				.json({ message: 'Ya existe un metodo de pago con esa clave' });
		}

		await paymentMethods.create(paymentBody);

		return res.status(200).json({ message: 'Se ha creado el metodo de pago' });
	} catch (error) {
		console.log('Error al crear el metodo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al crear el metodo de pago' });
	}
};

const updatePaymentMethods = async (req, res) => {
	const paymentBody = req.body;

	try {
		const payment = await paymentMethods.findOne({
			where: {
				ClaveFormaPago: paymentBody.ClaveFormaPago,
				Activo: 1,
			},
		});

		if (!payment) {
			return res
				.status(404)
				.json({ message: 'No se encontro el metodo de pago' });
		}

		const updatedPayment = await payment.update(paymentBody);

		return res
			.status(200)
			.json({
				message: 'Se ha actualizado el metodo de pago',
				data: updatedPayment,
			});
	} catch (error) {
		console.log('Error al actualizar el metodo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al actualizar el metodo de pago' });
	}
};

const deletePaymentMethods = async (req, res) => {
	console.log(req.params);
	const id = req.params.ClaveFormaPago;

	try {
		const payment = await paymentMethods.findOne({
			where: {
				ClaveFormaPago: id,
				Activo: 1,
			},
		});

		if (!payment) {
			return res
				.status(404)
				.json({ message: 'No se encontro el metodo de pago' });
		}

		payment.Activo = 0;
		await payment.save();

		return res
			.status(200)
			.json({ message: 'Se ha eliminado el metodo de pago' });
	} catch (error) {
		console.log('Error al eliminar el metodo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al eliminar el metodo de pago' });
	}
};

export const methods = {
	createPaymentMethods,
	updatePaymentMethods,
	deletePaymentMethods,
};
