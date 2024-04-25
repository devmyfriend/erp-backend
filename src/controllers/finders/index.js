import {
	Impuesto,
	OwnTax,
	CompoundTax,
} from '../../models/index.js';
import { Op } from 'sequelize';

const handleDatabaseError = error => {
	console.error(error);
	return { message: 'Error interno del servidor' };
};

//  const findOneItem = async (model, whereClause) => {
// 	try {
// 		const item = await model.findOne({ where: whereClause });
// 		return item ? { exist: true, data: item.dataValues } : { exist: false };
// 	} catch (error) {
// 		return handleDatabaseError(error);
//     }
// }

const findAllItems = async (model, whereClause) => {
	try {
		const item = await model.findAll({ where: whereClause });
		return item.length > 0 ? { exist: true, data: item } : { exist: false };
	} catch (error) {
		return handleDatabaseError(error);
    }
}
	
export const findAllTaxByName = async name =>	
	findAllItems(Impuesto, { Activo: 1, Nombre: { [Op.like]: `%${name}%`,} });

export const findAllOwnTaxByName = async name =>
	findAllItems(OwnTax, { Borrado: 0, NombreImpuesto: { [Op.like]: `%${name}%`,} });

export const findAllCompoundTaxByName = async name =>
	findAllItems(CompoundTax, { Borrado: 0, Nombre: { [Op.like]: `%${name}%`,} });