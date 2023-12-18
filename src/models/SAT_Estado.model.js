import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Estado = Connection.define(
    'SAT_Estado',
    {
        ClaveEstado: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false
        },
        ClavePais: {
            type: DataTypes.INTEGER,
        },
        Nombre: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize: Connection,
        modelName: 'SAT_Estado',
        tableName: 'SAT_Estado',
        freezeTableName: false,
    },
);