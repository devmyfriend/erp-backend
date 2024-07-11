import { SatMetodoPagoModel } from "../models/satmetodopago.model.js";
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

const CrearSatMetodoPago = async(req, res)=>{
    try{
        const data = req.body;
        const Existe = await buscarMetodoPagoSatPorClave(data.ClaveMetodoPago)

        if (Existe.existe === true){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave del método de pago ya está en uso'
            });
        }

        const Crear = await SatMetodoPagoModel.create({
            ClaveMetodoPago: data.ClaveMetodoPago,
            Descripcion: data.Descripcion,
            Activo: data.Activo
        });
        
        return res.status(200).send({
            status: 'Ok',
            message: 'Se creo método de pago', Crear
        })

    }
    catch(error){
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }

}

const EditarSatMetodoPago = async (req, res) => {
    try{
        const data = req.body;
        const Existe = await buscarMetodoPagoSatPorClave(data.ClaveMetodoPago);
        // console.log(`valor de existe ${ Existe.existe}`)
        if (Existe.existe === false){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave del método de pago no existe'
            });
        }

        const Editar = await SatMetodoPagoModel.update({
            Descripcion: data.Descripcion,
            Activo:  data.Activo,
        },
        {where: {ClaveMetodoPago: data.ClaveMetodoPago}}
        );
        
        return res.status(200).send({
            status: 'OK',
            Message: 'Se actualizó correctamente'
        })
    }
    catch(error){
		console.log(error)
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }
}

export const methods = {
    ObtenerSatMetodoPago,
    CrearSatMetodoPago,
    EditarSatMetodoPago
};