import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Municipio = Connection.define(
    'Municipio',
    {
        ClaveMunicipio: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false,
        },
        ClaveEstado: {
            type: DataTypes.STRING,
        },
        Nombre: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: Connection,
        modelName: 'Municipio',
        tableName: 'SAT_Municipio',
        freezeTableName: false,
    }
);