import { Municipio } from '../models/sat.municipio.model.js';
import { Estado } from "../models/sat.estado.model.js";
import { Colonia } from "../models/sat.colonias.model.js";
import { Localidad } from "../models/sat.localidad.model.js";
import { CodigoPostal } from "../models/sat.codigos.postal.model.js";

const obtenerSATMunicipio = async ( req, res) =>{
    console.log('aqui estoy')
    try {
                
                const listadoMunicipio = await Municipio.findAll({
                    attributes:[ 'ClaveMunicipio', 'ClaveEstado', 'Nombre' ],
                    order:[ [ 'ClaveMunicipio',  'ASC' ] ]
                })  
        
                if(!listadoMunicipio){
                    return res.status(400).send({
                        status: 'Error',
                        message: 'No se encontraron municipios en listados'
                    })
                }
        
                return res.status(200).send({
                    status: 'Ok',
                    listadoMunicipio
                })
    } catch (error) {
        console.log( error );
        return res.status(500).send({
            status: 'Error',
            message: 'No se pudo obtener la informacion solicitada'
        })
    }
};

console.log('controlador ejecutado')
const buscarSATMunicipio = async ( req, res) =>{
    try {
        console.log('aqui estoy');
        const claveMunicipio = req.params.id; 

        const municipio = await Municipio.findOne({
            where: {
                ClaveMunicipio: claveMunicipio,
            },
            attributes: ['ClaveMunicipio', 'ClaveEstado', 'Nombre'],
        });

        if (!municipio) {
            return res.status(400).send({
                status: 'Error',
                message: 'No se encontró el municipio solicitado',
            });
        }

        return res.status(200).send({
            status: 'Ok',
            municipio,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Error',
            message: 'No se pudo obtener la información solicitada',
        });
    }
};

const obtenerSATLocalidad = async ( req, res = Response ) =>{
    try{
            const listadoLocalidad = await Localidad.findAll({
                attributes:[ 'ClaveLocalidad', 'Nombre' ],
                order:[ [ 'ClaveLocalidad',  'ASC' ] ]
            })
    
            if(!listadoLocalidad){
                return res.status(400).send({
                    status: 'Error',
                    message: 'No se encontraron localidades en listados'
                })
            }
    
            return res.status(200).send({
                status: 'Ok',
                listadoLocalidad
            })
    } catch (error) {
        console.log( error )
        return res.status(500).send({
            status: 'Error',
            message: 'No se pudo obtener la información solicitada'
        })
    }
}

const obtenerSATColonias = async ( req, res = response ) =>{
    try{
        
        const listadoColonias = await Colonia.findAll({
            attributes:[ 'ClaveColonia', 'Nombre', 'CodigoPostal'],
            order:[ [ 'ClaveColonia',  'ASC' ] ]
        })

        if(!listadoColonias){
            return res.status(400).send({
                 status: 'Error',
                 message: 'No se encontraron colonias en listados'
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
const obtenerCodigosPostal = async ( req, res = Response ) =>{
    try{
        
        const listadocodigos = await CodigoPostal.findAll({
            attributes:[ 'CodigoPostal', 'ClaveEstado', 'ClaveMunicipio', 'ClaveLocalidad' ],
            order:[ [ 'CodigoPostal',  'ASC' ] ]
        })

        if(!listadocodigos){
            return res.status(400).send({
                 status: 'Error',
                 message: 'No se encontraron codigos postales en listados'
            })
        }

        return res.status(200).send({
             status: 'Ok',
             listadocodigos
        })

    }catch( error ){
        console.log( error )
        return res.status(500).send({
             status: 'Error',
             message: 'No se pudo obtener la información solicitada'
        })
    }
}

const obtenerSATEstado = async ( req, res = Response ) =>{
    console.log('aqui estoy estado')
    try {
            
        const listadoEstado = await Estado.findAll({
            attributes:[ 'ClaveEstado', 'Nombre' ],
            order:[ [ 'ClaveEstado',  'ASC' ] ]
        })

        if(!listadoEstado){
            return res.status(400).send({
                status: 'Error',
                message: 'No se encontraron estados en listados'
            })
        }

        return res.status(200).send({
            status: 'Ok',
            listadoEstado
        })
} catch (error) {
    console.log( error )
    return res.status(500).send({
        status: 'Error',
        message: 'No se pudo obtener la información solicitada'
    })
}
};

export const methods = {
        obtenerSATMunicipio,
        obtenerSATLocalidad,
        obtenerSATEstado,
        obtenerSATColonias,
        buscarSATMunicipio,
        obtenerCodigosPostal,
    }
