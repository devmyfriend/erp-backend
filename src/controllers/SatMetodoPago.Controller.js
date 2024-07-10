import { vwSatMetodoPagoModel } from "../models/vwsatmetodopago.model.js";
import { buscarMetodoPagoSatPorClave } from "../middlewares/finders/index.js"; 
import { Op } from "sequelize";

const ObtenerSatMetodoPago = async( req, res) => {
    try{
        const Lista = await vwSatMetodoPagoModel.findAll({
            where:{Activo:true}
        });

        return res.status(200).send({

            status: 'OK', Lista

        });
    }
    catch(error){
        console.error('Error al obtener los datos', error.message);
		return res.status(500).json({ error: 'Error al obtener los datos' });
    }
}

export const methods = {
    ObtenerSatMetodoPago
};