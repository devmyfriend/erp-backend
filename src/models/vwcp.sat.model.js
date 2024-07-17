import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const vwCpSatModel = Connection.define(
    'vwCpSat',
    {
        cp: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            autoIncrement:false
        },
        pais: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.STRING,
        },
        municipio: {
            type: DataTypes.STRING,
        },
        localidad: {
            type: DataTypes.STRING,
        },
    },

    {
        tableName: 'vwBuscarCp',
        timestamps: false,
        freezeTableName: false,
        },
);