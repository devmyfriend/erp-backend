import { vwContactoPorSucursal } from "../../models/index.js";

import { Op } from "sequelize";
//pendiente
export const buscarContactoFinder = async (idSucursal,nombre) =>{
    const contacto = await vwContactoPorSucursal.findAll({
        where: {
            SucursalId: idSucursal,
            Nombres: {
                [Op.like]: `%${nombre}%`
            }
        }
    });
  
    return contacto;

}

export const buscarItem   = async (modelo,condicion) =>{
    const item = await modelo.findAll({
        where: condicion
    });
  
    return item;
}

export const buscarItemPorId   = async (modelo,id) =>{
    const item = await modelo.findByPk(id);
    return item;
}