const { DataTypes } = require('sequelize');
const { Mariadb } = require('../../database/mariadb.database');

const LongitudListado = Mariadb.define('LongitudEmpresas', {
    Longitud: {
        type: DataTypes.INTEGER,
    },
    }, {
    freezeTableName: true,
    tableName: 'LongitudEmpresas',
    });

module.exports = LongitudListado;