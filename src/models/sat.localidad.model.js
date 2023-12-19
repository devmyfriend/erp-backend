import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Localidad = Connection.define(
    'SAT_Localidad',
    {
        ClaveLocalidad: {
            type: DataTypes.STRING,
            autoIncrement: false,
            primaryKey: true,
            allowNull: false
        },
        ClaveEstado: {
            type: DataTypes.STRING,
        },
        ClaveMunicipio: {
            type: DataTypes.STRING,
        },
        Nombre: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize: Connection,
        modelName: 'SAT_Localidad',
        tableName: 'SAT_Localidad',
        freezeTableName: false,
    }
);