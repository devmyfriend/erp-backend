import { Op, where } from 'sequelize';
import {
    vwCpSatModel
} from '../models/index.js'


//horacio

const paginado = parseInt(process.env.RegistrosPorPagina);

const manejadorDBError = error => {
    console.error(error);
    return {
        error: 'Error interno en el servidor',
    };
};


const searchItems = async( modelo, condicion, pagina)=>{
    try{

        const data = await modelo.findAndCountAll({
            where: condicion,
            limit: paginado,
            offset: (pagina-1 ) * paginado
        })

        console.log(data)
        return {existe: true, data}

    }catch( error ){
        console.log( error )

    }
}

export const buscarCP = async ( modelo, item , pagina )=>{

    const condicion = {
        [Op.or]:{
            cp: { [Op.like]: `%${item}%`},
        }
    }

    return searchItems(modelo, condicion, pagina )
}

export const buscarCpCoinsidencia = async ( modelo, item , pagina )=>{

    const condicion = {
        estado: 'Quintana Roo'
        // [Op.or]:{
        //     estado: { [Op.like]: `%${item}%`},
        //     municipio: { [Op.like]: `%${item}%`},
        //     localidad: { [Op.like]: `%${item}%`},
        // }
    }

    return searchItems(modelo, condicion, pagina )
}

//fin de horacio

const creaCondicion = (condicion, limit, offset) => {
    return {
        where: condicion,
        limit,
        offset,
    };
};

// const obtenerPaginasYVolumen = (pagina, limit) => {
//     const numeroPagina = Number(pagina) || 1;
//     const volumen = (numeroPagina - 1) * limit;
//     return { numeroPagina, volumen };
// };

// const manejarConsultaDB = async (modelo, consulta) => {
//     return await modelo.findAndCountAll(consulta);
// };

// const enviarRespuestaExito = (res, filas, contador, pagina, limit) => {
//     const totalPaginas = Math.ceil(contador / limit);
//     return res.status(200).send({
//         status: 'OK',
//         data: {
//             totalPaginas,
//             PaginaActual: pagina,
//             totalElementos: contador,
//         },
//         Lista: filas,
//     });
// };

// export const methods = {
//     creaCondicion,
//     obtenerPaginasYVolumen,
//     manejarConsultaDB,
//     enviarRespuestaExito
// };