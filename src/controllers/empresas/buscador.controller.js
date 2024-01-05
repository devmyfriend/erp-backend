import { Sequelize } from "sequelize";
import { Connection } from "../../database/mariadb.database.js";

const busqueda = async (req, res = Response) => {
    try{
        const offset = req.params.offset || 0;
        const limit = req.params.limit || 5;
        const propiedad = req.params.propiedad || false;
        const texto = req.params.texto || false;

        const resultado = await Connection.query(
            `CALL BuscadorEmpresas(${offset}, ${limit}, ${propiedad}, '${texto}')`,
            {
                type: Sequelize.QueryTypes.RAW,
            }
        );

        if (!resultado){
            return res.status(400).send({
                status: 'Error',
                message: 'No se obtuvo el listado de empresas',
            });
        }

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
    busqueda,
};

