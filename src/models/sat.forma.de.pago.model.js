import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';
export const FormaDePago = Connection.define(
    'FormaDePago',
    {
        ClaveFormaPago: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        Descripcion: {
            type: DataTypes.STRING,
        },
        Bancarizado: {
            type: DataTypes.BOOLEAN,
        },
        Activo: {
            type: DataTypes.BOOLEAN,
        },
    },
    {
        tableName: 'SAT_FormaPago',
        timestamps: false,
        freezeTableName: true,
    },
);