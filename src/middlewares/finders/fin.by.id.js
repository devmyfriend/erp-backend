import { Tax, OwnTax, CompoundTax } from '../../models/index.js';

const handleDatabaseError = error => {
	console.error(error);
	return { message: 'Error interno del servidor' };
};

const findItem = async (model, whereClause) => {
	try {
		const item = await model.findOne({ where: whereClause });
		return item ? { exist: true, data: item.dataValues } : { exist: false };
	} catch (error) {
		return handleDatabaseError(error);
    }
}

export const findTaxById = async code =>
	findItem(Tax, { Activo: 1, ClaveImpuesto: code });
	
export const findOwnTaxById = async code =>
	findItem(OwnTax, { Borrado: 0, cfgImpuestoId: code });	
	
export const findCompoundTaxById = async code =>
	findItem(CompoundTax, { Borrado: 0, ImpuestoCompuestoId: code });
