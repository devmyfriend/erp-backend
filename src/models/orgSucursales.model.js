import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Sucursal = Connection.define(
    'orgSucursales',
    {
        SucursalId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        Nombre: {
            type: DataTypes.STRING,
        },
        EntidadNegocioId: {
            type: DataTypes.INTEGER,
        },
        }, {
            sequelize: Connection,
            modelName: 'orgSucursales',
            tableName: 'orgSucursales',
            freezeTableName: false
        }
);