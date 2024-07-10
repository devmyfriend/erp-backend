import { vwSatMetodoPagoModel } from "../models/vwsatmetodopago.model.js";
import { buscarMetodoPagoSatPorClave } from "../middlewares/finders/index.js"; 
import { Op } from "sequelize";

const ObtenerSatMetodoPago = async( req, res) => {
    try{
        const Lista = await vwSatMetodoPagoModel.findAll({
            where:{
                Activo: true
            }
        });

        return res.status(200).send({
            Message: 'OK', Lista
        });
    }
    catch(error){
		return res.status(500).send({ 
            errors: 'Error al obtener los datos'
        });
    }
}

const EditarSatMetodoPago = async( req, res) => {
    try{
        const data = req.body;
        console.log (data);
        const NoExiste = await buscarMetodoPagoSatPorClave(data.ClaveMetodoPago)

        if (NoExiste){
            return res.status(404).send({
                error: 'Error no se encontro el elemento'
            });
        }
        
        const Editar = await vwSatMetodoPagoModel.findOne({where: {ClaveMetodoPago: data.ClaveMetodoPago}})
        Editar.Descripcion = data.Descripcion
        Editar.Activo = data.Activo
        await Editar.save();
        
        return res.status(200).send({
            Message: 'OK', Editar
        });
    }
    catch(error){
		return res.status(500).json({
            errors: 'Error al obtener los datos'
        });
    }
}

export const methods = {
    ObtenerSatMetodoPago,
    EditarSatMetodoPago
};