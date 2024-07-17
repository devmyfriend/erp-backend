import { vwCpSatModel } from "../models/index.js";
import { buscarCP } from "../helpers/buscador.js"; 

// const ListaCP = async (req, res) => {
//     try {
//         const limite = 20; // o cualqier otro limite que se quiera poner
//         const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
//         const consulta = creaCondicion(laCondicion, limite, volumen);
//         const { filas, contador } = await manejarConsultaDB(vwBuscarCpSatModel, consulta);
        
//         if (!filas || filas.length === 0) {
//             console.error('Error al buscar por codigo postal', error.message);
//             return res.status(404).send({
//                 status: "Error",
//                 message: 'No hay registros para mostrar'
//             });
//         }

//         //return enviarRespuestaExito(res, filas, contador, numeroPagina, limite);
//         const totalPaginas = Math.ceil(contador / limite);
        
//         return res.status(200).send({
//             status: 'OK',
//             data: {
//                 totalPaginas,
//                 PaginaActual: numeroPagina,
//                 totalElementos: contador,
//             },
//             Lista: filas,
//         });
//     } catch (error) {
//         return res.status(500).send({
//             Error: 'Error al obtener la familia'
//         });
//     }
// };

const buscarCpPorCP = async (req, res) => {
    try {

        const { cp } = req.params

        const datos = await buscarCP(vwCpSatModel, cp, 1)

        if(!datos.existe){
            return res.status(404).send({
                status: 'Error',
                message: 'No se encontro el dato'
            })
        }

        return res.status(200).send({
            status:'Ok',
            message: 'Se ha encontrado los siguientes datos',
            CodioPosta: datos
        })


        // const { cp } = req.params;
        // const limite = 20; // o cualqier otro limite que se quiera poner
        // const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
        // const laCondicion = {cp: cp}
        // const consulta = creaCondicion(laCondicion, limite, volumen);
        // const { filas, contador } = await manejarConsultaDB(vwCpSatModel, consulta);
        
        // if (!filas || filas.length === 0) {
        //     console.error('Error al buscar por codigo postal', error.message);
        //     return res.status(404).send({
        //         status: "Error",
        //         message: 'No hay registros para mostrar'
        //     });
        // }

        // //return enviarRespuestaExito(res, filas, contador, numeroPagina, limite);
        // const totalPaginas = Math.ceil(contador / limite);
        
        // return res.status(200).send({
        //     status: 'OK',
        //     data: {
        //         totalPaginas,
        //         PaginaActual: numeroPagina,
        //         totalElementos: contador,
        //     },
        //     Lista: filas,
        // });
    } catch (error) {
        // console.log(error)
        // return res.status(500).send({
        //     Error: 'fgfdgd'
        // });
    }
};

const buscarCpPorCoinsidencia = async (req, res) => {
    try {

        const { texto } = req.params
        console.log(texto)

        const datos = await buscarCP(vwCpSatModel, texto, 1)

        console.log(datos)

        if(!datos.existe){
            return res.status(404).send({
                status: 'Error',
                message: 'No se encontro el dato'
            })
        }

        return res.status(200).send({
            status:'Ok',
            message: 'Se ha encontrado los siguientes datos',
            CodioPosta: datos
        })

    } catch (error) {
        // console.log(error)
        // return res.status(500).send({
        //     Error: 'fgfdgd'
        // });
    }
};




// const buscarCpPorPais = async (req, res) => {
//     try {
//         const { cp } = req.params;
//         const limite = 20; // o cualqier otro limite que se quiera poner
//         const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
        
//         // const laCondicion = {
//         //     [Op.or]: {
//         //         FamiliaId: { [Op.like]: `%${FamiliaId}$%` },
//         //         NombreFamilia: { [Op.like]: `%${NombreFamilia}$%` }
//         //     },
//         //     Activo: true,
//         // }

//         const laCondicion = {cp: cp}
    
//         const consulta = creaCondicion(laCondicion, limite, volumen);

//         const { filas, contador } = await manejarConsultaDB(vwBuscarCpSatModel, consulta);

//         if (!filas || filas.length === 0) {
//             //return sendNotFoundResponse(res);
//             console.error('Error al obtener la familia', error.message);
//             return res.status(404).send({
//                 status: "Error",
//                 message: 'No hay registros para mostrar'
//             });
//         }

//         //return sendSuccessResponse(res, filas, contador, numeroPagina, limite);
//         const totalPaginas = Math.ceil(contador / limite);
        
//         return res.status(200).send({
//             status: 'OK',
//             lista: {
//                 totalPaginas,
//                 PaginaActual: numeroPagina,
//                 totalElementos: contador,
//             },
//             Elementos: rows,
//     });

        
//     } catch (error) {
//         return sendErrorResponse(res, error);
//     }
// };

// const buscarCpPorEstado = async (req, res) => {
//     try {
//         const { cp } = req.params;
//         const limite = 20; // o cualqier otro limite que se quiera poner
//         const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
        
//         // const laCondicion = {
//         //     [Op.or]: {
//         //         FamiliaId: { [Op.like]: `%${FamiliaId}$%` },
//         //         NombreFamilia: { [Op.like]: `%${NombreFamilia}$%` }
//         //     },
//         //     Activo: true,
//         // }

//         const laCondicion = {cp: cp}
    
