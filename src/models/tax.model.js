import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const TaxModel = Connection.define(
    'Impuesto',
    {
        ClaveImpuesto:
        {
            type: DataTypes.STRING,
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
            allowNull: false,
        },
    },
    {
        tableName: 'SAT_Impuestos',
        timestamps: false,
        freezeTableName: true,
    },
)

