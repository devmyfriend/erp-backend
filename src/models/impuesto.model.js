import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Impuesto = Connection.define(
    'Impuesto',
    {
        ClaveImpuesto:
        {
            type: DataTypes.NUMBER,
            allowNull: false,
            primaryKey: true,
        },
        Nombre:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Activo:
        {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        tableName: 'SAT_Impuestos',
        timestamps: false,
        freezeTableName: true,
    },
)

