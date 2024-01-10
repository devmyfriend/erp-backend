import { Colonia } from "../models/sat.colonias.model.js";

const obtenerColoniasPorCodigoPostal = async ( req, res = Response ) =>{
    try{
        const { codigoPostal } = req.params;
        
        const listadoColonias = await Colonia.findAll({
            where: { CodigoPostal: codigoPostal },
            attributes:[ 'idColonia', 'claveColonia', 'codigoPostal', 'nombre'],
            order:[ [ 'claveColonia',  'ASC' ] ]
        })

        if(listadoColonias.length === 0){
            return res.status(400).send({
                 status: 'Error',
                 message: 'No se encontraron colonias para el código postal proporcionado'
            })
        }

        return res.status(200).send({
             status: 'Ok',
             listadoColonias
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             status: 'Error',
             message: 'No se pudo obtener la información solicitada'
        })
    }
}

export const methods = {
    obtenerColoniasPorCodigoPostal
};