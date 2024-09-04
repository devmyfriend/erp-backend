import {
    ProductosServicios,
    TiposComprobantes,
    Ubicaciones,
    Familia,
    Subfamilia,
    Linea,
} from '../../models/index.js';

const manejadorDBError = error => {
console.error('DB Error:', error);
return { mensaje: 'Error interno en el servidor' };
};

const buscarItem = async (modelo, condiciones) => {
try {
    const item = await modelo.findOne({ where: condiciones });
    return item ? { existe: true, data: item.dataValues } : { existe: false };
} catch (error) {
    console.error('Error en buscarItem:', error);
    return manejadorDBError(error);
}
};

export const validaClaveProductoServicio = async clave =>
    buscarItem(ProductosServicios, { ClaveProductoServicio: clave });

export const validaTiposComprobantes = async clave =>
    buscarItem(TiposComprobantes, { ClaveTipoDeComprobante: clave });

export const validaTiposComprobantesDescripcion = async descripcion =>
    buscarItem(TiposComprobantes, { Descripcion: descripcion });

export const validaUbicacion = async id =>
    buscarItem(Ubicaciones, { UbicacionId: id });

export const validaUbicacionPorNombre = async nombre =>
    buscarItem(Ubicaciones, { Nombre: nombre });

export const validaFamiliaPorId = async id =>
    buscarItem(Familia, { FamiliaId: id, Activo: true });

export const validaFamiliaPorNombre = async nombre =>
    buscarItem(Familia, { NombreFamilia: nombre });

export const validaSubfamiliaPorId = async id =>
    buscarItem(Subfamilia, { SubFamiliaId: id });

export const validaSubfamiliaPorNombre = async nombre =>
    buscarItem(Subfamilia, { NombreSubFamilia: nombre });

export const validaLineaPorId = async id =>
    buscarItem(Linea, { LineaId: id });

export const validaLineaPorNombre = async nombre =>
    buscarItem(Linea, { NombreLinea: nombre });