const { Response } = require('express')

const Pais = require( '../models/sat_pais.model' )

const obtenerPaises = async ( req, res = Response ) =>{
    try{
        
        const listadopais = await Pais.findAll({
            attributes:[ 'ClavePais', 'Descripcion' ],
            order:[ [ 'Descripcion',  'ASC' ] ]
        })

        if(!listadopais){
            return res.status(400).send({
                 status: 'Error',
                 message: 'No se encontraron paises en listados'
            })
        }

        return res.status(200).send({
             status: 'Ok',
             listadopais
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             status: 'Error',
             message: 'No se pudo obtener la información solicitada'
        })
    }
}


module.exports = {
    obtenerPaises
}