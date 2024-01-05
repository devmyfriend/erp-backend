import { LongitudBusqueda } from '../../models/empresas/longitudBusqueda.model.js';
import { Sequelize } from 'sequelize';
import { Connection } from '../../database/mariadb.database.js';


const obtenerLongitudBusqueda = async (req, res = Response) => {
    try{
        const propiedad = req.params.propiedad || false;
        const texto = req.params.texto;

        const longitudBusqueda = await Connection.query(
            `CALL LongitudBusqueda(${propiedad}, '${texto}')`,
            {
                type: Sequelize.QueryTypes.RAW,
            }
        );

        if (!longitudBusqueda){
            return res.status(400).send({
                status: 'Error',
                message: 'No se obtuvo la longitud del listado empresas',
            });
        }
    
        const resultado = longitudBusqueda[0].total;

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
    obtenerLongitudBusqueda,
};
