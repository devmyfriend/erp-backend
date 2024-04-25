import {
	Impuesto,
	OwnTax,
	CompoundTax,
} from '../../models/index.js';

const handleDatabaseError = error => {
	console.error(error);
	return { message: 'Error interno del servidor' };
};

export const findItem = async (model, whereClause) => {
	try {
		const item = await model.findOne({ where: whereClause });
		console.log( 'La validación es: ' + item ? { exist: true, data: item.dataValues } : { exist: false } );
		return item ? { exist: true, data: item.dataValues } : { exist: false };
	} catch (error) {
		return handleDatabaseError(error);
    }
}

export const findTaxById = async code =>
	findItem(Impuesto, { Activo: 1, ClaveImpuesto: code });
	
export const findTaxByName = async name =>
	
	findItem(Impuesto, { Activo: 1, Nombre: name });
	
export const findOwnTaxById = async code =>
	findItem(OwnTax, { Borrado: 0, cfgImpuestoId: code });

export const findOwnTaxByName = async name =>
	findItem(OwnTax, { Borrado: 0, NombreImpuesto: name });

export const findCompoundTaxById = async code =>
	findItem(CompoundTax, { Borrado: 0, ImpuestoCompuestoId: code });

export const findCompoundTaxByName = async name =>
	findItem(CompoundTax, { Borrado: 0, Nombre: name });