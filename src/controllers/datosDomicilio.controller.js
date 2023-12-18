import { Municipio } from '../models/SAT_Municipio.model.js';
import { Estado } from "../models/SAT_Estado.model.js";
import { Localidad } from "../models/SAT_Localidad.model.js";
import { CodigosPostal } from "../model/SAT_CodigosPostal.model.js";

const obtenerSAT_Municipio = async ( req, res = response ) =>{
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
}

const buscarSAT_Municipio = async ( req, res) =>{
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ error: 'Cuerpo de la peticion invalido'});
        }
        const result = await Municipio.findAll({
            attributes:[ 'ClaveMunicipio', 'ClaveEstado', 'Nombre' ],
            where: {
                Nombre: {
                    [Op.like]: `%${data.Nombre}%`
                },
                ClaveEstado: data.ClaveEstado,
                Borrado: 0
                },
            });
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            console.log('Erorr al obtener los datos del Municipio', error.message);
            res.status(500).json({error: 'Internal Server Error'});
        }
}

const obtenerSAT_Localidad = async ( req, res = Response ) =>{
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

const obtenerSAT_Colonias = async ( req, res = response ) =>{
    try{
        
        const listadoColonias = await SAT_Colonias.findAll({
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
        
        const listadocodigos = await CodigosPostal.findAll({
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

const obtenerSAT_Estado = async ( req, res = Response ) =>{
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
}

    module.exports = {
        obtenerSAT_Municipio,
        obtenerSAT_Localidad,
        obtenerSAT_Estado,
        obtenerSAT_Colonias,
        obtenerCodigosPostal
    }
