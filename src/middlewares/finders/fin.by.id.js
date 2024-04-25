import { findItem } from './utilities.js';
import { Impuesto, OwnTax, CompoundTax } from '../../models/index.js';

export const findTaxById = async code =>
	findItem(Impuesto, { Activo: 1, ClaveImpuesto: code });
	
export const findOwnTaxById = async code =>
	findItem(OwnTax, { Borrado: 0, cfgImpuestoId: code });	
	
export const findCompoundTaxById = async code =>
	findItem(CompoundTax, { Borrado: 0, ImpuestoCompuestoId: code });
