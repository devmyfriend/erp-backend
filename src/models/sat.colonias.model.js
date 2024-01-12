import { DataTypes } from 'sequelize';
import { Connection } from '../database/mariadb.database.js';

export const Colonia = Connection.define(
    'SAT_Colonias',
    {
       idColonias: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
       },
        ClaveColonia: {
            type: DataTypes.STRING,
            autoIncrement: false,
            allowNull: false
        },
        CodigoPostal: {
            type: DataTypes.STRING,
            autoIncrement: false,
            allowNull: false
        },
        Nombre: {
            type: DataTypes.STRING,
            autoIncrement: false,
            allowNull: false
        },
        },
        {
            sequelize: Connection,
            modelName: 'SAT_Colonias',
            tableName: 'SAT_Colonias',
            freezeTableName: false,
        },  
);