import {
    ProductosServicios
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
    buscarItem(ProductosServicios, { ClaveProductoServicio: clave, Activo: 1 });