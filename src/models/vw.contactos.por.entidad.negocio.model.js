import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const ContactosPorEntidadNegocio = Connection.define(
    'ContactosPorEntidadNegocio',
    {
        ContactoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Nombres: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ApellidoPaterno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ApellidoMaterno: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Departamento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Puesto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'vwContactosPorEntidadNegocioId',
        timestamps: false,
        freezeTableName: true,
    }
);
