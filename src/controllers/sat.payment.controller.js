import { paymentMethods } from '../models/sat.payment.methods.model.js';
import { paymentType } from '../models/sat.payment.type.model.js';
import { Op } from 'sequelize';	

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

const createPaymentType = async (req, res) => {
	const paymentTypeBody = req.body;

	try { 
		const validatePaymentType = await paymentType.findOne({
			where: {
				ClaveMetodoPago: paymentTypeBody.ClaveMetodoPago,
				Activo: 1,
			},
		});

		if (validatePaymentType) {
			return res
				.status(400)
				.json({ message: 'Ya existe un tipo de pago con esa clave' });
		}

		await paymentType.create(paymentTypeBody);

		return res.status(200).json({ message: 'Se ha creado el tipo de pago' });
	} catch (error) {
		console.log('Error al crear el tipo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al crear el tipo de pago' });
	}
}

const updatedPaymentType = async (req, res) => {
	const paymentBody =  req.body

	try{
		const payment = await paymentType.findOne({
			where: {
				ClaveMetodoPago: paymentBody.ClaveMetodoPago,
				Activo: 1,
			},
		});

		if (!payment) {
			return res
				.status(404)
				.json({ message: 'No se encontro el tipo de pago' });
		}

		const updatedPayment = await payment.update(paymentBody);

		return res
			.status(200)
			.json({
				message: 'Se ha actualizado el tipo de pago',
				data: updatedPayment,
			});
	} catch(error){
		console.log('Error al actualizar el tipo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al actualizar el tipo de pago' });
	}
}

const deletePaymentType = async (req, res) => {
	const id = req.params.ClaveMetodoPago;

	try {
		const payment = await paymentType.findOne({
			where: {
				ClaveMetodoPago: id,
				Activo: 1,
			},
		});

		if (!payment) {
			return res
				.status(404)
				.json({ message: 'No se encontro el tipo de pago' });
		}

		payment.Activo = 0;
		await payment.save();

		return res
			.status(200)
			.json({ message: 'Se ha eliminado el tipo de pago' });
	} catch (error) {
		console.log('Error al eliminar el tipo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al eliminar el tipo de pago' });
	}
};

const searchPaymentTypeByDescription = async (req, res) => {
	const description = req.params.Descripcion;

	try {
		const payment = await paymentMethods.findAll({
			where: {
				Descripcion: {
					[Op.like]: `%${description}%`,
				},
				Activo: 1,
			},
		});

		return res.status(200).json({ data: payment });
	} catch (error) {
		console.log('Error al buscar el tipo de pago', error);
		return res
			.status(500)
			.json({ message: 'Error al buscar el tipo de pago' });
	}
}

export const methods = {
	createPaymentMethods,
	updatePaymentMethods,
	deletePaymentMethods,
	createPaymentType,
	updatedPaymentType,
	deletePaymentType,
	searchPaymentTypeByDescription,
};
