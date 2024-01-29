import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const TaxModel = Connection.define(
    'Impuesto',
    {
        ClaveImpuesto:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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

