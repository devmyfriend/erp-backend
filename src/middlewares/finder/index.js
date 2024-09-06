import { where } from 'sequelize'
import { 
    empresa
} from  '../../models.index.js'
 
const manejadorDBError = error =>{
    console.error(error)
    return {
        mensaje: 'Error interno en el servidor'
    }
}

const buscarItem = async ( modelo, condiciones ) =>{
    try {

        const item = await modelo.findOne( {where: condiciones} ) 
        return item ? { existe: true, data: item.dataValues }: { existe: false }

    
        }catch( error ){
            return manejadorDBError( error )
        }
}


export const buscarUbicacionesPorId = async id =>
    buscarItem( Ubicaciones,{ Ubicaciones: id, Borrador: 0 } )