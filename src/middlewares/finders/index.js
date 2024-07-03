
import {
    Ubicaciones
} from '../../models/index.js'

const manejadorDBError = error =>{
    console.error(error)
    return {
        mensaje: 'Error interno en el servidor'
    }
}

// const ejecutarSP = async ( res, sp, parametros )=>{


//     if(!sp || !parametros ){
//         return res.status(500).send({
//             error: 'No se llamo de forma correcta el sp'
        
//         })
//     }

//     const datos = await conn.query(`CALL ${ sp }(?,?)`,{
//         replacements:[{ ...parametros }] 
//     })

// }


const buscarItem = async ( modelo, condiciones )=>{
    try{

        const item = await modelo.findOne( {where: condiciones } )
        return item ? { existe: true, data: item.dataValues }: { existe: false }

    }catch( error ){
        return manejadorDBError( error )
    }
}


//Busquedas de Ubicion

export const buscarUbicacionPorId = async id => 
    buscarItem( Ubicaciones,{ UbicacionId: id, Borrado: 0 } )

