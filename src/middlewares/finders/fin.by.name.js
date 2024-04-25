import { findItem, findAllItems } from './utilities.js';
import { Tax, OwnTax, CompoundTax } from '../../models/index.js';
import { Op } from 'sequelize';

export const findTaxByName = async name =>
	findItem(Tax, { Activo: 1, Nombre: name });
	
export const findOwnTaxByName = async name =>
	findItem(OwnTax, { Borrado: 0, NombreImpuesto: name });

export const findCompoundTaxByName = async name =>
	findItem(CompoundTax, { Borrado: 0, Nombre: name });

export const findAllTaxByName = async name =>	
	findAllItems(Tax, { Activo: 1, Nombre: { [Op.like]: `%${name}%`,} });

export const findAllOwnTaxByName = async name =>
	findAllItems(OwnTax, { Borrado: 0, NombreImpuesto: { [Op.like]: `%${name}%`,} });

export const findAllCompoundTaxByName = async name =>
	findAllItems(CompoundTax, { Borrado: 0, Nombre: { [Op.like]: `%${name}%`,} });