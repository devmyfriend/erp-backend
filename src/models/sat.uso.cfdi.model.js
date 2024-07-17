import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const vwSatCFDI = Connection.define(
    'vwSatCFDI',
    {
        ClaveUsoCFDI: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        Descripcion: {
            type: DataTypes.STRING,
        },
        Fisica: {
            type: DataTypes.BOOLEAN,
        },
        Moral: {
            type: DataTypes.BOOLEAN,
        },
        Activo: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        tableName: 'SAT_UsoCFDI',
        timestamps: false,
        freezeTableName: true,
    }
);
