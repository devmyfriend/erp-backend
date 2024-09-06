import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const EmailsPorEntidadNegocio = Connection.define(
    'EmailsPorEntidadNegocio',
    {
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        EmailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'vwEmailsPorEntidadNegocio',
        timestamps: false,
        freezeTableName: true,
    }
);