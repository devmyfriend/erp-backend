const handleDatabaseError = error => {
	console.error(error);
	return { message: 'Error interno del servidor' };
};

export const findItem = async (model, whereClause) => {
	try {
		const item = await model.findOne({ where: whereClause });
		return item ? { exist: true, data: item.dataValues } : { exist: false };
	} catch (error) {
		return handleDatabaseError(error);
    }
}

export const findAllItems = async (model, whereClause) => {
	try {
		const item = await model.findAll({ where: whereClause });
		return item.length > 0 ? { exist: true, data: item } : { exist: false };
	} catch (error) {
		return handleDatabaseError(error);
    }
}