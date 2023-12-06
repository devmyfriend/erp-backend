const { DataTypes } = require('sequelize');

const { Mariadb } = require('../database/mariadb.database')

const Telefono = Mariadb.define(
    'Telefonos',
    {
        TelefonoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        NumeroTelefonico: {
            type: DataTypes.INTEGER,
        },
        ContactoId: {
            type: DataTypes.INTEGER,
        },
        CreadoPor: {
            type: DataTypes.INTEGER,
        },
        ActualizadoPor: {
            type: DataTypes.INTEGER,
        },
        BorradoPor: {
            type: DataTypes.INTEGER,
        },
        BorradoEn: {
            type: DataTypes.DATE,
        },
        Borrado: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        tableName: 'orgTelefonos',
        timestamps: false,
        freezeTableName: false,
    }
);

module.exports = Telefono;