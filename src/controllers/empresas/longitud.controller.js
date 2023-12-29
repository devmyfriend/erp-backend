import { Longitud } from '../../models/empresas/longitud.model.js';
import { Sequelize } from 'sequelize';
import { Connection } from '../../database/mariadb.database.js';


const obtenerLongitud = async (req, res = Response) => {
    try{
        const propiedad = req.params.propiedad || false;
        
        const longitudEmpresas = await Connection.query(
            `CALL LongitudEmpresas(${propiedad})`,
            {
                type: Sequelize.QueryTypes.RAW,
            }
        );

        if (!longitudEmpresas){
            return res.status(400).send({
                status: 'Error',
                message: 'No se obtuvo la longitud del listado empresas',
            });
        }

        const resultado = longitudEmpresas[0].total;

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
    obtenerLongitud,
};