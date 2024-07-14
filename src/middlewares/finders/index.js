
import{ SatMetodoPagoModel, SatMonedaModel } from '../../models/index.js'
import { Ubicaciones } from '../../models/index.js'

const manejadorDBError = error =>{
    console.error(error)
    return {
        mensaje: 'Error interno en el servidor'
    }
}

const buscarItem = async ( modelo, condiciones )=>{
    try{
        const item = await modelo.findOne( {where: condiciones } )
        //console.log(item)
        return item ? { existe: true, data: item.dataValues }: { existe: false }

    }catch( error ){
        return manejadorDBError( error )
    }
}

//METODOS PAGO SAT
export const buscarMetodoPagoSatPorClave = async clave =>
    buscarItem(SatMetodoPagoModel,{ClaveMetodoPago: clave})

//MONEDAS SAT
export const buscarMonedaSatPorClave = async clave =>
    buscarItem(SatMonedaModel,{ClaveMoneda: clave})

export const buscarMonedaSatPorClaveActivo = async clave =>
    buscarItem(SatMonedaModel,{ClaveMoneda: clave, Activo: 1})

export const buscarMonedaSatPorActivo = async Activo =>
    buscarItem(SatMonedaModel,{Activo: Activo})



//Busquedas de Ubicion
export const buscarUbicacionPorId = async id => 
    buscarItem(Ubicaciones,{UbicacionId: id, Borrado: 0 } )
    

