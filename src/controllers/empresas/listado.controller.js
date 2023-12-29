import { Sequelize } from "sequelize";
import { Connection } from "../../database/mariadb.database.js";

const obtenerListado = async (req, res = Response) => {
    try{
/*         const offset = 0;
        const limit = 5;
        const propiedad = false; */
        const offset = req.params.offset || 0;
        const limit = req.params.limit || 5;
        const propiedad = req.params.propiedad || false;
    
        const listadoEmpresas = await Connection.query(
            `CALL ListadoEmpresas(${offset}, ${limit}, ${propiedad})`,
            {
                type: Sequelize.QueryTypes.RAW,
            }
        );

        if (!listadoEmpresas){
            return res.status(400).send({
                status: 'Error',
                message: 'No se obtuvo el listado de empresas',
            });
        }

        const resultado = listadoEmpresas;
        
        return res.status(200).send({
            status: 'Ok',
            resultado,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Error',
            message: 'No se pudo obtener la información solicitada',
        });
    }
};

export const methods = {
    obtenerListado,
};