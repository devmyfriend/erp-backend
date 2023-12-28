const { DataTypes } = require('sequelize');
const { Mariadb } = require('../../database/mariadb.database');

const SP_ListadoEmpresas = Mariadb.define('ListadoEmpresas', {
    EntidadNegocioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    NombreOficial: {
        type: DataTypes.STRING,
    },
    RFC: {
        type: DataTypes.STRING,
    },
    Propietaria: {
        type: DataTypes.TINYINT,
    },
    Direccion: {
        type: DataTypes.STRING,
    },
    NumeroTelefonico: {
        type: DataTypes.STRING,
    },
    }, {
    freezeTableName: true,
    tableName: 'ListadoEmpresas',
    storedProcedure: true,
    });

    module.exports = SP_ListadoEmpresas;