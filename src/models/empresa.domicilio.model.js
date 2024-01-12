import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const EmpresaDomicilio = Connection.define(
    'EmpresaDomicilio',
    {
       DomicilioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       },
       EntidadNegocioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
       },
    },
    {
        tableName: 'empresa_domiciio',
        timestamps: false,
        freezeTableName: true,
    }
)