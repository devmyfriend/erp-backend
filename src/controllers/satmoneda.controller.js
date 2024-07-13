import { SatMonedaModel } from "../models/satmoneda.model.js";
import { buscarMonedaSatPorClave } from "../middlewares/finders/index.js"; 

const CrearSatMoneda = async(req, res)=>{
    try{
        const data = req.body;
        const Existe = await buscarMonedaSatPorClave(data.ClaveMoneda)

        if (Existe.existe === true){
            return res.status(404).send({
                status: 'Error',
                message: 'La clave de moneda SAT ya está en uso'
            });
        }

        const Crear = await SatMonedaModel.create({
            ClaveMoneda: data.ClaveMoneda,
            Descripcion: data.Descripcion,
            Activo: true
        });
        
        return res.status(200).send({
            status: 'Ok',
            message: 'Se creo moneda SAT', 
            data: Crear
        })

    }
    catch(error){
        return res.status(500).send({
            errors: 'Error al obtener los datos'
        });
    }

}