//         const consulta = creaCondicion(laCondicion, limite, volumen);

//         const { filas, contador } = await manejarConsultaDB(vwBuscarCpSatModel, consulta);

//         if (!filas || filas.length === 0) {
//             //return sendNotFoundResponse(res);
//             console.error('Error al obtener la familia', error.message);
//             return res.status(404).send({
//                 status: "Error",
//                 message: 'No hay registros para mostrar'
//             });
//         }

//         //return sendSuccessResponse(res, filas, contador, numeroPagina, limite);
//         const totalPaginas = Math.ceil(contador / limite);
        
//         return res.status(200).send({
//             status: 'OK',
//             lista: {
//                 totalPaginas,
//                 PaginaActual: numeroPagina,
//                 totalElementos: contador,
//             },
//             Elementos: rows,
//     });

        
//     } catch (error) {
//         return sendErrorResponse(res, error);
//     }
// };

// const buscarCpPorMunicipio = async (req, res) => {
//     try {
//         const { cp } = req.params;
//         const limite = 20; // o cualqier otro limite que se quiera poner
//         const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
        
//         // const laCondicion = {
//         //     [Op.or]: {
//         //         FamiliaId: { [Op.like]: `%${FamiliaId}$%` },
//         //         NombreFamilia: { [Op.like]: `%${NombreFamilia}$%` }
//         //     },
//         //     Activo: true,
//         // }

//         const laCondicion = {cp: cp}
    
//         const consulta = creaCondicion(laCondicion, limite, volumen);

//         const { filas, contador } = await manejarConsultaDB(vwBuscarCpSatModel, consulta);

//         if (!filas || filas.length === 0) {
//             //return sendNotFoundResponse(res);
//             console.error('Error al obtener la familia', error.message);
//             return res.status(404).send({
//                 status: "Error",
//                 message: 'No hay registros para mostrar'
//             });
//         }

//         //return sendSuccessResponse(res, filas, contador, numeroPagina, limite);
//         const totalPaginas = Math.ceil(contador / limite);
        
//         return res.status(200).send({
//             status: 'OK',
//             lista: {
//                 totalPaginas,
//                 PaginaActual: numeroPagina,
//                 totalElementos: contador,
//             },
//             Elementos: rows,
//     });

        
//     } catch (error) {
//         return sendErrorResponse(res, error);
//     }
// };

// const buscarCpPorLocalidad = async (req, res) => {
//     try {
//         const { cp } = req.params;
//         const limite = 20; // o cualqier otro limite que se quiera poner
//         const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
        
//         // const laCondicion = {
//         //     [Op.or]: {
//         //         FamiliaId: { [Op.like]: `%${FamiliaId}$%` },
//         //         NombreFamilia: { [Op.like]: `%${NombreFamilia}$%` }
//         //     },
//         //     Activo: true,
//         // }

//         const laCondicion = {cp: cp}
    
//         const consulta = creaCondicion(laCondicion, limite, volumen);

//         const { filas, contador } = await manejarConsultaDB(vwBuscarCpSatModel, consulta);

//         if (!filas || filas.length === 0) {
//             //return sendNotFoundResponse(res);
//             console.error('Error al obtener la familia', error.message);
//             return res.status(404).send({
//                 status: "Error",
//                 message: 'No hay registros para mostrar'
//             });
//         }

//         //return sendSuccessResponse(res, filas, contador, numeroPagina, limite);
//         const totalPaginas = Math.ceil(contador / limite);
        
//         return res.status(200).send({
//             status: 'OK',
//             lista: {
//                 totalPaginas,
//                 PaginaActual: numeroPagina,
//                 totalElementos: contador,
//             },
//             Elementos: rows,
//     });

        
//     } catch (error) {
//         return sendErrorResponse(res, error);
//     }
// };

// const buscarCpPorCoinsidencia = async (req, res) => {
//     try {
//         const { valor } = req.params;
//         const limite = 20; // o cualqier otro limite que se quiera poner
//         const { numeroPagina, volumen } = obtenerPaginasYVolumen(req.query.page, limite);
        
//         const laCondicion = {
//             [Op.or]: {
//                 estado: { [Op.like]: `%${valor}$%` },
//                 municipio: { [Op.like]: `%${valor}$%` },
//                 localidad: { [Op.like]: `%${valor}$%` }
//             },
//         }
    
//         const consulta = creaCondicion(laCondicion, limite, volumen);

//         const { filas, contador } = await manejarConsultaDB(vwBuscarCpSatModel, consulta);

//         if (!filas || filas.length === 0) {
//             //return sendNotFoundResponse(res);
//             console.error('Error al obtener la familia', error.message);
//             return res.status(404).send({
//                 status: "Error",
//                 message: 'No hay registros para mostrar'
//             });
//         }

//         //return sendSuccessResponse(res, filas, contador, numeroPagina, limite);
//         const totalPaginas = Math.ceil(contador / limite);
        
//         return res.status(200).send({
//             status: 'OK',
//             lista: {
//                 totalPaginas,
//                 PaginaActual: numeroPagina,
//                 totalElementos: contador,
//             },
//             Elementos: rows,
//     });

        
//     } catch (error) {
//         return sendErrorResponse(res, error);
//     }
// };

export const method = {
    buscarCpPorCP,
    buscarCpPorCoinsidencia
};