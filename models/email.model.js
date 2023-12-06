const { DataTypes } = require('sequelize');

const { Mariadb } = require('../database/mariadb.database')

const Email = Mariadb.define(
    'Email',
    {
        EmailId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
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
        tableName: 'orgEmails',
        timestamps: false,
        freezeTableName: false,
    }
);
module.exports = Email