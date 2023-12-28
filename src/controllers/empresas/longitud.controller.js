const { Response } = require('express');
const { Sequelize } = require('sequelize');
const { Mariadb } = require('../../database/mariadb.database');

const obtenerLongitudListado = async (req, res = Response) => {
    try{
        const propiedad = req.query.propiedad || false;
        const resultado = await Mariadb.query(
            `CALL LongitudEmpresas(${propiedad})`,
            {
                type: Sequelize.QueryTypes.RAW,
            }
        );

        if (!resultado || resultado.length === 0) {
            return res.status(400).send({
                status: 'Error',
                message: 'No se encontraron empresas en el listado paginado',
            });
        }
        const listadoEmpresas = resultado[0].total;

        return res.status(200).send({
            status: 'Ok',
            LongitudListado: listadoEmpresas,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Error',
            message: 'No se pudo obtener la información solicitada',
        });
    }
};

module.exports = {
    obtenerLongitudListado,
};