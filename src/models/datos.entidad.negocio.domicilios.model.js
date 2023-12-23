import { EntidadNegocio } from './orgEntidadesnegocio.model.js';
import { Domicilio } from './orgDomicilios.model.js';

EntidadNegocio.hasOne(Domicilio, {
    foreignKey: 'EntidadNegocioId',
    as: 'domicilio',
});
Domicilio.belongsTo(EntidadNegocio, {
    foreignKey: 'EntidadNegocioId',
})