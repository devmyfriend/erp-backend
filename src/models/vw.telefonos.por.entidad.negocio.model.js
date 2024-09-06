
import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const TelefonosPorEntidadNegocio = Connection.define(
    'TelefonosPorEntidadNegocio',
    {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        TelefonoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        NumeroTelefonico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'vwTelefonosPorEntidadNegocio',
        timestamps: false,
        freezeTableName: true,
    }
);