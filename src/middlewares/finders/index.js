
import{ 
    SatMetodoPagoModel, 
    Ubicaciones, 
    Moneda,
    EntidadNegocio,
    Telefono,
    EmpresaTelefono,
    EmpresaContacto,
    Contacto,
    EmpresaEmails,
    Sucursal,
    SucursalDomicilio,
    Domicilio 
} from '../../models/index.js'

const manejadorDBError = error =>{
    console.error(error)
    return {
        mensaje: 'Error interno en el servidor'
    }
}

const buscarItem = async ( modelo, condiciones )=>{
    try{
        const item = await modelo.findOne( {where: condiciones } )
        return item ? { existe: true, data: item.dataValues }: { existe: false }

    }catch( error ){
        return manejadorDBError( error )
    }
}

/*
    METODOS PAGO SAT
*/
export const buscarMetodoPagoSatPorClave = async clave =>
    buscarItem(SatMetodoPagoModel,{ClaveMetodoPago: clave})


/*
Busquedas de Ubicion
*/
export const buscarUbicacionPorId = async id => 
    buscarItem(Ubicaciones,{UbicacionId: id, Borrado: 0 } )
    

/*
VALIDAR MONEDA
*/

export const validarMoneda = async id => 
    buscarItem(Moneda,{ClaveMoneda: id, Activo: 1 } )

/*
VALIDAR EMPRESA-TELEFONO
*/
export const validarEntidad = async id => 
    buscarItem(EntidadNegocio,{EntidadNegocioId: id, Borrado: 0 } )


export const validarTelefono = async id => 
    buscarItem(Telefono,{TelefonoId: id,} )

export const validarRelacionEmpresaTelefono = async id => 
    buscarItem(EmpresaTelefono,{EntidadNegocioId: id,TelefonoId: id,} )


/*
VALIDAR EMPRESA-CONTACTO
*/
export const validarContacto = async id => 
    buscarItem(Contacto,{ContactoId: id} )

export const validarRelacionEmpresaContacto = async id => 
    buscarItem(EmpresaContacto,{EntidadNegocioId: id,ContactoId: id} )

/*
VALIDAR EMPRESA-EMAIL
*/

export const validarEmail = async id => 
    buscarItem(EmpresaEmails,{EmailId: id} )
export const validarRelacionEmpresaEmail = async (EntidadNegocioId, EmailId) => 
    buscarItem(EmpresaEmails, { EntidadNegocioId, EmailId });


export const validarSucursal = async (SucursalId) => 
    buscarItem(Sucursal, { SucursalId, Borrado: 0 });
export const validarNombreSucursal = async (Nombre) => 
    buscarItem(Sucursal, { Nombre: Nombre || 'null' });
export const buscarDomicilioSucursal = async (SucursalId) => 
    buscarItem(SucursalDomicilio, { SucursalId });
export const buscarDomicilioPorId = async (DomicilioId) => 
    buscarItem(Domicilio, { DomicilioId });